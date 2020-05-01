CREATE DATABASE  IF NOT EXISTS `cinema_booking` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cinema_booking`;
-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: cinema_booking
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `advertisement`
--

DROP TABLE IF EXISTS `advertisement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `advertisement` (
  `adId` int(11) NOT NULL AUTO_INCREMENT,
  `AdTitle` varchar(255) DEFAULT NULL,
  `AdContent` mediumtext NOT NULL,
  PRIMARY KEY (`adId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisement`
--

LOCK TABLES `advertisement` WRITE;
/*!40000 ALTER TABLE `advertisement` DISABLE KEYS */;
INSERT INTO `advertisement` VALUES (2,'Spies In Disguise',' Walter is... not. But what Walter lacks in social skills he makes up for in smarts and invention, creating the awesome gadgets Lance uses on his epic missions.'),(3,'Underwater','UNDERWATER is a film that follows a crew of underwater researchers who must scramble to safety after an earthquake devastates their subterranean laboratory.'),(12,'Welcome','Welcome to Spanda Cinema!!!!');
/*!40000 ALTER TABLE `advertisement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `booking` (
  `bookingId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `filmname` varchar(45) DEFAULT NULL,
  `day` varchar(45) DEFAULT NULL,
  `startTime` varchar(45) DEFAULT NULL,
  `seat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookingId`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `film` (
  `filmId` int(11) NOT NULL AUTO_INCREMENT,
  `filmName` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `length` int(11) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`filmId`),
  UNIQUE KEY `filmName` (`filmName`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (2,'Big Movie','Comedy',120,39.99),(3,'Bad Boys For Life','Action',120,39.99),(4,'Underwater','Horror',90,29.99),(5,'Like A Boss','Comedy',90,29.99),(6,'The Way Back (2020)','Drama',120,39.99),(7,'Harley Quinn: Birds Of Prey','Action',120,39.99),(8,'The Turning','Horror',90,19.99),(9,'The Call Of The Wild','Adventure',120,29.99),(10,'Spies In Disguise','Animation',100,19.99),(52,'Harry Potter 1','Thriller',90,123.00),(53,'Harry Potter2','Thriller',90,12.00);
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rating` (
  `ratingId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `filmId` int(11) NOT NULL,
  `score` enum('1','2','3','4','5') DEFAULT NULL,
  PRIMARY KEY (`ratingId`),
  KEY `userId` (`userId`),
  KEY `filmId` (`filmId`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `film` (`filmId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room` (
  `roomNum` int(11) NOT NULL,
  PRIMARY KEY (`roomNum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1),(2),(3),(4),(5);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screening`
--

DROP TABLE IF EXISTS `screening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `screening` (
  `screeningId` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(20) DEFAULT NULL,
  `startTime` varchar(20) DEFAULT NULL,
  `sfilmId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sfilmPrice` decimal(5,2) NOT NULL,
  `room` int(11) NOT NULL,
  PRIMARY KEY (`screeningId`),
  KEY `sfilmId` (`sfilmId`),
  KEY `room` (`room`),
  CONSTRAINT `screening_ibfk_1` FOREIGN KEY (`sfilmId`) REFERENCES `film` (`filmId`),
  CONSTRAINT `screening_ibfk_2` FOREIGN KEY (`room`) REFERENCES `room` (`roomNum`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (3,'Tuesday','1100',2,'Big Movie',39.99,1),(4,'Thursday','1100',2,'Big Movie',39.99,2),(5,'Wednesday','0900',3,'Bad Boys For Life',39.99,1),(6,'Saturday','0900',3,'Bad Boys For Life',39.99,2),(7,'Saturday','1100',4,'Underwater',29.99,3),(8,'Sunday','1100',4,'Underwater',29.99,1),(9,'Sunday','1100',5,'Like A Boss',29.99,1),(10,'Thursday','1100',6,'The Way Back (2020)',39.99,3),(286,'Monday','9:00',52,'Harry Potter 1',123.00,3),(287,'Monday','14:00',52,'Harry Potter 1',123.00,3),(288,'Tuesday','9:00',52,'Harry Potter 1',123.00,3),(289,'Tuesday','14:00',52,'Harry Potter 1',123.00,3),(290,'Monday','8:00',53,'Harry Potter2',12.00,2),(291,'Monday','9:00',53,'Harry Potter2',12.00,2),(292,'Monday','14:00',53,'Harry Potter2',12.00,2),(293,'Tuesday','8:00',53,'Harry Potter2',12.00,2),(294,'Tuesday','9:00',53,'Harry Potter2',12.00,2),(295,'Tuesday','14:00',53,'Harry Potter2',12.00,2);
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seat` (
  `seatId` int(11) NOT NULL AUTO_INCREMENT,
  `sroomNum` int(11) NOT NULL,
  `rowNum` char(1) NOT NULL,
  `colNum` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  PRIMARY KEY (`seatId`),
  KEY `sroomNum` (`sroomNum`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`sroomNum`) REFERENCES `room` (`roomNum`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,1,'A',1,0),(2,1,'A',2,0),(3,1,'A',3,0),(4,1,'A',4,0),(5,1,'A',5,0),(6,1,'A',6,0),(7,1,'B',1,0),(8,1,'B',2,0),(9,1,'B',3,0),(10,1,'B',4,0),(11,1,'B',5,0),(12,1,'B',6,0),(13,2,'A',1,0),(14,2,'A',2,0),(15,2,'A',3,0),(16,2,'A',4,0),(17,2,'A',5,0),(18,2,'A',6,0),(19,2,'B',1,0),(20,2,'B',2,1),(21,2,'B',3,0),(22,2,'B',4,0),(23,2,'B',5,0),(24,2,'B',6,0),(25,3,'A',1,0),(26,3,'A',2,0),(27,3,'A',3,0),(28,3,'A',4,0),(29,3,'A',5,0),(30,3,'A',6,1),(31,3,'B',1,0),(32,3,'B',2,0),(33,3,'B',3,0),(34,3,'B',4,0),(35,3,'B',5,0),(36,3,'B',6,0);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `favouriteType` varchar(255) DEFAULT NULL,
  `spending` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `index2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'liuxiaomingskm@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','admin','140832692176','thriller',2000),(2,'miaobo@miaobo.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','miaobo','4088888888','History',3000),(3,'xiaoming@xiaoming.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','PLATINUM','xiaoming','4087777777','Comedy',30000),(4,'junyan@junyan.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','junyan','4086666666','Sci-Fi',2500),(5,'Alice@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','Alice','4081234567','Adventure',1200),(6,'Bob@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','Bob','4081234567','Drama',800),(7,'Carrol@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','SILVER','Carrol','4082345671','Action',2300),(8,'David@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','GOLD','David','4083456712','Animation',3400),(9,'Eric@gmail.com','sha1$904bd35b$1$6a075d5e595004eeebce6b200b42832c89007115','GOLD','Eric','4084567123','Classic',4200),(29,'liuxiaomingskm@gmail.com','sha1$694ba055$1$a1919678f6d32d21cca0f35bee35b2ac695965e8','SILVER','liu','14083269217','thriller',2000),(30,'liuxiaomingskm@gmail.com','sha1$ea434b1c$1$96721c40897711984f9d3f2af723a101b1c9cf54','SILVER','liu1','14083269217','thriller',1222),(31,'liuxiaomingskm@gmail.com','sha1$49bc64f9$1$a2a5642f3c2648c1f646f8f6a9cf913e5e335eef','SILVER','liu3','14083269217','baobaobabaaini',2323);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- create view
DROP VIEW IF EXISTS `film_seat`;
CREATE VIEW film_seat
AS SELECT f.filmName, se.sroomNum, se.rowNum, se.colNum 
from seat se, screening sc, film f
where f.filmId = sc.sfilmId and sc.room = se.sroomNum;
-- create view end

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-01 12:47:28
