const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@AyaanNoman2112',
    database: 'mydb'
});

mysqlConnection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});


mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure database name is included
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gpa: String
});

const Student = mongoose.model('students', studentSchema);


app.get('/api/mysql', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Error fetching MySQL data:', err);
            res.status(500).send('Error fetching MySQL data');
        } else {
            res.send(results);
        }
    });
});

app.get('/api/mongodb', async (req, res) => {
    try {
        const data = await Student.find();
        console.log('MongoDB Data:', data);
        res.send(data);
    } catch (err) {
        console.error('Error fetching MongoDB data:', err);
        res.status(500).send('Error fetching MongoDB data');
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
