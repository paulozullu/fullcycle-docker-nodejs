const express = require('express')
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config);

const createTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("Tabela 'people' preparada!");
    });
}

const insertData = () => {
    const sql = `INSERT INTO people(name) VALUES('Paulo ${new Date()}')`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Registro inserido.");
    });
}

app.get('/', (req, res) => {
    createTable();
    insertData();
    const get = `SELECT * FROM people`;
    connection.query(get, (error, results, fields) => {
        if (error) throw error;
        let response = '<h1>Full Cycle Rocks!</h1><ul>';
        results.forEach(person => {
            response += `<li>${person.name}</li>`;
        });
        response += '</ul>';
        res.send(response);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});