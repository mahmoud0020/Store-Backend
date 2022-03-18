/* Replace with your SQL commands */
create extension  if not exists "uuid-ossp";
create table product(
    id uuid default uuid_generate_v1() primary key ,
    prodName varchar(50) not null,
    price integer not null
)