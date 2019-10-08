const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Definição de como iremos passar o parse nas requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// conectar ao mongo
mongoose.Promise = global.Promise;
mongoose.connect(config.urlMongodbLocal, {
    //config para evitar deprecated functions
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado com sucesso ao MongoDB!")
}).catch(err => {
    console.log("Não foi possível se conectar ao MongoDB!", err)
    process.exit();
})

//rota default
app.get('/', (req, res) => {
    res.json({"message":`Você está conectado! ${config.nomeAPI} Versão: ${config.versaoAPI}` })
})

//obtendo as demais rotas
require('./src/routes/post.routes')(app)

if (require.main === module) {
    app.listen(config.portaServidor, () => {
        console.log(`Servidor Web está se comunicando pela porta ${config.portaServidor}`)
    })
}