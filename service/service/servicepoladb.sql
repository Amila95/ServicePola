-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2018 at 11:39 PM
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
(1, 'IT', 'bcnrcnkvmkbh bmh'),
(2, '\0ART', 'dbdbdjnmekemxmcx c'),
(3, 'dddddddd', 'dddddddddddd');

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

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`n_id`, `content`, `status`, `recieved_date`, `content_type`) VALUES
(1, '\0sample idea', 0, '2018-12-15 03:25:02', 1),
(2, 'sample idea111', 0, '2018-12-15 03:38:40', 2),
(3, '\0sample idea 333', 0, '2018-12-15 03:38:48', 1);

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

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`p_id`, `title`, `description`, `image_path`, `publish_date`, `s_p_id`) VALUES
(1, '\0aaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', NULL, '2018-11-22', 63),
(2, '\0aaaaa', 'aaaaaa', NULL, '2018-11-24', 65),
(3, '\0aaaaa', '\0aaaaaaaaa', NULL, '2018-11-25', 63),
(4, 'aw', 'awesda', '../upload/image_1543130195414_20728388_603198296738311_2737981469295855098_n.jpg', '2018-11-25', 63),
(5, 'imkm', '\0wwwwwww', NULL, '2018-12-01', 63),
(6, '\0sss', 'ssss', '../upload/image_1543644293490_rangi.jpg', '2018-12-01', 63),
(7, '\0aaa', '\0aaaaa', NULL, '2018-12-01', 63),
(8, 'asqenhfuvg', 'gyyu', NULL, '2018-12-01', 63),
(9, '\0aaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac', '../upload/image_1543672305316_39514999_2123470387867429_2081878344676147200_n.jpg', '2018-12-01', 63),
(10, '\0aaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '../upload/image_1543682252553_27901353_2072503472987488_29186791_o.jpg', '2018-12-01 22:07:32', 63),
(11, '\0aaa', '\0MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.', NULL, '2018-12-01 22:08:38', 63),
(12, '\0sssss', '\0Notice that the OrderDate column specifies NOW() as the default value. As a result, when you insert a row into the table, the current date and time are automatically inserted into the column.', NULL, '2018-12-01 22:09:58', 63),
(13, '\0aaa', '\0Notice that the OrderDate column specifies NOW() as the default value. As a result, when you insert a row into the table, the current date and time are automatically inserted into the column.', '../upload/image_1543682432403_WhatsApp Image 2018-07-06 at 2.03.43 PM.jpeg', '2018-12-01 22:10:32', 63),
(14, 'ss', 'ssss', '../upload/image_1543792625997_39514999_2123470387867429_2081878344676147200_n.jpg', '2018-12-03 04:47:06', 63),
(15, 'zzzz', 'It was the fourth wicket stand that led Lanka\'s recovery in the first innings and as expected - it has been the same script in the second innings too. Just that, in place of Karunaratne, Mathews has got Kusal Mendis at the other end, who\'s looked in ', NULL, '2018-12-18 05:58:09', 70),
(16, '\0aaaaa', '\018:10 Local Time, 05:10 GMT, 10:40 IST: What an enormous effort from the pair of Kusal Mendis and Angelo Mathews. They\'ve batted through the whole of Day 4 to carry Sri Lanka towards safer shores. The duo have faced 577 balls together in this epic partnership, after taking over when the visitors were 13/3 and in big trouble. At that point, who would\'ve thought this was a possibility? But they\'ve taken body blows, shown immense powers of concentration and have shut the door on the New Zealand bowling. The pitch, from which the pace seems to have completely died off, has helped, but take nothing away from the application we\'ve seen today. Mendis and Mathews, both with completely different points to prove, can be really proud of their respective hundreds, which should be match-saving ones from here, unless New Zealand pull off something dramatic on the final day. That\'s all from us for now. See you guys tomorrow. Cheers!', NULL, '2018-12-19 02:59:51', 70),
(17, 'tygy', 'gyhunh', '../upload/image_1545171961493_CV Amila Wickramarathne.pdf', '2018-12-19 03:56:01', 70),
(18, 'eeee', '\0eeeeeee', '../upload/image_1545172222004_1 chap.pdf', '2018-12-19 04:00:22', 70),
(20, '\0g\0h\0h\0h', '\0ggggg', NULL, '2018-12-21 04:48:59', 97),
(21, 'දඅලිල න්ත්ග්ත් ව්ත්', 'දඅලිල න්ත්ග්ත් ව්ත්', NULL, '2018-12-21 05:01:33', 97);

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

--
-- Dumping data for table `provider_talent`
--

INSERT INTO `provider_talent` (`p_t_id`, `s_p_id`, `s_t_id`, `own_rate`, `own_description`) VALUES
(25, 71, 1, '5', 'I did a courese of grapic and i konw corrlea,ms word power point and ect'),
(24, 65, 1, '5', 'aaaaaaaaaaaaaaaaaaaaaa'),
(23, 63, 3, '5', '\0aaaaaaa'),
(22, 63, 2, '5', '\0awasawaaw'),
(21, 63, 1, '5', 'aaaaaaaaaaaaaaaaaaaa'),
(19, 48, 1, '5', '\0C C# C++ python php R Ruby i\'m exprencess and i kown data satureches and lot of aria.'),
(20, 48, 1, '5', 'photo shop exprince and my life lot of use it.'),
(18, 48, 1, '5', '\0normal i done a several project. node php express laravel codeiginiter mongo sql pgsql I use for my web desing.'),
(26, 70, 1, '5', 'ftgyhyju'),
(27, 70, 3, '5', '\0drtivnt'),
(28, 70, 1, '5', '\0maximum number of characters allowed in the <input> element. Browser Support. The numbers in the table specify the first browser version that fully supports the attribute. Attribute. Differences Between HTML 4.01 and HTML5. ...'),
(29, 70, 1, '5', 'tttttttt');

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
  `image` varchar(255) DEFAULT 'img/blog/author.png'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_provider`
--

INSERT INTO `service_provider` (`s_p_id`, `s_name`, `email`, `overal_description`, `dob`, `town`, `address`, `district`, `mobile`, `image`) VALUES
(97, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aac h jnjk hb', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(98, 'Pathum', 'pathum@gmail.com', 'a gvg gvb', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png');

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
('iX9xuqT5gv2LezXAUUj_LnXCFL6omvvQ', 1545410983, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"user_id":91}}}');

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
(1, 'Graphic', 'rcgvhbhbh', 1),
(2, 'Create a song', 'sssssssssssssss', 2),
(3, 'Java SE', 'ssdfghhhhdss', 1);

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
(92, 'Pathum', 'pathum@gmail.com', '$2b$10$.5rDGFVEGlGsxgl/gc0Wgu5P.t0umk5NiG9WbIjHPbSH3xXwJ4ReG', 2, 1, 98),
(91, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$yVy3t24Qijhm8H0uJch53O0qMctFm4ryYr.BgdIlKDb6t4VcZH/ta', 1, 1, 97);

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
  MODIFY `m_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `provider_talent`
--
ALTER TABLE `provider_talent`
  MODIFY `p_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `s_p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `sub_talent`
--
ALTER TABLE `sub_talent`
  MODIFY `s_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
