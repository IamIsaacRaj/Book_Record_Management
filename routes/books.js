const express = require('express');
const { books } = require("../data/books.json");
const {users} = require("../data/users.json");
const router = express.Router();
/** 
   * Route : /books
   * method : GET
   * Description : Get all books
   * Acess : public
   * Parameter : none
*/ 
router.get('/',(req,res) => {
  res.status(200).json({
    success : true,
    data : books,
  });
});

/** 
 * Route :/books/:id
 * method : GET
 * Description : Get single book by id
 * Acess : public
 * Parameter : id
 */ 

 router.get('/:id',(req,res) => {
  const {id} = req.params;
  const book = books.find((each) => each.id === id);
  if(!book){
    return  res.status(404).json({
      success : false,
      message : "Book Not Found",
    });
  }
  res.status(200).json({
    sucess : true,
    data : book,
  });
});

/** 
 * Route :/issued/by_user
 * method : GET
 * Description : Get single book by id
 * Acess : public
 * Parameter : id
*/ 

router.get("/issued/by_user",(req,res) =>{
  const userWithIssuedBook = users.filter((each) =>{
    if(each.issuedBook) return each;
  });

  const issuedBooks = [];

  userWithIssuedBooks.forEach((each) => {
      const book = books.find((book) => book.id === each.issuedbook);

      book.issuedBy = each.name;
      book.issuedDate = each.issuedDate;
      book.returnDate = each.returnDate

      issuedBooks.push(book);
    });
    
    if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No books issued yet",
    });

  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});

/** 
 * Route :/book
 * method : POST
 * Description : create new book
 * Acess : public
 * Parameter : none
 * date : authour, name, gener,price,publisher,id 
*/ 
router.post("/",(req,res) => {
  const data = req.body;

  if(!data){
    return res.status(400).json({
      success : false,
      message : "No data is provided",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if(book){
    return res.status(404).json({
      success : false,
      message : "Book already exits with this id, please provide a unique id",
    });
  }

  const allBooks = [...books,data];

  return res.status(200).json({
    success : true,
    message : allBooks,
  })
})

/** 
 * Route :/book/:id
 * method : PUT
 * Description : Update book
 * Acess : public
 * Parameter : id
 * date : authour, name, gener,price,publisher 
*/ 

router.put("/:id", (req,res) => {
  const { id } = req.params;
  const{ data } = req.body;

  const book = books.find((each) => each.id === id);

  if(!book){
    return res.status(400).json({
      success : false,
      message : "Book Not Found",
    });
  }

  const updateBooK = books.map((each) => {
    if(each.id === id){
      return {...each,...data} ;
    } else {
      return each;
    }
  });

  return res.status(200).json({
    success : true,
    data : updateData
  });
});


//default export
module.exports = router