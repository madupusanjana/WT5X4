const express = require('express');
const router = express.Router();


const books = require('../books');
const { body, validationResult } = require('express-validator');


// GET all books
router.get('/', (req, res) => {
    res.json(books);
});


// GET book by id
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);


    if(!book){
        return res.status(404).json({message:"Book not found"});
    }


    res.json(book);
});


// CREATE new book
router.post('/',
[
    body('title').notEmpty(),
    body('author').notEmpty()
],
(req,res)=>{


    const errors = validationResult(req);


    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }


    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };


    books.push(book);


    res.status(201).json(book);
});


// UPDATE book
router.put('/:id', (req,res)=>{


    const book = books.find(b => b.id == req.params.id);


    if(!book){
        return res.status(404).json({message:"Book not found"});
    }


    book.title = req.body.title;
    book.author = req.body.author;


    res.json(book);
});


// DELETE book
router.delete('/:id', (req,res)=>{


    const index = books.findIndex(b => b.id == req.params.id);


    if(index === -1){
        return res.status(404).json({message:"Book not found"});
    }


    books.splice(index,1);


    res.json({message:"Book deleted"});
});


module.exports = router;