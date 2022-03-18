/* Replace with your SQL commands */
create extension  if not exists "uuid-ossp";
create table orders (
    id uuid default uuid_generate_v1() primary key ,
    user_id uuid default uuid_generate_v1() not null,
    status varchar(50) not null,
    foreign key (user_id) references users(id) on delete cascade
);

create table order_product(
    id uuid default uuid_generate_v1() primary key,
    order_id uuid default uuid_generate_v1(),
    product_id uuid default uuid_generate_v1(),
    quantity integer not null,
    foreign key (product_id) references product(id) on delete cascade,
    foreign key (order_id) references orders(id) on delete cascade
    
);