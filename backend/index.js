const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require("body-parser")

const hostname = '127.0.0.1';
const port = 3030;
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());

const data = require('./data')
const {users} = require('./user')

app.get("/data", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(data)
})

app.post("/auth", (req, res) => {
  const { login, password } = req.body
  const isAuth = users.find(user => user.mail === login && user.password === password)
  res.json({auth: isAuth ? true : false})
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});