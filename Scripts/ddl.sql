-- book_app.book definition

-- create schema

CREATE SCHEMA book_app ;

-- book_app.store definition

-- Drop table

-- DROP TABLE book_app.book;

CREATE TABLE book_app.book (
	book_id serial4 NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(500) NULL,
	book_isban varchar(200) NULL,
	book_publisher varchar(50) NOT NULL,
	book_author varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);


-- book_app.store definition

-- Drop table

-- DROP TABLE book_app.store;

CREATE TABLE book_app.store (
	store_id serial NOT NULL,
	store_name varchar(100) NOT NULL,
	store_address varchar(300) NOT NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);


-- book_app.audit definition

-- Drop table

-- DROP TABLE book_app.audit;

CREATE TABLE book_app.audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	CONSTRAINT audit_pkey PRIMARY KEY (audit_id)
);