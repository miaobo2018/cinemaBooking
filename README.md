# cinemaBooking

2020-04-20
use init.sql to initialize the database;
use testcase.sql to test the db (not necessary);
book seat -> according to the roomNum, rowNum, colNum -> update available

2020-04-14 Bo 测试无误
注意需新建两个 sql 表格 如下，同时注意更改为本地用户与密码
主要实现功能: signup login admin->addfilm user->searchfilm
sql 异步问题必须注意

use testmysqldb;

CREATE TABLE testuser (
id integer not null,
email varchar(255) not null,
password varchar(255) not null,
type varchar(255),
name varchar(255),
cellphone varchar(255),
favouriteType varchar(255),
primary key (email)
);

CREATE TABLE testfilm (
filmId integer not null,
filmName varchar(255),
type varchar(255),
length integer,
primary key (filmId)
);
Test~
