-- MySQL dump 10.13  Distrib 8.0.19, for osx10.14 (x86_64)
--
-- Host: localhost    Database: stylish
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `product_id` bigint NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `story` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (201807202140,'/img/campain_201807202140.jpg','瞬間\r\n在城市的角落\r\n找到失落多時的記憶。\r\n印象《都會故事集》'),(201807242222,'/img/campain_201807242222.jpg','永遠\r\n展現自信與專業\r\n無法抵擋的男人魅力。\r\n復古《再一次經典》'),(201807242228,'/img/campain_201807242228.jpg','於是\r\n我也想要給你\r\n一個那麼美好的自己。\r\n不朽《與自己和好如初》');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hots`
--

DROP TABLE IF EXISTS `hots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hots` (
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `products` json DEFAULT NULL,
  PRIMARY KEY (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hots`
--

LOCK TABLES `hots` WRITE;
/*!40000 ALTER TABLE `hots` DISABLE KEYS */;
/*!40000 ALTER TABLE `hots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `user_id` int DEFAULT NULL,
  `time` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total` int DEFAULT NULL,
  `user_orders` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` int NOT NULL AUTO_INCREMENT,
  `pay_orders` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pay` tinyint(1) DEFAULT NULL,
  `order_products` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_four` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otherimages`
--

DROP TABLE IF EXISTS `otherimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otherimages` (
  `images_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  KEY `product_id` (`id`),
  CONSTRAINT `otherimages_ibfk_1` FOREIGN KEY (`id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otherimages`
--

LOCK TABLES `otherimages` WRITE;
/*!40000 ALTER TABLE `otherimages` DISABLE KEYS */;
INSERT INTO `otherimages` VALUES ('https://d38p3ocem7m9yt.cloudfront.net/products/201807201824/other_images-0.jpg',201807201824),('https://d38p3ocem7m9yt.cloudfront.net/products/201807201824/other_images-1.jpg',201807201824),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202140/other_images-0.jpg',201807202140),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202140/other_images-1.jpg',201807202140),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202150/other_images-0.jpg',201807202150),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202150/other_images-1.jpg',201807202150),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202157/other_images-0.jpg',201807202157),('https://d38p3ocem7m9yt.cloudfront.net/products/201807202157/other_images-1.jpg',201807202157),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242211/other_images-0.jpg',201807242211),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242211/other_images-1.jpg',201807242211),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242216/other_images-0.jpg',201807242216),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242216/other_images-1.jpg',201807242216),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242222/other_images-0.jpg',201807242222),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242222/other_images-1.jpg',201807242222),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242228/other_images-0.jpg',201807242228),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242228/other_images-1.jpg',201807242228),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242230/other_images-0.jpg',201807242230),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242230/other_images-1.jpg',201807242230),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242232/other_images-0.jpg',201807242232),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242232/other_images-1.jpg',201807242232),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242234/other_images-0.jpg',201807242234),('https://d38p3ocem7m9yt.cloudfront.net/products/201807242234/other_images-1.jpg',201807242234),('https://d38p3ocem7m9yt.cloudfront.net/products/201902191210/other_images-0.jpg',201902191210),('https://d38p3ocem7m9yt.cloudfront.net/products/201902191210/other_images-1.jpg',201902191210);
/*!40000 ALTER TABLE `otherimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `texture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wash` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `place` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `story` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `main_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7375395917593195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (201807201824,'前開衩扭結洋裝','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',799,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807201824/main_image.jpg','women'),(201807202140,'透肌澎澎防曬襯衫','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',599,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','https://d38p3ocem7m9yt.cloudfront.net/products/201807202140/main_image.jpg','women'),(201807202150,' 小扇紋細織上衣','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',599,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','https://d38p3ocem7m9yt.cloudfront.net/products/201807202150/main_image.jpg','women'),(201807202157,' 活力花紋長筒牛仔褲','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',1299,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807202157/main_image.jpg','women'),(201807242211,' 純色輕薄百搭襯衫','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',799,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807242211/main_image.jp','men'),(201807242216,'時尚輕鬆休閒西裝','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',2399,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807242216/main_image.jpg','men'),(201807242222,'經典商務西裝','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',3999,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','https://d38p3ocem7m9yt.cloudfront.net/products/201807242222/main_image.jpg','men'),(201807242228,'夏日海灘戶外遮陽帽','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',1499,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','https://d38p3ocem7m9yt.cloudfront.net/products/201807242228/main_image.jpg','accessories'),(201807242230,'經典牛仔帽','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',799,'棉 100%','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807242230/main_image.jpg','accessories'),(201807242232,'卡哇伊多功能隨身包','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',1299,'牛皮','手洗，溫水','中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807242232/main_image.jpg','accessories'),(201807242234,'柔軟氣質羊毛圍巾','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',1799,'羊毛','乾洗','英國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201807242234/main_image.jpg','accessories'),(201902191210,'精緻扭結洋裝','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n',999,'棉 100%','手洗','越南','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.\r\n','https://d38p3ocem7m9yt.cloudfront.net/products/201902191210/main_image.jpg','women');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (38,'facebook','test','test@gmail.com','http','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(39,'native','test','test2@gmail.com','http','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(40,'facebook','Open Graph Test User','open_ezpvakg_user@tfbnw.net','http','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(41,'native','Open Graph Test User','test3@gmail.com','http','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(44,'native','18286','222@37469','http','76b38eac12212bcd7fa20412c058c39d98e6f0a098b9113e3f2763c7629a4c3a'),(45,'native','hihi ','ash@klck','http','c8ebeaba9f4007544e7e99d7e82419796b4ad269b60688d1377a715d656e8c18'),(46,'native','233','22@wwe','http','06d9f7d61e2aa01b4cfa08f1b3f3f2c157d715038bb3b78ccca04e9e11c0ea2f'),(47,'native','wwd','12@233','http','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(48,'native','www','wuuofu@186383','http','03b8866878bc75bb7766aca3d0b3b760084c6cde57fa281e3789b50a8f060481'),(49,'native','ss','ww@3ewf','http','fa947b79a53bfe756cadc213a1057b2c58aaedaa06148071c66d5257bd29935f'),(50,'native','24','2dwsf@1313','http','8039ca309b682ac27cf03b044734c16a22320e22f638a5bc0503e6afcd70c897'),(51,'native','23f2v','2rr3@rsggs','http','a42a431fe77d0458a935a9592ca9b418dcd7dfb148b3b01da0498e990822e36e'),(52,'native','gjkgiugi897','agsg@cncj','http','2838b63493d9cb47276551aaa0f931a1ac3d94f630791057fd5fa6d3c6c893ff'),(53,'native','hE','test5@123',NULL,'90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(54,'native','大帥哥','test6@123','','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(55,'native','帥哥二號','test7@123','','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(56,'native','大帥哥','test8@123','','90e2cd6afaf9cdef6eb243188c6d09247658dfc06feb2ca784c67a4220bbd4e4'),(57,'facebook','陳胤錡','ashin1207@gmail.com','','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `color_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  KEY `product_id_idx` (`stock`),
  KEY `x_idx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES ('FFDDDD','L',6,201902191242,'粉紅'),('FFFFFF','L',12,201902191242,'白色'),('FFFFFF','XL',10,201902191242,'白色'),('FFFFFF','L',10,201902191243,'白色'),('FFFFFF','L',13,201902191244,'白色'),('FFFFFF','L',15,201902191245,'白色'),('FFFFFF','L',15,201902191246,'白色'),('FFFFFF','L',15,201902191246,'白色'),('FFFFFF','S',15,201902191247,'白色'),('FFFFFF','S',15,201902191248,'白色'),('FFFFFF','S',25,201902191249,'白色'),('FFFFFF','S',5,201902191250,'白色'),('334455','S',3,201807242222,'深藍'),('334455','M',5,201807242222,'深藍'),('334455','L',6,201807242222,'深藍'),('334455','L',6,201807242223,'深藍'),('334455','L',6,201807242224,'深藍'),('334455','L',6,201807242225,'深藍'),('334455','L',6,201807242226,'深藍'),('334455','L',6,201807242227,'深藍'),('334455','L',6,201807242228,'深藍'),('334455','L',6,201807242229,'深藍'),('FFFFFF','S',3,201807242231,'白色'),('FFFFFF','S',33,12382,'白色'),('FFFFFF','S',333,12333,'白色'),('FFFFFF','L',30,201807242290,'白色'),('FFDDDD','L',30,201807242291,'粉紅'),('FFDDDD','M',30,201807242291,'粉紅'),('FFDDDD','M',30,201807242292,'粉紅'),('FFDDDD','M',30,201807242293,'粉紅'),('FFDDDD','M',30,201807242294,'粉紅'),('FFDDDD','M',30,201807242295,'粉紅'),('FFDDDD','M',30,201807242296,'粉紅'),('FFDDDD','M',30,201807242295,'粉紅'),('FFDDDD','M',30,201807242298,'粉紅'),('FFDDDD','M',30,201807242299,'粉紅'),('FFDDDD','M',30,201807242300,'粉紅'),('FFDDDD','S',30,201807242301,'粉紅'),('FFFFFF','S',23,2222222,'亮綠'),('DDF0FF','S',23,2222222,'淺藍'),('334455','S',25,2222222,'深藍'),('FFDDDD','S',24,2222225,'粉紅'),('FFDDDD','L',24,2222225,'粉紅'),('FFFFFF','S',233,12382,'白色'),('FFFFFF','L',233,12382,'白色'),('FFFFFF','S',33,12382,'白色'),('FFFFFF','S',23,2222225,'白色'),('FFFFFF','S',87,2222225,'白色'),('DDFFBB','S',12,201807202140,'亮綠'),('DDFFBB','M',10,201807202140,'亮綠'),('DDFFBB','L',10,201807202140,'亮綠'),('CCCCCC','S',10,201807202140,'淺灰'),('CCCCCC','M',5,201807202140,'淺灰'),('CCCCCC','L',8,201807202140,'淺灰'),('334455','S',5,201807242222,'深藍'),('334455','M',3,201807242222,'深藍'),('334455','L',3,201807242222,'深藍'),('334455','XL',4,201807242222,'深藍'),('DDF0FF','M',3,201807242228,'淺藍'),('DDF0FF','L',2,201807242228,'淺藍'),('FFFFFF','S',2,201807201824,'白色'),('FFFFFF','M',2,201807201824,'白色'),('FFFFFF','L',2,201807201824,'白色'),('DDFFBB','S',2,201807201824,'亮綠'),('DDFFBB','L',2,201807201824,'亮綠'),('CCCCCC','L',2,201807201824,'淺灰'),('DDFFBB','S',2,201807202150,'亮綠'),('DDFFBB','M',2,201807202150,'亮綠'),('CCCCCC','M',7,201807202150,'淺灰'),('CCCCCC','S',7,201807202150,'淺灰'),('BB7744','S',7,201807202150,'淺棕'),('BB7744','M',7,201807202150,'淺棕'),('DDF0FF','S',3,201807202157,'淺藍'),('DDF0FF','M',3,201807202157,'淺藍'),('DDF0FF','L',34,201807202157,'淺藍'),('334455','M',3,201807202157,'深藍'),('CCCCCC','S',23,201807202157,'淺灰'),('CCCCCC','M',23,201807202157,'淺灰'),('FFFFFF','M',5,201807242211,'白色'),('FFFFFF','L',5,201807242211,'白色'),('FFFFFF','XL',5,201807242211,'白色'),('DDF0FF','XL',5,201807242211,'淺藍'),('DDF0FF','L',5,201807242211,'淺藍'),('FFFFFF','S',2,201807242216,'白色'),('FFFFFF','M',2,201807242216,'白色'),('FFFFFF','L',2,201807242216,'白色'),('CCCCCC','S',2,201807242216,'淺灰'),('CCCCCC','M',2,201807242216,'淺灰'),('CCCCCC','L',2,201807242216,'淺灰'),('BB7744','M',2,201807242230,'淺棕'),('BB7744','L',2,201807242230,'淺棕'),('334455','L',2,201807242230,'深藍'),('FFFFFF','F',5,201807242232,'白色'),('FFDDDD','F',3,201807242232,'粉紅'),('FFFFFF','F',4,201807242234,'白色'),('DDF0FF','F',3,201807242234,'淺藍'),('FFFFFF','M',3,201902191210,'白色'),('FFDDDD','M',3,201902191210,'粉紅'),('FFDDDD','S',3,201902191210,'粉紅'),('FFDDDD','S',0,201807201824,'粉紅'),('FFDDDD','M',2,201807201824,'粉紅'),('FFFFFF','F',23,24162482,'白色'),('FFDDDD','F',23,24162482,'粉紅'),('FFDDDD','F',23,24162482,'粉紅'),('FFFFFF','F',23,24162482,'白色'),('FFDDDD','S',12,202006242230,'粉紅');
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 10:48:38
