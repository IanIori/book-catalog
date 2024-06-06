import React, {useState, useEffect} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination} from "@nextui-org/react";
import axios from "axios";

export default function ListaLivros() {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/${page}`);
      setBooks(response.data.resultado);
      setTotalPages(response.data.totalLivross);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <>
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>TITULO</TableColumn>
        <TableColumn>AUTOR</TableColumn>
        <TableColumn>ISB</TableColumn>
        <TableColumn>PÁGINAS</TableColumn>
        <TableColumn>ANO</TableColumn>
        <TableColumn>VALOR</TableColumn>
      </TableHeader>
      <TableBody>
        {books.map((livro, index) => (
          <TableRow key={index}>
           <TableCell>{livro.titulo}</TableCell>
           <TableCell>{livro.autor}</TableCell>
           <TableCell>{livro.isbn}</TableCell>
           <TableCell>{livro.paginas}</TableCell>
           <TableCell>{livro.ano}</TableCell>
           <TableCell>{livro.valor}</TableCell>
           </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination 
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange} />
    </>
  );
}


