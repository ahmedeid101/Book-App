var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../Util/utility');
var Logger = require('../services/LoggerServices');
var audit = require('../Audit/audit');
var auditAction = require('../Audit/auditAction');



const logger = new Logger('bookController');


exports.getBookList = async (req, res) =>{
    var auditOn = util.dateFormate();
    try {
        var BookListQuery = queries.queryList.GET_Book_LIST_QUERY;
        var result = await dbConnection.dbQuery(BookListQuery);
        logger.info('return book list', result.rows);
        audit.prepareAudit(auditAction.actionList.GIT_BOOK_LIST, result.rows, null, 'Ahmed Eid', auditOn);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("Error: "+ error);
        let errorMessage = "faild to git books" + error;        
        audit.prepareAudit(auditAction.actionList.GIT_BOOK_LIST, null, JSON.stringify(errorMessage), 'Ahmed Eid', auditOn);
        return res.status(500).send({error: 'faild to git books!'});
    }
}

exports.getBookDetails = async (req, res) =>{
    try {
        var bookId = req.params.bookId;
        var BookDetailsQuery = queries.queryList.GET_Book_DETAILS_QUERY;
        var result = await dbConnection.dbQuery(BookDetailsQuery, [bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to get book details!'});
    }
}

exports.saveBook = async (req, res) =>{
    try {
        var bookTitle = req.body.bookTitle;
        var bookDescription = req.body.bookDescription;
        var bookPublisher = req.body.bookPublisher;
        var bookAuthor = req.body.bookAuthor;
        var bookPages = req.body.bookPages;
        var storeCode = req.body.storeCode;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        if(!bookTitle || !bookPublisher ||!bookAuthor ||!storeCode){
            return res.status(500).send({error: 'this params are required, must not be empty!'});
        }

        values = [bookTitle, bookDescription, bookPublisher, bookAuthor, bookPages, storeCode, createdOn, createdBy];

        var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
        await dbConnection.dbQuery(saveBookQuery, values);

         return res.status(201).send('successfully adding new book');
        
    } catch(error) {
        console.log("Error: "+ error);
        return res.status(500).send({error: 'faild to add book!'});
    }
}

exports.updateBook = async (req, res) =>{
    try {
        var bookId = req.body.bookId;        
        var bookTitle = req.body.bookTitle;
        var bookDescription = req.body.bookDescription;
        var bookPublisher = req.body.bookPublisher;
        var bookAuthor = req.body.bookAuthor;
        var bookPages = req.body.bookPages;
        var storeCode = req.body.storeCode;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        if(!bookId || !bookTitle || !bookPublisher ||!bookAuthor ||!storeCode){
            return res.status(500).send({error: 'this params are required, must not be empty!'});
        }

        values = [bookTitle, bookDescription, bookPublisher, bookAuthor, bookPages, storeCode, createdOn, createdBy, bookId];

        var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await dbConnection.dbQuery(updateBookQuery, values);

         return res.status(200).send('successfully book updated');
        
    } catch(error) {
        console.log("Error: "+ error);
        return res.status(500).send({error: 'faild to update a book!'});
    }

}

exports.deleteBook = async (req, res) =>{
    var bookId = req.params.bookId;

    try {
        //validate not empty
        if(!bookId){
            return res.status(500).send({error: 'can`t delete empty book id!'});
        }

        var deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        await dbConnection.dbQuery(deleteBookQuery, [bookId]);

        return res.status(200).send('book deleted successfully');
        
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to delete book whth id '+ bookId});
    }
}