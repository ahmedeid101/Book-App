exports.queryList = {
    GET_STORE_LIST_QUERY: 'SELECT store_name, store_address, store_code, created_on, created_by FROM book_app.store;',
    
    SAVE_STORE_QUERY: 'INSERT INTO book_app.store(store_name, store_address, store_code, created_on, created_by)VALUES($1, $2, $3, $4, $5);',
    
    UPDATE_STORE_QUERY: 'UPDATE book_app.store SET store_name=$1, store_address=$2, store_code=$3, created_on=$4, created_by=$5 WHERE store_id= $6 ;' ,

    DELETE_STORE_QUERY: 'DELETE FROM book_app.store WHERE store_id=$1;',

    GET_Book_LIST_QUERY: 'SELECT book_id, book_title, book_publisher, book_author FROM book_app.book;',

    GET_Book_DETAILS_QUERY: `SELECT book_id, book_title, book_description, book_publisher, book_author, book_pages, book.store_code, store.store_name, store.store_address
                                FROM book_app.book
                                LEFT JOIN book_app.store ON book.store_code = store.store_code
                                WHERE book_id = $1;`,

    SAVE_BOOK_QUERY: `INSERT INTO book_app.book
                        (book_title, book_description, book_publisher, book_author, book_pages, store_code, created_on, created_by)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8);`,

    UPDATE_BOOK_QUERY: `UPDATE book_app.book
                        SET book_title=$1, book_description=$2, book_publisher=$3, book_author=$4, book_pages=$5, store_code=$6, created_on=$7, created_by=$8
                        WHERE book_id=$9;`,

    DELETE_BOOK_QUERY: 'DELETE FROM book_app.book WHERE book_id= $1;',

    AUDIT_QUERY : `INSERT INTO book_app.audit (audit_action, audit_data, audit_status, audit_error, audit_by, audit_on) 
                   VALUES($1, $2, $3, $4, $5, $6); `,


    GET_USER_LIST_QUERY: `SELECT user_id, username, "password", email, user_type_code, full_name, active, created_on, created_by, updated_on, updated_by
    FROM book_app."user";`,
    
    SAVE_User_QUERY: `INSERT INTO book_app."user"
    (username, "password", email, user_type_code, full_name, created_on, created_by)
    VALUES($1, $2, $3, $4, $5, $6, $7);`,
    
    IS_USER_EXIST_QUERY: `SELECT COUNT(user_id) FROM book_app."user" WHERE username=$1 or email=$2;`,

    UPDATE_USER_QUERY: `UPDATE book_app."user"
                        SET username=$1, "password"=$2, email=$3, user_type_code=$4, full_name=$5, created_on=$6, created_by=$7
                        WHERE user_id=$8;`,

    DELETE_USER_QUERY:`DELETE FROM book_app."user" WHERE username=$1;`,

    LOGIN_QUERY: `SELECT user_id, username, "password", email, user_type_code, full_name, active
    FROM book_app."user" WHERE LOWER(username) = LOWER($1) AND active = 1;`,
}