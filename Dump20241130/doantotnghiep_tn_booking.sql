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
-- Table structure for table `tn_booking`
--

DROP TABLE IF EXISTS `tn_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tn_booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `booking_name` varchar(50) DEFAULT NULL,
  `booking_phone` varchar(15) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `birthday` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `appointment_date` varchar(10) DEFAULT NULL,
  `appointment_hour` varchar(5) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `service_id` (`service_id`),
  KEY `fk_tn_booking_tn_doctors` (`doctor_id`),
  CONSTRAINT `fk_tn_booking_tn_doctors` FOREIGN KEY (`doctor_id`) REFERENCES `tn_doctors` (`id`),
  CONSTRAINT `tn_booking_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `tn_patients` (`id`),
  CONSTRAINT `tn_booking_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `tn_services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tn_booking`
--

LOCK TABLES `tn_booking` WRITE;
/*!40000 ALTER TABLE `tn_booking` DISABLE KEYS */;
INSERT INTO `tn_booking` VALUES (23,1,1,'hieuphan','0865805699','hieuphan',1,'2003-12-20','USA','Khám tai','2023-10-03','08:00','PROCESSING',NULL,NULL,NULL),(31,1,7,'User','09726453442','User',1,'Unknown','Unknown','Em bị đau thắt khu vực bụng trái , em trước có bị viêm loét dạ dày ạ','20-10-2023','14:00','PROCESSING','2024-11-25 04:34:43','2024-11-25 04:34:43',8),(32,1,7,'User','09726453442','User',1,'Unknown','Unknown','Khám bỏng da','20-10-2023','14:01','CANCEL','2024-11-26 11:14:43','2024-11-26 11:14:43',8),(33,1,7,'User','09726453442','User',1,'Unknown','Unknown','Khám bỏng da','20-10-2023','14:01','CANCEL','2024-11-26 11:14:43','2024-11-26 11:14:43',8),(34,1,7,'User','09726453442','User',1,'Unknown','Unknown','Khám bỏng da','20-10-2023','14:01','PROCESSING','2024-11-26 11:14:43','2024-11-26 11:14:43',8),(35,1,7,'User','09726453442','User',1,'Unknown','Unknown','Khám bỏng da','20-10-2023','14:01','PROCESSING','2024-11-26 11:14:43','2024-11-26 11:14:43',8);
/*!40000 ALTER TABLE `tn_booking` ENABLE KEYS */;
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
