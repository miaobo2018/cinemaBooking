drop database if exists testmysqldb;
create database testmysqldb;
use testmysqldb;

CREATE TABLE testuser (
  id integer not null auto_increment,
  email varchar(255) not null,
  password varchar(255) not null,
  type varchar(255),
  name varchar(255),
  cellphone varchar(255),
  favouriteType varchar(255),
  primary key (id)
);

drop database if exists testfilm;
CREATE TABLE testfilm (
	filmId integer not null,
    filmName varchar(255),
    type varchar(255),
    length integer,
    primary key (filmId)
);