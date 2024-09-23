const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');  


const db = mysql.createConnection({  
  host: 'localhost',        
  user: 'root',             
  password: '',             
  database: 'testproject' 
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', async (req, res) => {
  const { fullName, email, phone, gender, loanUserType, userName, password } = req.body;
  

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (fullName, email, phone, gender, loanUserType, userName, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [fullName, email, phone, gender, loanUserType, userName, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Server error');
      return;
    }
    
    console.log('User registered:', result);
    
    res.send({
      message: 'User registered successfully',
      userId: result.insertId,
      data: { fullName, email, phone, gender, loanUserType, userName },
      status: 1
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
      if (err) {
          console.error('Error querying MySQL:', err);
          res.status(500).send('Server error');
          return;
      }
      
      if (results.length === 0) {
          res.status(401).send('Invalid credentials');
          return;
      }

      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);       
      if (!passwordMatch) {
          res.status(401).send('Invalid credentials');
          return;
      }

      res.send({
          message: 'Login successful',
          status: 1
      });
  });
});

app.post('/loan', (req, res) => {
  const { first_name, last_name, email, date, loan_type, pan } = req.body;

  const sql = 'INSERT INTO loans (first_name, last_name, email, date, loan_type, pan) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [first_name, last_name, email, date, loan_type, pan], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Server error');
      return;
    }

    console.log('Loan application received:', result);

    
   
    res.send({
      message: 'Loan application submitted successfully',
      loanId: result.insertId,
      data: { first_name, last_name, email, date, loan_type, pan },
      status: 1,
    });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
