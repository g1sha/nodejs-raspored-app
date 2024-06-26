const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors');

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')


const predmetRouter = require('./routes/predmet');
const nastavnikRouter = require('./routes/nastavnik');
const grupaRouter = require('./routes/grupa');
const predavanjeRouter = require('./routes/predavanje');
const rasporedRouter = require('./routes/raspored');
const skolaRouter = require('./routes/skola');
const terminRouter = require('./routes/termin');
const ucionicaRouter = require('./routes/ucionica');
const loginRouter = require('./routes/login');
const logicRouter = require('./routes/logic');




app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, login");
  next();
});

app.use(
  '/swagger',
  swaggerUI.serve, 
  swaggerUI.setup(swaggerFile)
);


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// Predmet 
app.use("/predmet", predmetRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Nastavnik 
app.use("/nastavnik", nastavnikRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Grupa 
app.use("/grupa", grupaRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Predavanje 
app.use("/predavanje", predavanjeRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Raspored 
app.use("/raspored", rasporedRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Skola 
app.use("/skola", skolaRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Termin 
app.use("/termin", terminRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Ucionica 
app.use("/ucionica", ucionicaRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Login 
app.use("/login", loginRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Logic 
app.use("/logic", logicRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});