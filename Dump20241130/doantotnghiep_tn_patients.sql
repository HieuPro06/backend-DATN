-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: doantotnghiep
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `tn_patients`
--

DROP TABLE IF EXISTS `tn_patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tn_patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `birthday` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tn_patients`
--

LOCK TABLES `tn_patients` WRITE;
/*!40000 ALTER TABLE `tn_patients` DISABLE KEYS */;
INSERT INTO `tn_patients` VALUES (1,'hieu@gmail.com','0865805699','27092002','HIEUTHUHAI',1,'','Ha Noi City','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0KtrpDFft0-vAtr94qdu9FmII-Hv4Vs98g&s',NULL,NULL),(2,'android@gmail.com','0982186496','123456','android-app',1,'09-05-2000','Bắc Ninh','','2024-11-15 10:51:11','2024-11-15 10:51:11'),(3,'android@gmail.com','0915149491','12345','android-app',1,'09-05-2000','Bắc Ninh','','2024-11-18 14:42:49','2024-11-18 14:42:49'),(4,'','0975608143','0975608143','',NULL,'Unknown','Unknown',NULL,'2024-11-19 09:46:49','2024-11-19 09:46:49'),(5,'','0975608143','0975608143','',NULL,'Unknown','Unknown',NULL,'2024-11-19 09:50:35','2024-11-19 09:50:35'),(7,'user@gmail.com','09726453442','$2b$10$Z.ctUrUWX5jdEbRBZM.Ia.d9jA/WNSHNfQvXa4hEd27iv8jZfqrvO','User',NULL,'Unknown','Unknown',NULL,'2024-11-24 10:25:49','2024-11-24 10:25:49'),(8,'user@gmail.com','09726453447','$2b$10$n2/lAl8mKj2uZ8/ApvIbbOAgcDk3hDY.k3ZEFFCnrQge/fNkGkIQ.','User',NULL,'Unknown','Unknown',NULL,'2024-11-27 08:16:32','2024-11-27 08:16:32'),(9,'user@gmail.com','097264534488','$2b$10$eTbJU9qlYhhh4iIAROerau59HK7zY8aFGYZCKYE.AcCcoNQ95KMA.','User',NULL,'Unknown','Unknown',NULL,'2024-11-27 08:18:21','2024-11-27 08:18:21');
/*!40000 ALTER TABLE `tn_patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30 15:19:18
