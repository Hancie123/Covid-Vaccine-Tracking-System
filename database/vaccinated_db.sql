

CREATE TABLE `individual_list` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `tracking_code` varchar(50) NOT NULL,
  `firstname` text NOT NULL,
  `middlename` text NOT NULL,
  `lastname` text NOT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=Partially Vaccinated, 2= Fully Vaccinated',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO individual_list VALUES("1","133632365921974","Hancie","Wanem","Phago","Male","2003-05-03","9825915122","Bhadrapur-2, Jhapa, Nepal","2","2021-10-18 16:00:22","2022-07-29 18:35:01");



CREATE TABLE `system_info` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `meta_field` text NOT NULL,
  `meta_value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

INSERT INTO system_info VALUES("1","name","Covid Vaccine Tracking System- By NH GROUP");
INSERT INTO system_info VALUES("6","short_name","CVT System");
INSERT INTO system_info VALUES("11","logo","uploads/logo-1634524879.png");
INSERT INTO system_info VALUES("13","user_avatar","uploads/user_avatar.jpg");
INSERT INTO system_info VALUES("14","cover","uploads/cover-1634524906.jpg");



CREATE TABLE `users` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `avatar` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `location_id` int(30) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO users VALUES("1","Adminstrator","Admin","admin","0192023a7bbd73250516f069df18b500","uploads/1624240500_avatar.png","","1","","2021-01-20 14:02:37","2021-06-21 09:55:07");
INSERT INTO users VALUES("4","Nitesh","Hamal","Nitesh720","7d573eff533d0dfcf742aa2fb0706db1","uploads/avatar-4.png?v=1634529434","","2","1","2021-10-18 11:57:14","2022-07-29 18:34:13");



CREATE TABLE `vaccination_location_list` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `location` text NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO vaccination_location_list VALUES("1","Bhadrapur-2, Jhapa","1","2021-10-18 11:16:32");
INSERT INTO vaccination_location_list VALUES("2","Birtamode, Jhapa","1","2021-10-18 11:20:21");
INSERT INTO vaccination_location_list VALUES("3","Damak, Jhapa","1","2021-10-18 11:20:42");
INSERT INTO vaccination_location_list VALUES("4","Baniyani, Jhapa","1","2021-10-18 11:21:06");



CREATE TABLE `vaccine_history_list` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `user_id` int(30) DEFAULT NULL,
  `individual_id` int(30) NOT NULL,
  `vaccine_id` int(30) NOT NULL,
  `location_id` int(30) NOT NULL,
  `vaccination_type` varchar(50) NOT NULL,
  `vaccinated_by` text NOT NULL,
  `remarks` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `vaccine_id` (`vaccine_id`),
  KEY `location_id` (`location_id`),
  KEY `individual_id` (`individual_id`),
  CONSTRAINT `vaccine_history_list_ibfk_1` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine_list` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vaccine_history_list_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `vaccination_location_list` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vaccine_history_list_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `vaccine_history_list_ibfk_7` FOREIGN KEY (`individual_id`) REFERENCES `individual_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

INSERT INTO vaccine_history_list VALUES("1","1","1","1","4","1st Dose","Dr. Yoncho Limbu","Sample Only","2021-10-18 16:00:22","2022-07-29 18:38:58");
INSERT INTO vaccine_history_list VALUES("8","1","1","5","1","2nd Dose","Dr. Sayal Limbu","Final Dose","2021-10-18 17:01:39","2022-07-29 18:39:09");



CREATE TABLE `vaccine_list` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

INSERT INTO vaccine_list VALUES("1","Pfizer-BioNTech","1","2021-10-18 11:05:20");
INSERT INTO vaccine_list VALUES("2","Moderna","1","2021-10-18 11:05:24");
INSERT INTO vaccine_list VALUES("3","Johnson & Johnson’s Janssen","1","2021-10-18 11:05:30");
INSERT INTO vaccine_list VALUES("4","AstraZeneca","1","2021-10-18 11:07:42");
INSERT INTO vaccine_list VALUES("5","Sinovac","1","2021-10-18 11:08:25");

