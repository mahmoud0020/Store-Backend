/* Replace with your SQL commands */
create extension  if not exists "uuid-ossp";
create table users(
    id uuid default uuid_generate_v1() primary key ,
    userName varchar(50) not null,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(250) not null
);