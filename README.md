# Book Pagination App

A web application to display paginated book information using MongoDB, Node.js, Express, and NextUI.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- Fetch and display a paginated list of books.
- Navigate between pages using a pagination component.
- View details of the first book in each page.

## Prerequisites

- Node.js (>=14.x)
- MongoDB (>=4.x)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/book-pagination-app.git
    cd book-pagination-app
    ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

## Usage

1. **Start MongoDB:**

    Ensure MongoDB is running on your local machine. You can start MongoDB using the following command:

    ```bash
    mongod
    ```

2. **Start the server:**

    ```bash
    node index.js
    ```

    The server will start on `http://localhost:3000`.

3. **Start the client:**

    ```bash
    npm run dev
    ```

    The client will start on `http://localhost:5173`.

## API Endpoints

### Get Paginated Books

- **URL:** `http://localhost:3000/:page`
- **Method:** GET
- **URL Params:** 
  - `page=[number]` - The page number to fetch.
- **Success Response:**
    - **Code:** 200
    - **Content:** 
    ```json
    {
      "resultado": [
        {
          "titulo": "Orçamento sem falhas",
          "autor": "Nath Finanças",
          "isbn": "9786555601565",
          "paginas": 128,
          "ano": 2021,
          "valor": 95.4
        },
        ...
      ],
      "totalLivros": {
        "livros": 11966
      }
    }
    ```
- **Error Response:**
    - **Code:** 500
    - **Content:** `{ "error": "Erro ao buscar os dados" }`

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - NextUI

- **Backend:**
  - Node.js
  - Express

- **Database:**
  - MongoDB


