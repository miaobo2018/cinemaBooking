CREATE DATABASE  IF NOT EXISTS `cinema_booking` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cinema_booking`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: cinema_booking
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisement` (
  `adId` int(11) NOT NULL AUTO_INCREMENT,
  `AdTitle` varchar(255) DEFAULT NULL,
  `AdContent` mediumtext NOT NULL,
  PRIMARY KEY (`adId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisement`
--

LOCK TABLES `advertisement` WRITE;
/*!40000 ALTER TABLE `advertisement` DISABLE KEYS */;
INSERT INTO `advertisement` VALUES (1,'Welcome','Welcome to Cinema Booking Application!'),(2,'Spies In Disguise','Super spy Lance Sterling (Will Smith) and scientist Walter Beckett (Tom Holland) are almost exact opposites. Lance is smooth, suave and debonair. Walter is... not. But what Walter lacks in social skills he makes up for in smarts and invention, creating the awesome gadgets Lance uses on his epic missions.'),(3,'Underwater','UNDERWATER is a film that follows a crew of underwater researchers who must scramble to safety after an earthquake devastates their subterranean laboratory.'),(4,'Rate Pormotion','You may win some free tickets if you rate the movies after watching!'),(5,'Coupon','You have a 20% off coupon in your account!');
/*!40000 ALTER TABLE `advertisement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bookingId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `screenId` int(11) NOT NULL,
  `seatId` int(11) NOT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `userId` (`userId`),
  KEY `screenId` (`screenId`),
  KEY `seatId` (`seatId`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`screenId`) REFERENCES `screening` (`screeningId`),
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`seatId`) REFERENCES `seat` (`seatId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,1,1),(2,1,1,2),(3,5,1,3),(4,5,1,4),(5,5,1,5);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `filmId` int(11) NOT NULL AUTO_INCREMENT,
  `filmName` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `length` int(11) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`filmId`),
  UNIQUE KEY `filmName` (`filmName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,'Harry Potter','History',90,39.99),(2,'Big Movie','Comedy',120,39.99),(3,'Bad Boys For Life','Action',120,39.99),(4,'Underwater','Horror',90,29.99),(5,'Like A Boss','Comedy',90,29.99),(6,'The Way Back (2020)','Drama',120,39.99),(7,'Harley Quinn: Birds Of Prey','Action',120,39.99),(8,'The Turning','Horror',90,19.99),(9,'The Call Of The Wild','Adventure',120,29.99),(10,'Spies In Disguise','Animation',100,19.99);
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `rating` VALUES (1,1,1,'4'),(2,1,3,'5'),(3,2,1,'3'),(4,2,5,'2'),(5,1,5,'1'),(6,3,1,'5'),(7,4,1,'3'),(8,5,1,'4'),(9,6,1,'5'),(10,7,1,'5');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screening` (
  `screeningId` int(11) NOT NULL AUTO_INCREMENT,
  `screeningDay` varchar(20) DEFAULT NULL,
  `startTime` varchar(20) DEFAULT NULL,
  `sfilmId` int(11) NOT NULL,
  `sfilmName` varchar(255) NOT NULL,
  `sfilmPrice` decimal(5,2) NOT NULL,
  `sroomId` int(11) NOT NULL,
  PRIMARY KEY (`screeningId`),
  KEY `sfilmId` (`sfilmId`),
  KEY `sroomId` (`sroomId`),
  CONSTRAINT `screening_ibfk_1` FOREIGN KEY (`sfilmId`) REFERENCES `film` (`filmId`),
  CONSTRAINT `screening_ibfk_2` FOREIGN KEY (`sroomId`) REFERENCES `room` (`roomNum`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (1,'20200418','0900',1,'Harry Potter',39.99,1),(2,'20200418','0900',1,'Harry Potter',39.99,2),(3,'20200418','1100',2,'Big Movie',39.99,1),(4,'20200418','1100',2,'Big Movie',39.99,2),(5,'20200419','0900',3,'Bad Boys For Life',39.99,1),(6,'20200419','0900',3,'Bad Boys For Life',39.99,2),(7,'20200419','1100',4,'Underwater',29.99,3),(8,'20200419','1100',4,'Underwater',29.99,1),(9,'20200420','1100',5,'Like A Boss',29.99,1),(10,'20200420','1100',6,'The Way Back (2020)',39.99,3);
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `favouriteType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin',1,'admin','4088888888','Admin'), (2,'miaobo@miaobo.com','miaobo',1,'miaobo','4088888888','History'),(3,'xiaoming@xiaoming.com','xiaoming',1,'xiaoming','4087777777','Comedy'),(4,'junyan@junyan.com','junyan',1,'junyan','4086666666','Sci-Fi'),(5,'Alice@gmail.com','Alice',0,'Alice','4081234567','Adventure'),(6,'Bob@gmail.com','Bob',0,'Bob','4081234567','Drama'),(7,'Carrol@gmail.com','Carrol',0,'Carrol','4082345671','Action'),(8,'David@gmail.com','David',0,'David','4083456712','Animation'),(9,'Eric@gmail.com','Eric',0,'Eric','4084567123','Classic'),(10,'Frank@gmail.com','Frank',0,'Frank','4085671234','Crime'),(11,'Gigi@gmail.com','Gigi',0,'Gigi','4086712345','Family');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-24  1:37:22
