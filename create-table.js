const mysql = require('mysql2');
const faker = require('faker');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3336,
    user: 'root',
    password: '123456',
    database: 'dbC1'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectado ao Banco de dados!');
    createTableUsers(connection);
    populateUsers(connection);
});

function createTableUsers(conn){
    const sql = `CREATE TABLE IF NOT EXISTS Users
                   (id INT NOT NULL AUTO_INCREMENT, 
                   nome VARCHAR(200) NOT NULL,
                   email VARCHAR(100) NOT NULL,
                   telefone VARCHAR(100) NOT NULL,
                   altura VARCHAR(50) NOT NULL,
                   peso VARCHAR(200) NOT NULL,
                   saude VARCHAR(50) NOT NULL,
                   PRIMARY KEY (id)
                   );`
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela criada com sucesso!')
    })
}

function populateUsers(conn){
    const sql = `INSERT INTO Users(nome, email, telefone, altura, peso, saude) VALUES ?`;
    
    let values = [];

    for(let i = 0; i < 10; i++){
        let altura = (Math.random() * 0.45 + 1.50).toString+"m";  
        let peso = (Math.random() * 80 + 45).toString+"kg";  
        let arraySaude = ["Saúde OK","COVID 19","Dengue","Virose","Obesidade"]
        let saude = arraySaude[Math.floor(Math.random() * arraySaude.length)];  
        values.push([faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber(), altura, peso, saude]);
    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros inseridos com sucesso!');
        conn.end();
    });
}
