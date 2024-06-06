import React from "react"
import ListaLivros from "../../components/lista_livros"
import Paginacao from "../../components/paginas"

function Home(){
    return (
        <>
            <ListaLivros />
            <Paginacao />
            
        </>
    )
}

export default Home