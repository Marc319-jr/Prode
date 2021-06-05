const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));


const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//motor de EJS
app.set('view engine', 'ejs');


//rutas
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
 

app.use('/' , indexRouter)
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT)
}

);