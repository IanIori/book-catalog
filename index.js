import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

// URL de conexão com o MongoDB
const uri = 'mongodb://localhost:27017/biblioteca'; 

const app = express();
const PORT = process.env.PORT || 3000;
const ip = "localhost";

// Middleware para analisar o corpo das solicitações JSON
app.use(cors());

// Conectar ao MongoDB usando Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão estabelecida com sucesso ao servidor MongoDB');
}).catch(error => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Definir o esquema e modelo do Mongoose para a coleção "livros"
const livroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    isbn: String,
    paginas: Number,
    ano: Number,
    valor:Number
}, { collection: 'livros' });

const Livro = mongoose.model('Livro', livroSchema);

app.get('/:page', async (req, res) => {
    try {
        const page = Number(req.params.page);
        const resultado = await consulta(page);
        const totalLivros = await contaLivros();
        res.status(200).json({ resultado, totalLivros });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// Função que faz a consulta dos dados no MongoDB usando Mongoose
async function consulta(page) {
    try {
        const livros = await Livro.find({})
            .sort({ quantidade: -1, _id: 1 })
            .skip((page - 1) * 10)
            .limit(10)
            .select('-_id')
            .exec();
        return livros;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

// Função que conta o número total de livros no MongoDB usando Mongoose
async function contaLivros() {
    try {
        const count = await Livro.countDocuments().exec();
        return { livros: count };
    } catch (error) {
        console.error('Erro ao contar livros:', error);
        throw error;
    }
}

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${ip}:${PORT}`);
});