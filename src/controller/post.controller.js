//Obtendo o model do Post
const Post = require('../model/post.model.js');

//Criando um novo Post
exports.create = (req, res) => {
    // Validando se veio algo junto a requisição
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo para criar o post não pode estar vazio!"
        });
    }

    // Criando o post com os dados da requisição
    const post = new Post(req.body);

    // Salva o novo post no MongoDB
    post.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: 'O post informado já exista na base de dados!' || err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao salvar o novo post."
        });
    });
};

// Método para listar todos os posts
exports.findAll = (req, res) => {
    Post.find()
    .sort({_id:-1}) // para decrescente passe -1
    .then(post => {
        res.send(post)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Erro ao oter os posts'
        })
    })
}

// Método para lista um único post pelo ID
exports.findOne = (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: 'Post não encontrado com o ID: ' + req.params.postId
            })
        }
        res.send(post)
    }).catch(err => {
        return res.status(500).send({
            message: 'Erro ao obter o post!'
        })
    })
}

// Método para listar um post pelo title
exports.findByTitle = (req, res) => {
    const title = req.params.postTitle
    Post.find({
        // Iremos obter o title a ser pesquisado no índice
        $text: {$search: title}
    })
    .sort({_id:-1})
    .then(post => {
        res.send(post);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Erro ao obter o post pelo título!'
        })
    })
}

// Apaga um post pelo ID
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post){
            return res.status(404).send({
                message: 'Post não existe! ID ' + 
                req.params.postId
            })
        }
        res.send({
            message: 'Post excluído com sucesso!'
        })
    }).catch(err => {
        return res.status(500).send({
            message: 'Não foi possivel excluir o post'
        })
    })
}

// Alterar os dados do post
exports.update = (req, res) => {
    // Validadndo se veio algo na requisição
    if(!req.body){
        return res.status(400).send({
            message: 'JSON inválido para o post!'
        })
    }
    // Localizamos o post e alteramos 
    Post.findByIdAndUpdate(req.params.postId,
        {
            author: req.body.author, 
            aboutAuthor: req.body.aboutAuthor,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }, {new: true} // Exibimos o resgistro alterado
    ).then(post => {
        if(!post){
            return res.status(404).send({
                message: 'Não existe o post ID ' + req.params.postId
            })
        }
        res.send(post)
    }).catch(err => {
        return res.status(500).send({
            message: 'Erro ao alterar o post: ' + err.message
        })
    })
}