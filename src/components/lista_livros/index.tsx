import React, { useState, useEffect } from "react";

import axios from "axios";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

interface Book {
  titulo: string;
  autor: string;
  isbn: string;
  paginas: number;
  ano: number;
  valor: number;
}

export default function ListaLivros() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 10; // Número de livros por página

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/${page}`);
      setBooks(response.data.resultado);
      const totalLivros = response.data.totalLivros.livros;
      setTotalPages(Math.ceil(totalLivros / booksPerPage));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table aria-label="Books table">
        <TableHeader>
          <TableColumn>TITULO</TableColumn>
          <TableColumn>AUTOR</TableColumn>
          <TableColumn>ISBN</TableColumn>
          <TableColumn>PÁGINAS</TableColumn>
          <TableColumn>ANO</TableColumn>
          <TableColumn>VALOR</TableColumn>
        </TableHeader>
        <TableBody>
          {books.map((livro: Book, index) => (
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
        initialPage={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
