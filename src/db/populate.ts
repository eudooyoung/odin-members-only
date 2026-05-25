#! /user/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
drop table if exists person
                   , message;

set timezone = 'Asia/Seoul';

create table if not exists person (
    person_id int primary key generated always as identity,
    first_name varchar (50) not null,
    last_name varchar (50) not null,
    username varchar (255) not null unique,
    password varchar (50) not null,
    status boolean not null default true,
    is_admin boolean not null default false,
    created_at timestamptz default now()
);

create table if not exists message (
    message_id int primary key generated always as identity,
    person_id int not null,
    title varchar (100) not null,
    content text not null,
    created_at timestamptz default now(),
    constraint fk_person
        foreign key(person_id)
        references person(person_id)
        on delete cascade
);
`;

const main = async () => {
  console.log("seeding start...");
  let client: pg.Client;
  if (process.argv[2] === "local") {
    console.log("preparing client for local db...");
    client = new pg.Client({
      connectionString: process.env.LOCAL_DB_URL,
    });
  } else {
    console.log("preparing client for remote db...");
    client = new pg.Client({
      user: process.env.REMOTE_DB_USER,
      password: process.env.REMOTE_DB_PW,
      host: process.env.REMOTE_EB_HOST,
      port: Number(process.env.REMOTE_DB_PORT),
      database: process.env.REMOTE_DB_NAME,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
      },
    });
  }
  console.log("client build successfully");
  console.log("start trying to connect to db...");
  try {
    await client.connect();
    console.log("connected");
    await client.query(SQL);
    console.log("tables have been successfully populated!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    console.log("end connection");
  }
};

void main();
