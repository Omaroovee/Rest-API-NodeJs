bookController = function (Book) {
    // post a new book and save it to the Database
    var post = function (req, res) {
        var book = new Book(req.body)

        if (!req.body.title) {
            res.status(400)
            res.send('Title is required')
        } else {
            book.save()
            res.status(201)
            res.send(book)
        }
    }
    // get all the data in the Data base
    var get = function (req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre
        }
        Book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err)
            else {
                var returnBooks = []
                books.forEach(function (element, index, array) {
                    var newBook = element.toJSON()
                    newBook.links = {}
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
                    returnBooks.push(newBook)
                });
                res.json(returnBooks)
            }
        })
    }
    return {
        post: post,
        get: get
    }
}
module.exports = bookController