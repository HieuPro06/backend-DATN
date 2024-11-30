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
-- Table structure for table `tn_doctors`
--

DROP TABLE IF EXISTS `tn_doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tn_doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `active` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `speciality_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `recovery_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `speciality_id` (`speciality_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `tn_doctors_ibfk_1` FOREIGN KEY (`speciality_id`) REFERENCES `tn_specialities` (`id`),
  CONSTRAINT `tn_doctors_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `tn_rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tn_doctors`
--

LOCK TABLES `tn_doctors` WRITE;
/*!40000 ALTER TABLE `tn_doctors` DISABLE KEYS */;
INSERT INTO `tn_doctors` VALUES (5,'phananhhieu2002@gmail.com','0868999025','27092002','hieuDepzaaaai','abc',159000,'member',1,'https://doanhnhanphaply.com/wp-content/uploads/2024/09/anh-gai-xinh-cute.jpg','2024-11-07 08:31:31','2024-11-07 08:31:31',NULL,NULL,NULL),(7,'bamboo@gmail.com','0292166574','123456','Zuka','',100000,'member',1,'','2024-11-07 12:36:40','2024-11-07 12:36:40',NULL,NULL,NULL),(8,'fb@gmail.com','0292166574','123456','Tfience','',100000,'member',1,'','2024-11-07 12:38:28','2024-11-07 12:38:28',NULL,NULL,NULL),(9,'admin@gmail.com','0966766868','0966766868','admin','',100000,'admin',1,'','2024-11-07 13:20:51','2024-11-07 13:20:51',NULL,NULL,NULL),(10,'xuan@gmail.com','051395815195','4161661616','Dr. John Doe','abc',100455,'supporter',1,'','2024-11-07 15:50:10','2024-11-07 15:50:10',3,NULL,NULL),(11,'jack@gmail.com','0338765567','0338765567','Dr. John Doe','0338765567',5000000,'supporter',1,'','2024-11-07 17:11:50','2024-11-07 17:11:50',3,1,NULL),(12,'trump@gmail.com','0338765567','0338765567','Dr. John Doe','0338765567',5000000,'doctor',1,'','2024-11-07 17:18:11','2024-11-07 17:18:11',3,9,NULL),(19,'mbappe@gmail.com','03387655671','123456','','',100000,'doctor',1,'','2024-11-23 08:54:17','2024-11-23 08:54:17',1,1,NULL),(20,'ulas@gmail.com','093317151256','123456','','',100000,'doctor',1,'','2024-11-23 09:08:49','2024-11-23 09:08:49',1,1,NULL),(21,'cerasao@gmail.com','0303201102','123456','','',100000,'doctor',1,'','2024-11-24 10:07:43','2024-11-24 10:07:43',1,1,NULL),(22,'ubolt@gmail.com','09726453442','$2b$10$zDirM8YeIg8362/HDKs4ie4ehGtX4KWRuW/JgxCZyK49gUKOu6Iq2','','',100000,'admin',1,'','2024-11-24 10:18:17','2024-11-24 10:18:17',1,1,NULL),(23,'hao@gmail.com','0974517643','$2b$10$UadLnrSGFoiaAaEJkFpXHuAEyeMcec7JHYd5sp4X3z/qoGRtNiXSu','','',100000,'supporter',1,'','2024-11-28 10:37:47','2024-11-28 10:37:47',1,1,NULL),(26,'miami@gmail.com','0974515467','$2b$10$UyVAd5nqq2UtbUEr40H4j.e21hpsA.OYB0m5RTJsI3VYxJkI6mtDm','','',100000,'doctor',1,'','2024-11-29 09:05:17','2024-11-29 09:05:17',1,1,NULL),(27,'abc@gmail.com','0998819191','$2b$10$KsOALMNsmewvl2w.Fx6aTeECrhs0jGrdoW4luoxbQ9bEYqkAejZZe','','',100000,'doctor',1,'','2024-11-29 09:24:06','2024-11-29 09:24:06',1,1,NULL),(28,'hien@gmail.com','099881919122','$2b$10$AxmEYBa0b3nonKysnM/VwejgEF491B3ue26pgBQ0A1FoNwT6iuWFe','','',100000,'doctor',1,'','2024-11-29 09:24:58','2024-11-29 09:24:58',1,1,NULL);
/*!40000 ALTER TABLE `tn_doctors` ENABLE KEYS */;
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
