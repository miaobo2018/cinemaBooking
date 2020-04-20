drop database if exists testmysqldb;
create database testmysqldb;
use testmysqldb;

CREATE TABLE testuser (
  id integer not null auto_increment,
  email varchar(255) not null,
  password varchar(255) not null,
  type integer, -- 0->user; 1->admin
  name varchar(255),
  cellphone varchar(255),
  favouriteType varchar(255),
  primary key (id)
);

CREATE TABLE testfilm (
	filmId integer not null auto_increment,
    filmName varchar(255),
    type varchar(255),
    length integer,
    primary key (filmId)
);

CREATE TABLE testroom (
	roomNum integer not null,
    primary key (roomNum)
);

CREATE TABLE testseat (
	sroomNum integer not null,
    rowNum char(1) not null, -- eg.A/B/C/D...
    colNum integer not null,
    available integer not null, -- 0->no one book; 1->someone book
    primary key (sroomNum, rowNum, colNum),
    foreign key (sroomNum) references testroom(roomNum)
);

CREATE TABLE testscreening (
	screeningId integer not null auto_increment,
    startTime varchar(20), -- date?
    sfilmId integer not null,
    sroomId integer not null,
    primary key (screeningId),
    foreign key (sfilmId) references testfilm(filmId),
    foreign key (sroomId) references testroom(roomNum)
);

INSERT testuser VALUES
(1,'miaobo@miaobo.com','miaobo',0,'miaobo','408888888','history'),
(2,'xiaoming@xiaoming.com','xiaoming',0,'xiaoming','4087777777','comedy');

INSERT testfilm VALUES 
(1,'Harry Potter','history',90),
(2,'Big Movie','comedy',120);

INSERT testroom VALUES
(1),
(2), 
(3);

INSERT testseat VALUES
(1,'A',1,0),
(1,'A',2,0),
(1,'B',1,0),
(1,'B',2,0),
(2,'A',1,0),
(2,'A',2,0),
(2,'B',1,0),
(2,'B',2,1);

INSERT testscreening VALUES
(1,'202004180900',1,1),
(2,'202004180900',1,2),
(3,'202004181100',2,1),
(4,'202004181100',2,2);

