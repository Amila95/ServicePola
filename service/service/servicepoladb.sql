-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2018 at 04:30 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servicepoladb`
--

-- --------------------------------------------------------

--
-- Table structure for table `main_talent`
--

CREATE TABLE `main_talent` (
  `m_t_id` int(11) NOT NULL,
  `m_t_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `m_t_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `main_talent`
--

INSERT INTO `main_talent` (`m_t_id`, `m_t_name`, `m_t_description`) VALUES
(4, 'Programming And Coding', 'For all your software requirements '),
(5, 'Graphics ', 'For all your graphic designing design '),
(6, 'Data Entry ', 'For all your Documentation and Create Writing Requirement   '),
(7, 'Photography ', 'For all your event covering Requirements '),
(8, 'O/L Tuition ', 'For all O/L tuition requirements '),
(9, 'A/L Tuition', 'For all A/L tuition requirements ');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `n_id` int(11) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `recieved_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content_type` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `p_id` int(11) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `publish_date` varchar(100) NOT NULL,
  `s_p_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `provider_talent`
--

CREATE TABLE `provider_talent` (
  `p_t_id` int(11) NOT NULL,
  `s_p_id` int(11) NOT NULL,
  `s_t_id` int(11) NOT NULL,
  `own_rate` varchar(25) NOT NULL DEFAULT '5',
  `own_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `s_p_id` int(11) NOT NULL,
  `s_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `overal_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `mobile` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT 'img/blog/profile.png'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_provider`
--

INSERT INTO `service_provider` (`s_p_id`, `s_name`, `email`, `overal_description`, `dob`, `town`, `address`, `district`, `mobile`, `image`) VALUES
(102, 'Admin Amila', 'amilawicramarathna95@gmail.com', 'fryf gfrubg rubgv urugb uhrubg gurbg bru', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/profile.png'),
(103, 'Wattiya', 'watti@gmail.com', 'hjvjcrb hvurjv  hbvur v', NULL, NULL, NULL, NULL, '0779868259', 'img/blog/profile.png');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('55Rm81hVKusg_2Kz3piOPnnOBQnAq2hC', 1545798580, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"user_id":96}}}');

-- --------------------------------------------------------

--
-- Table structure for table `sub_talent`
--

CREATE TABLE `sub_talent` (
  `s_t_id` int(11) NOT NULL,
  `s_t_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `s_t_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_sinhala_ci NOT NULL,
  `m_t_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_talent`
--

INSERT INTO `sub_talent` (`s_t_id`, `s_t_name`, `s_t_description`, `m_t_id`) VALUES
(4, 'Web App Development', 'Make your Web Application ', 4),
(5, 'Web App Designing', 'Design your web site here ', 4),
(6, 'Database Designing', 'Design Database for your scenario  ', 4),
(7, 'Mobile App Development', 'sample description', 4),
(8, 'Teaching And Helping for  Coding', 'sample description', 4),
(9, 'Desktop Application ', 'sample description', 4),
(10, 'Game Development', 'sample description', 4),
(11, 'IOT', 'sample description', 4),
(12, 'Logo Desinging', 'sample description', 5),
(13, 'Web and Mobile App designing(UI)', 'sample description', 5),
(14, '3D Model Designing ', 'sample description', 5),
(15, 'Photoshop Editing ', 'sample description', 5),
(16, 'T-shirt and Mugs Designing ', 'sample description', 5),
(17, 'Banner Designing ', 'sample description', 5),
(18, 'Animation Designing  ', 'sample description', 5),
(19, 'Video Editing ', 'sample description', 5),
(20, 'Presentation  Making', 'sample description', 6),
(21, 'Document Translating ', 'sample description', 6),
(22, 'Creative writing ', 'sample description', 6),
(23, 'Typing Services', 'sample description', 6),
(24, 'Web site content write', 'sample description', 6),
(25, 'Proof Reading & Editing', 'sample description', 6),
(26, 'Wedding photography ', 'sample description', 7),
(27, 'Party Coverage photography', 'sample description', 7),
(28, 'Mathematics  ', 'sample description', 8),
(29, 'English ', 'sample description', 8),
(30, 'Science ', 'sample description', 8),
(31, 'Sinhala ', 'sample description', 8),
(32, 'Combined Mathematics   ', 'sample description', 9),
(33, 'Physics ', 'sample description', 9),
(34, 'Chemistry  ', 'sample description', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `u_email` varchar(200) NOT NULL,
  `u_password` varchar(220) NOT NULL,
  `u_group` int(11) NOT NULL,
  `u_status` int(11) NOT NULL,
  `s_p_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_name`, `u_email`, `u_password`, `u_group`, `u_status`, `s_p_id`) VALUES
(96, 'Admin Amila', 'amilawicramarathna95@gmail.com', '$2b$10$R.PMLWYmoIilDqyyz7wbPeyBYspsxYSR5sSvxt2sFtSCv6xnL5y1C', 2, 1, 102),
(97, 'Wattiya', 'watti@gmail.com', '$2b$10$q0l8nXuwzmNeCu1xQTMTneU1kSXTA3m.3x2yDFRjU4WITSMQ7p32y', 2, 1, 103);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `main_talent`
--
ALTER TABLE `main_talent`
  ADD PRIMARY KEY (`m_t_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `s_p_id` (`s_p_id`);

--
-- Indexes for table `provider_talent`
--
ALTER TABLE `provider_talent`
  ADD PRIMARY KEY (`p_t_id`),
  ADD KEY `s_p_id` (`s_p_id`),
  ADD KEY `s_t_id` (`s_t_id`);

--
-- Indexes for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD PRIMARY KEY (`s_p_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `sub_talent`
--
ALTER TABLE `sub_talent`
  ADD PRIMARY KEY (`s_t_id`),
  ADD KEY `m_t_id` (`m_t_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD KEY `s_p_id` (`s_p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `main_talent`
--
ALTER TABLE `main_talent`
  MODIFY `m_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `provider_talent`
--
ALTER TABLE `provider_talent`
  MODIFY `p_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `s_p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `sub_talent`
--
ALTER TABLE `sub_talent`
  MODIFY `s_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
