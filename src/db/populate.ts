#! /user/bin/env node

import pg from "pg";
import fs from "node:fs";
import config from "../config.js";

const SQL = `
drop table if exists member
                   , message cascade;

set timezone = 'Asia/Seoul';

create table if not exists member (
    member_id int primary key generated always as identity,
    username varchar (255) not null unique,
    first_name varchar (50) not null,
    last_name varchar (50) not null,
    password varchar (60) not null,
    status boolean,
    is_admin boolean not null default false,
    created_at timestamptz default now()
);

create table if not exists message (
    message_id int primary key generated always as identity,
    member_id int not null,
    title varchar (100) not null,
    content text not null,
    created_at timestamptz default now(),
    constraint fk_member
        foreign key(member_id)
        references member(member_id)
        on delete cascade
);
`;

const main = async () => {
  console.log("seeding start...");
  console.log(`preparing client for ${config.dbEnv} db...`);
  const client = new pg.Client({
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    ssl:
      config.dbEnv === "production"
        ? {
            rejectUnauthorized: true,
            ca: fs.readFileSync("./ca.pem").toString(),
          }
        : false,
  });

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
