const mongoose = require('mongoose');

//Criando o Schema Produto
const PostSchema = mongoose.Schema({
    author: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do Autor é obrigatório']
    },
    aboutAuthor: {
        type: String,
        minlength: [2, 'A descrição do Autor é muito curta'],
        maxlength: [1000, 'A descrição do Autor é muito longa'],
        required: [true, 'A descrição do Autor é obrigatória']
    },
    title: {
        type: String,
        //unique: true, //Criamos um índice único
        minlength: [5,'O título é muito curto'], //sem ponto
        maxlength: [30, 'O título é muito longo'],//com ponto
        /*validate: {
            validator: function(cbarra) { //Utilizaremos Regex para validar
              return /^([0-9]{1}[.]?[0-9]{6}[.]?[0-9]{6})$/.test(cbarra);
            },
            message: props => props.value +' não é um código de barras válido!'*/
        required: [true, 'O título do post é obrigatório']
    },    
    content: {
        type: String,
        minlength: [100, 'O corpo do post é muito curto'],
        maxlength: [5000, 'O corpo do post é muito longo'],
        required: [true, 'O corpo do post é obrigatório']
    },
    category: {
        type: String,
        minlength: [2, 'A categoria é muito curta'],
        maxlength: [50, 'A categoria é muito longa'],
        required: [true, 'A categoria é obrigatória']
    }
});

// Criando um indice para o texto do Produto
PostSchema.index({
    title: 'text',
    content: 'text',
    category: 'text'
},{
    weights: {
        title: 5, //o peso na busca. nome é + importante
        content: 3,
        category: 1
    }
})

module.exports = mongoose.model('Posts', PostSchema);