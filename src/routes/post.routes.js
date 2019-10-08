module.exports = (app) => {
    const posts = require('../controller/post.controller.js');

    // Cria um novo produto
    app.post('/posts', posts.create);

    // Lista todos os posts
    app.get('/posts', posts.findAll);

    // Lista apenas um produto
    app.get('/posts/:postId', posts.findOne);

    // Lista os posts pelo texto
    app.get('/posts/title/:postTitle', posts.findByTitle)

    // Remova o produto pelo ID
    app.delete('/posts/:postId', posts.delete)

    // Altera o produto pelo ID
    app.put('/posts/:postId', posts.update)
}