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
-- Table structure for table `tn_appointments`
--

DROP TABLE IF EXISTS `tn_appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tn_appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `patient_name` varchar(50) DEFAULT NULL,
  `patient_birthday` varchar(10) DEFAULT NULL,
  `patient_reason` varchar(255) DEFAULT NULL,
  `patient_phone` varchar(15) DEFAULT NULL,
  `numerical_order` int DEFAULT NULL,
  `position` int DEFAULT NULL,
  `appointment_time` varchar(20) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `tn_appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `tn_doctors` (`id`),
  CONSTRAINT `tn_appointments_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `tn_patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tn_appointments`
--

LOCK TABLES `tn_appointments` WRITE;
/*!40000 ALTER TABLE `tn_appointments` DISABLE KEYS */;
INSERT INTO `tn_appointments` VALUES (1,23,8,1,'Hiếu','2002-09-27','Khám tim','0865805699',1,1,'01:25','2023-06-12','PROCESSING','2023-06-10 00:00:00','2023-06-10 00:00:00'),(2,23,8,1,'Toàn','2002-09-27','Khám tai','0865805699',2,5,'10:00','2023-06-12','PROCESSING','2023-06-10 00:00:00','2023-06-10 00:00:00'),(3,31,8,1,'Quân Già','2002-09-27','Khám tai','0865805699',3,4,'14:00','2023-06-12','PROCESSING','2023-06-10 00:00:00','2023-06-10 00:00:00'),(4,31,8,1,'Dương Co Bóp','2002-09-27','Khám răng','0865805699',4,3,'08:00','2023-06-12','PROCESSING','2023-06-10 00:00:00','2023-06-10 00:00:00'),(5,31,8,1,'Hưng khẹc','2002-09-27','Khám răng','0865805699',5,2,'08:00','2023-06-12','PROCESSING','2023-06-10 00:00:00','2023-06-10 00:00:00');
/*!40000 ALTER TABLE `tn_appointments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30 15:19:19
