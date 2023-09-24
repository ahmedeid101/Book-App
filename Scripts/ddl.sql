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

CREATE TABLE book_app.user(
	user_id serial NOT NULL,
    username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
	user_type_code VARCHAR(10) NOT NULL,
	full_name VARCHAR(50) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	updated_on timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_username_key UNIQUE (username)

);

CREATE TABLE book_app.group(
	group_id serial NOT NULL,
    group_name VARCHAR(100) NOT NULL,
	CONSTRAINT group_pkey PRIMARY KEY (group_id),
	CONSTRAINT group_group_name_key UNIQUE (group_name)
);


CREATE TABLE book_app.role(
	role_id serial NOT NULL,
    role_name VARCHAR(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT group_role_name_key UNIQUE (role_name)
);


CREATE TABLE book_app.user_group(
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE book_app.group_role(
	group_role_id serial NOT NULL,
	group_id int4 NULL,
	role_id int4 NULL,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE book_app.user_type(
	user_type_id serial NOT NULL,
    user_type_name VARCHAR(100) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);

