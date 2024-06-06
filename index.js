import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

// URL de conexão com o MongoDB
const uri = 'mongodb://localhost:27017'; // ou sua URL de conexão remota

// Nome do banco de dados e da coleção
const dbName = 'biblioteca';

const app = express();
const PORT = process.env.PORT || 3000;
const ip = "localhost";

// Middleware para analisar o corpo das solicitações JSON
app.use(express.json());

app.get('/:page', async (req, res) => {
    const resultado = await consulta(Number(req.headers));
    const totalLivros = await contaLivros();
    res.status(200).json({resultado, totalLivros});
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${ip}:${PORT}`);
});

// Função que faz as consulta dos dados no MongoDB
async function consulta(page) {
    // Criar um cliente do MongoDB
    const client = new MongoClient(uri);

    try {
        // Conectar ao servidor do MongoDB
        await client.connect();

        console.log('Conexão estabelecida com sucesso ao servidor MongoDB');

        // Selecionar o banco de dados
        const db = client.db(dbName);

        // Selecionar a coleção
        const collection = db.collection("livros");

        let pipeline = [];

        pipeline.push({$sort: {"quantidade": -1, "_id": 1} })
        pipeline.push({$skip: (page - 1) * 10})
        pipeline.push({$limit: 10})
        pipeline.push({$project: {
            _id: 0,
        }})

        const result = await collection.aggregate(pipeline).toArray();

        return result;

    } catch (error) {
        console.error('Erro ao conectar ou buscar dados:', error);
    } finally {
        // Fechar a conexão com o cliente
        await client.close();
        console.log('Conexão com o servidor MongoDB fechada');
    }
}

async function contaLivros() {
    // Criar um cliente do MongoDB
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conexão estabelecida com sucesso ao servidor MongoDB');
        const db = client.db(dbName);
        const collection = db.collection("livros");

        let pipeline = [];
        pipeline.push({$count: 'livros'})

        const result = await collection.aggregate(pipeline).toArray();
        return result;

    } catch (error) {
        console.error('Erro ao conectar ou buscar dados:', error);
    } finally {
        await client.close();
        console.log('Conexão com o servidor MongoDB fechada');
    }
}