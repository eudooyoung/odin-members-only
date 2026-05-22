#! /user/bin/env node

import pg = require("pg");

const SQL = `
create table if not exists user (
    user_id int primary key generated always as identity,
    first_name varchar (50) not null,
    last_name varchar (50) not null,
    username varchar (255) not null unique,
    password varchar (50) not null,
    status boolean not null default true,
    is_admin boolean not null default false,
    created_at timestamptz default now()
);

create table if not eixsts message (
    message_id int primary key generated always as identity,
    user_id int not null,
    title varchar (100) not null,
    content text not null,
    created_at timestamptz default now(),
    constraint fk_user
        foreign key(user_id)
        references user(user_id)
        on delete cascade
);
`;
