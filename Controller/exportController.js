var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var Logger = require('../services/LoggerServices');
var fastCsv = require('fast-csv');
var fs = require('fs');
const dotenv = require('dotenv');
 
dotenv.config();
const path = process.env.EXPORT_PATH;
const writeStream = fs.createWriteStream(path);
const logger = new Logger('userController');

exports.exportBooks = async (req, res) =>{
    try {
        const BookListQuery = queries.queryList.GET_Book_LIST_QUERY;
        const result = await dbConnection.dbQuery(BookListQuery);
        logger.info('return book list', result.rows);
        const data = JSON.parse(JSON.stringify(result.rows));
    
        // Use fast-csv to write data to the CSV file
        fastCsv.writeToStream(writeStream, data, { headers: true })
          .on("finish", () => {
            console.log("Write to books.csv successfully");
            res.download(path, (downloadError) => {
              if (downloadError) {
                console.error("Error downloading file: " + downloadError);
              } else {
                console.log("File downloaded successfully");
                // After the download is complete, you can delete the file
                try {
                  fs.unlinkSync(path);
                  console.log(`File ${path} has been deleted.`);
                } catch (deleteError) {
                  console.error("Error deleting file: " + deleteError);
                }
              }
            });
          });
    
      } catch (error) {
        console.error("Error: " + error);
        return res.status(500).send({ error: 'failed to export books!' });
      }
    }
