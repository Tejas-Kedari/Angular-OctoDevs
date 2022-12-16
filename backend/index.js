// Importing require modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initializing port number and hostname.
const hostname = 'localhost';
const port = 3000;


// Creating express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connection of Database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pract',
    port: 3306
})

db.connect(err => err ? console.log(err) : console.log("Database Connected"));
app.get('/', (req, res) => {
    // res.send('Home');
    db.query('select * from devs', (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            res.send({
                message: 'Data Available',
                data: result,
            });
        }
    });
});

app.get('/:id', (req, res) => {
    // res.send('Home');
    let ids = req.params.id;
    db.query(`select * from devs where id = ${ids}`, (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            res.send({
                message: 'Single Data Available',
                data: result,
            });
        }
    });
});

app.post('/', (req, res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    db.query(`insert into devs(id, name, email, mobile) values ('${id}', '${name}', '${eMail}', '${mb}')`, (err, result)=>{
        if(err) console.log(err);
        res.send({
            message: 'data inserted successfully...'
        });
    });
});

app.put('/:id', (req, res)=>{
    let uid = req.params.id;
    let name = req.body.name;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    db.query(`update devs set name = '${name}', email = '${eMail}', mobile = '${mb}' where id = '${uid}'`, (err, result)=>{
        if(err) console.log(err);
        res.send({
            message: 'data updated successfully...'
        });
    });
});

app.delete('/:id', (req, res)=>{ 
    let uid = req.params.id;

    db.query(`delete from devs where id = '${uid}'`, (err, result)=>{
        if(err) console.log(err);
        res.send({
            message: 'data deleted successfully...'
        });
    });
});


app.listen(port, hostname, () => {
    console.log(`The app is running on http://${hostname}:${port}/`)
})