-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2018 at 04:39 PM
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
  `m_t_name` varchar(50) NOT NULL,
  `m_t_description` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `main_talent`
--

INSERT INTO `main_talent` (`m_t_id`, `m_t_name`, `m_t_description`) VALUES
(1, 'IT', 'bcnrcnkvmkbh bmh'),
(2, 'ART', 'dbdbdjnmekemxmcx c'),
(3, 'dddddddd', 'dddddddddddd');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `n_id` int(11) NOT NULL,
  `contenr` varchar(255) NOT NULL,
  `status_type` int(11) NOT NULL,
  `recieved_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `p_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `publish_date` varchar(100) NOT NULL,
  `s_p_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`p_id`, `title`, `description`, `image_path`, `publish_date`, `s_p_id`) VALUES
(1, 'aaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', NULL, '2018-11-22', 63),
(2, 'aaaaa', 'aaaaaa', NULL, '2018-11-24', 65),
(3, 'aaaaa', 'aaaaaaaaa', NULL, '2018-11-25', 63),
(4, 'aw', 'awesda', '../upload/image_1543130195414_20728388_603198296738311_2737981469295855098_n.jpg', '2018-11-25', 63),
(5, 'imkm', 'wwwwwww', NULL, '2018-12-01', 63),
(6, 'sss', 'ssss', '../upload/image_1543644293490_rangi.jpg', '2018-12-01', 63),
(7, 'aaa', 'aaaaa', NULL, '2018-12-01', 63),
(8, 'asqenhfuvg', 'gyyu', NULL, '2018-12-01', 63),
(9, 'aaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac', '../upload/image_1543672305316_39514999_2123470387867429_2081878344676147200_n.jpg', '2018-12-01', 63),
(10, 'aaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '../upload/image_1543682252553_27901353_2072503472987488_29186791_o.jpg', '2018-12-01 22:07:32', 63),
(11, 'aaa', 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.', NULL, '2018-12-01 22:08:38', 63),
(12, 'sssss', 'Notice that the OrderDate column specifies NOW() as the default value. As a result, when you insert a row into the table, the current date and time are automatically inserted into the column.', NULL, '2018-12-01 22:09:58', 63),
(13, 'aaa', 'Notice that the OrderDate column specifies NOW() as the default value. As a result, when you insert a row into the table, the current date and time are automatically inserted into the column.', '../upload/image_1543682432403_WhatsApp Image 2018-07-06 at 2.03.43 PM.jpeg', '2018-12-01 22:10:32', 63),
(14, 'ss', 'ssss', '../upload/image_1543792625997_39514999_2123470387867429_2081878344676147200_n.jpg', '2018-12-03 04:47:06', 63);

-- --------------------------------------------------------

--
-- Table structure for table `provider_talent`
--

CREATE TABLE `provider_talent` (
  `p_t_id` int(11) NOT NULL,
  `s_p_id` int(11) NOT NULL,
  `s_t_id` int(11) NOT NULL,
  `own_rate` varchar(25) NOT NULL DEFAULT '5',
  `own_description` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provider_talent`
--

INSERT INTO `provider_talent` (`p_t_id`, `s_p_id`, `s_t_id`, `own_rate`, `own_description`) VALUES
(25, 71, 1, '5', 'I did a courese of grapic and i konw corrlea,ms word power point and ect'),
(24, 65, 1, '5', 'aaaaaaaaaaaaaaaaaaaaaa'),
(23, 63, 3, '5', 'aaaaaaa'),
(22, 63, 2, '5', 'awasawaaw'),
(21, 63, 1, '5', 'aaaaaaaaaaaaaaaaaaaa'),
(19, 48, 1, '5', 'C C# C++ python php R Ruby i\'m exprencess and i kown data satureches and lot of aria.'),
(20, 48, 1, '5', 'photo shop exprince and my life lot of use it.'),
(18, 48, 1, '5', 'normal i done a several project. node php express laravel codeiginiter mongo sql pgsql I use for my web desing.');

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `s_p_id` int(11) NOT NULL,
  `s_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `overal_description` varchar(255) NOT NULL,
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
(69, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aa', '2018-11-03', 'aa', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '0750504648', 'img/blog/author.png'),
(68, 'Sandali', 'amilawicramarathna95@gmail.com', 'a', '2018-11-01', 'a', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', 'aaa', 'img/blog/author.png'),
(67, 'hasini', 'hasini@gmail.com', 'aaaaa', '2018-11-02', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', '../upload/image_1544568265835_lina2.jpg'),
(65, 'Padum', 'pathum@gmail.com', 'Power man in Python,C++,Angular', '2018-11-05', 'Athurugiriya', 'athurugiriya', 'Colombo', '0750504648', 'img/blog/author.png'),
(64, 'Wicky', 'amilawicramarathna95@gmail.com', 'aaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '0750504648', NULL),
(66, 'Dinura', 'dinura@gmai.com', 'dddddd', '2018-11-06', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(63, 'Wicky', 'amilawicramarathna95@gmail.com', 'good anjdndbdh d', '2018-11-01', NULL, NULL, NULL, '0750504648', '../upload/image_1544308986897_ss1.jpg'),
(72, 'shaminda', 'shamin@gmail.com', 'dfhe guef gej hvebf gvh ev gvdhwvd gdvh hbjhfdg vdvdvdg jdjndjvg  gvhshs hbjbd jnjn djbdhw hbhbd hbb hbdjn hbjnjnd vdhb gvdhvd gvdvgd', NULL, NULL, NULL, NULL, '0754895864', 'img/blog/author.png'),
(62, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Gampaha', '0750504648', 'img/blog/author.png'),
(61, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Gampaha', '0750504648', NULL),
(60, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Gampaha', '0750504648', NULL),
(59, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Gampaha', '0750504648', NULL),
(58, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Gampaha', '0750504648', NULL),
(57, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '0750504648', NULL),
(56, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '0750504648', NULL),
(55, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaa', '2018-11-12', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(54, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaaaa', '2018-11-14', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(52, 'Sandali', 'sandali@gmail.com', 'aaaaaaaa', '2018-11-12', 'a', 'aaa', 'Colombo', '0750504648', NULL),
(53, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaa', '2018-11-12', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', 'aaa', NULL),
(50, 'public', 'amilawicramarathna95@gmail.com', 'aaaaaaa', '2018-11-11', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(51, 'public', 'amilawicramarathna95@gmail.com', 'aaaaaaa', '2018-11-11', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(49, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aa', '2018-11-01', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '+2757750', NULL),
(48, 'Amila95', 'amila95@gmail.com', 'I\'m a under graduade of UCSC. I\'m following Computer Scince digree. I like do more and more free lasing.  ', '2018-11-06', 'Padukka', '80/1/A,Andadola Road,Watareka,Padukka', 'Colombo', '0750504648', 'img/blog/author.png'),
(70, 'amila', 'aaa@gmail.com', 'aaaa', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(71, 'mihisara', 'mihi@gmail.com', 'I\'m did my Al in 2019.Now in did Charated account courese and also i done ms office packed couser', NULL, NULL, NULL, NULL, '0710804896', 'img/blog/author.png'),
(73, 'shaminda', 'shamin@gmail.com', 'dfhe guef gej hvebf gvh ev gvdhwvd gdvh hbjhfdg vdvdvdg jdjndjvg  gvhshs hbjbd jnjn djbdhw hbhbd hbb hbdjn hbjnjnd vdhb gvdhvd gvdvgd', NULL, NULL, NULL, NULL, '0754895864', 'img/blog/author.png'),
(74, 'shaminda', 'shamin@gmail.com', 'dfhe guef gej hvebf gvh ev gvdhwvd gdvh hbjhfdg vdvdvdg jdjndjvg  gvhshs hbjbd jnjn djbdhw hbhbd hbb hbdjn hbjnjnd vdhb gvdhvd gvdvgd', NULL, NULL, NULL, NULL, '0754895864', 'img/blog/author.png'),
(75, 'shaminda', 'shamin@gmail.com', 'dfhe guef gej hvebf gvh ev gvdhwvd gdvh hbjhfdg vdvdvdg jdjndjvg  gvhshs hbjbd jnjn djbdhw hbhbd hbb hbdjn hbjnjnd vdhb gvdhvd gvdvgd', NULL, NULL, NULL, NULL, '0754895864', 'img/blog/author.png'),
(76, 'shaminda', 'shamin@gmail.com', 'dfhe guef gej hvebf gvh ev gvdhwvd gdvh hbjhfdg vdvdvdg jdjndjvg  gvhshs hbjbd jnjn djbdhw hbhbd hbb hbdjn hbjnjnd vdhb gvdhvd gvdvgd', NULL, NULL, NULL, NULL, '0754895864', 'img/blog/author.png'),
(77, 'shaminda', 'shamainda@gmail.com', 'sss chhdv vhfje vdhw gcbd hw vfjf  hdbkw f hvdkwf hvwjfb ghvdvkwf hyvw dwj hdbwjf hybk f gcdwd dhvh', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(78, 'shaminda', 'shamainda@gmail.com', 'sss chhdv vhfje vdhw gcbd hw vfjf  hdbkw f hvdkwf hvwjfb ghvdvkwf hyvw dwj hdbwjf hybk f gcdwd dhvh', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(79, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', 'aaaaaaaaaaaaaa', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(80, 'shaminda', 'aaa@gamil.com', 'a s d', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(81, 'rath', 'rath@gmail.com', 'sf dgvh vhd  vhc ccvh d gvhc cvch', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png'),
(82, 'Hasini', 'hasini@gmail.com', 'adimn log ', NULL, NULL, NULL, NULL, '0750504648', 'img/blog/author.png');

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
('fzKsdETtwdgALeDX_4AUIwdiybFY3qNG', 1544802608, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"user_id":76}},"errors":[{"location":"body","param":"maintalentid","msg":"main talent selecting field connot be empty.","value":""}],"success":false}');

-- --------------------------------------------------------

--
-- Table structure for table `sub_talent`
--

CREATE TABLE `sub_talent` (
  `s_t_id` int(11) NOT NULL,
  `s_t_name` varchar(50) NOT NULL,
  `s_t_description` varchar(255) NOT NULL,
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
(2, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$Kjw2y.4i1Jqs0wujNUHCqe.Xa6U6c38JUMVnmh5SqPOBlERx0jge2', 1, 1, 7),
(3, 'Amila', 'amilawicramarathna95@gmail.com', '$2b$10$mih.bFTo3bV10J.yCpCVnema7nNWnaRQ/FbIFIue90y1/iyzvRneW', 1, 1, 8),
(4, 'kapila', 'kapi@gmail.com', '$2b$10$LdYwWeb7KEpJ.kA4WSc7fuJZR0VfhTVQ6WfJRbDN3IYFj67/lTe4i', 1, 1, 9),
(5, 'aaaaaaa', 'amilawicramarathna95@gmail.com', '$2b$10$BbNhPpUBgLTrWSCTl7.youpR52hff9lBATfTtRhUH7AYYaC8Ht4fe', 1, 1, 10),
(6, 'bg', 'amilawicramarathna95@gmail.com', '$2b$10$sKbeNbD9Y4q/P8oq.Tui6e7o0HgMsl3EaGNDDDpKaOQ/rKXKEOqZm', 1, 1, 11),
(7, 'aaaaaaa', 'amilawicramarathna95@gmail.com', '$2b$10$.tif8eAUwWrVVfc82.TexeMsChRdEkShps58DVxVsfAIIcuw5vdT.', 1, 1, 12),
(8, 'ass', 'aaa@gamil.com', '$2b$10$kdP7aq0ukweb20kC9tOqwOqYFtY5NnXHWEh0Ek3/GBNV7nq83jrqa', 1, 1, 13),
(9, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$10PscE4cnW59sbZO5GTu6.8HWqTMydPaM28jbtHS/Sn9VQlW.uxs.', 1, 1, 14),
(10, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$MexeHYXDGfxRYyDfXcCuueupofu0d9YZHP5ofg8tX0ljhSCZTCI0a', 1, 1, 15),
(11, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$E4/y7uxoGmREIlEjzOs0UuC3gtSr9M6XOHmeHnuUmfnFVP.fs.52G', 1, 1, 16),
(12, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$/Rke9rvR0fy.tGmrJeoAEuij.X5bqmGcC.HAawVYD49Ngny/jdDhO', 1, 1, 17),
(13, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$c0PjS/Hltn6DoGala0glgej847PixMido73A.0P.WmQfVWm/DJn0K', 1, 1, 18),
(14, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$L.z29nd/iXrdzQQ0d0e2Celcu1On2elc4LoeGmje6tNRLmARz1SkC', 1, 1, 19),
(15, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$3XtZ4oyZF4u/XMdrgwzmie/PoL3yudFricb4cRNkpw5bT9dHbI0s2', 1, 1, 20),
(16, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$PFyNgmizUV82WMZgiGhGu.ITEzMvzkICqIZpCTc4tcxygGFKVbm2O', 1, 1, 21),
(17, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$FTXv2yVpjlLsUItubi02EucZ6X5E1TXAfcxqM50vPS8Xg1AlXxPHS', 1, 1, 22),
(18, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$aDWa8VgSf3/R23/I1TZaPOUbO94xFInavhK9IolixFB4qIbVnHzWK', 1, 1, 23),
(19, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$/gq84VOn21Gd1tC5Lk4SB.tE5YQL0KguVqEziixgzxf6mCJQVI9IG', 1, 1, 24),
(20, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$rwR6hA8B.OYHhPV0fg85K.C5yOFXF4M6KHjnubNnfgfeyWSudLEKi', 1, 1, 25),
(21, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$yWmvil9esMwJV790M5NuWescju2u8YgWwVVutkDcdueru3BV73Swi', 1, 1, 26),
(22, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$1LuqfQ8mBtngKnmScnIhbOREdG0ts1fBL7qCxP01U/n/.J1r6uLUC', 1, 1, 27),
(23, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$dDCQEBmxsymqtZNZa7LCA.lTSJlcE5Uz9m8e642LKtpFLOf/6J/9O', 1, 1, 28),
(24, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$TactC01Boj4.Shgtfnqm3OUKBN8aZmC9YL42reqjnpC.056elkWDe', 1, 1, 29),
(25, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$D2GQtcrvBtu6XX.sfA1.z.EKra80GceMc/adhlBotg69B9gWNUIwm', 1, 1, 30),
(26, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$AzR8tgRoQJOyOpWHYCV4r.9vXymbbJgZ0JPlm/sk68sgCu255.NMq', 1, 1, 31),
(27, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$ENJ0xoURpbJijS1T.Tk7ZuU29fqSZKLyAmAjJcJbe6s6/ZpUDaS4C', 1, 1, 32),
(28, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$qEeVemsij3fzyNm4yZjL6eSftB..YVdF..Vwi4M4oi9mwkXTivGkG', 1, 1, 33),
(29, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$z8W.vPmAbONZzXWXu9azE.1jilAPI5Du9/t8HcETOLh/6UySYDLUu', 1, 1, 34),
(30, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$wPqskXeqNvxCxPfKGBBzAOnBVoTtoaQIPDxxsizg4T.TBrnj380ka', 1, 1, 35),
(31, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$XkxNVc9W7OEE4yCEALA3UetqzJlV9p0hm.unCJnB83Loexp73aCiC', 1, 1, 36),
(32, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$3Dc/kBzCZRPo7.dAqNV1lu/HiRkTVl2.Dj/MwrTHNtfInktPuWbX2', 1, 1, 37),
(33, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$AE4YJU0rUEB5VIFJZLB3eeo.9YvPAWYIbj1HqKZuB8/k5dggoGod.', 1, 1, 38),
(34, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$4VRmsr/zIbw.tXFy.9v0GOe4PVC68QzIKob96vSqd.aN5PaqFb5BS', 1, 1, 39),
(35, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$AgKt1EWr4YLFhogifIz4WejWyyc9S4xn774lEjVG.m50.Hd2wCEwG', 1, 1, 40),
(36, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$qpAzR81i1/lY71ojnWlLheF1ThGUjJUdg8nIdhAb5UHFi9VCiR/cS', 1, 1, 41),
(37, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$Bytb2f8gJAjAxpq5XogCvOnWWKuI2SQE3JgBulToIZeSROBR2nbMK', 1, 1, 42),
(38, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$U9LmmutwtkUzZE58SKduxOMgSzFLBcHcXdWekC5/Lb87nXG1vpFS6', 1, 1, 43),
(44, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$eLC3tkReh1GCzxBbHSDe8uv40nKLafV4r3ACoTJ4vQvjXEqku.Nte', 1, 1, 49),
(40, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$7k/oZ6.eN8Q3dvRyIJoT3.vuhF/AD2zvP89BW/yULml5UVIB/NJ/W', 1, 1, 45),
(41, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$bXfF5gEQ4ExqYv6WLVu.ZO0uxJOj/eliUUlHP8bJj9JwdVRTeopV6', 1, 1, 46),
(42, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$q9lyXCrpU4v0qIrftiT24.1DUwSyccx.ZWQ/KVRN2iS8CZY7/tlnK', 1, 1, 47),
(43, 'Amila95', 'amila95@gmail.com', '$2b$10$PiSKhMjhGQfIq5/Oju6jQONN5PdJUVBd620C0NrdR6DG3nlx6kudq', 1, 1, 48),
(45, 'public', 'amilawicramarathna95@gmail.com', '$2b$10$Qj9FniXewZR29xMCzOxyi.bWgSu2UGy6qS1nek/n0GjawZ0pjaY2y', 1, 1, 50),
(46, 'public', 'amilawicramarathna95@gmail.com', '$2b$10$QoMFjwJVOq6aE1dIV40ZvOrYOsdTc3Q57dFfr/fBx07Ni3b1Txv2G', 1, 1, 51),
(47, 'Sandali', 'sandali@gmail.com', '$2b$10$dKV4MBtnOsOrAPZE3nhLbOgfVoKuySeaf5l8awpMXs2DW29bsw8te', 1, 1, 52),
(48, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$7dGLDMFvt1MYt8U9wMZ6jO5vHYOGQ5tewUTx7jigCBaWeay0Ucg7.', 1, 1, 53),
(49, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$T6xNTcjYpKTsMiQoaxmQ5uUGDSvBqECM8MbnKMvZhwFbSBfxC.doe', 1, 1, 54),
(50, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$LbJ9rU4cwCNMrX6ucfFL6e66xvF/Gp59GGvpt4VvxmHBuihH.zJhe', 1, 1, 55),
(51, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$4HWD09hkopijVaT4F4Jol.Hog7QF7NEq6fQLGYsNChxRiEkIICbz2', 1, 1, 56),
(52, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$3DuXthcmxb19QM9rVZb00ex16qn8juiG7GUrdYZ6zjPTTS2l1bJgy', 1, 1, 57),
(53, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$Wl7/7rB.wqerzrNl5IrpcOwfK2vQbRFCHux7sqSfZNRaznEHpe/fi', 1, 1, 58),
(54, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$FJ5/G85AJzM2Iw8jeuevJOA6o4Gr4HtinbVvMsNcRlPI3XSF.AJOG', 1, 1, 59),
(55, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$6h9C3cRVIXdaPsHOYbGv5eNkSloFlGpaceX6zAVeITVOziRqvHv2i', 1, 1, 85),
(56, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$jAIXHdjl4QfE5HRx0gXi0uFeraA.mQhJtbDg/hGoGHrkyjYh036cO', 2, 1, 62),
(57, 'Wicky', 'amilawicramarathna95@gmail.com', '$2b$10$YJ/kK5b4T/83hacjfTXdiuXtzS50oyu.FSoejaPzqiKK306SS0MJ6', 1, 1, 63),
(58, 'Wicky', 'amilawicramarathna95@gmail.com', '$2b$10$4SD8S5hhzC5PMQaeK6C/uO0EIrLJOC1w0U/fWWg.1ygOb0Pq84Wg.', 1, 1, 64),
(59, 'Padum', 'pathum@gmail.com', '$2b$10$J1UChyk3fub3G7GkL0zHA.mQUXXGAVqV1KpcYmuu1s.quJH1gbnaa', 1, 1, 65),
(60, 'Dinura', 'dinura@gmai.com', '$2b$10$pBHyvleto347pAHatyb7quydxrTs4sq4V.U7FrkIRGLTe8kbr0kau', 1, 1, 66),
(61, 'hasini_n', 'hasini@gmail.com', '$2b$10$hOpzx5cn90ws/oavrsrwAufDoYnOcMiG5o0wxuzuSTHtcX1hRpxXe', 1, 1, 67),
(62, 'Sandali', 'amilawicramarathna95@gmail.com', '$2b$10$jOSWeNRHMbbMC6pIV0XlzeVVdhy3/vBPl4nU/Gs2tl49jzunFVES2', 1, 1, 68),
(63, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$gGYHVy56TbSD3ZWsMoTuF.F0QP76pCek/5gxTLPeHCBySM6X8H0CO', 1, 1, 69),
(64, 'amila', 'aaa@gmail.com', '$2b$10$2un75o/5/ZgQ1bLl/L94SuboUKMIdwJE2QqAWZ86ZY2K/EmzAdemO', 1, 1, 70),
(65, 'mihisara', 'mihi@gmail.com', '$2b$10$/kgvUqxuhy3MeFBG..tiqeLnXVU3lgoY9joezLbdjqEuY82VLlNk2', 1, 1, 71),
(66, 'shaminda', 'shamin@gmail.com', '$2b$10$5GDdYmx28qIi0GjSvULWoeCrDLmJmNTPQVzo/TwtU04344zdlHDhW', 1, 1, 72),
(67, 'shaminda', 'shamin@gmail.com', '$2b$10$V5jiDXSEY3liC9WwJInv8uiUJgNpCifda6XtiMmBdUib9lrqHxdgW', 1, 1, 73),
(68, 'shaminda', 'shamin@gmail.com', '$2b$10$qwmxDgeFOr.K2PjJV40HFep9UcNnrexqgMpjXQsFJGaYszBRigqkW', 1, 1, 74),
(69, 'shaminda', 'shamin@gmail.com', '$2b$10$gO.MzfF4qdHuBiSF98AKo.l/kvk.B7vZMTMGAOoX4PvWgkGlMvZcG', 1, 1, 75),
(70, 'shaminda', 'shamin@gmail.com', '$2b$10$cYIA7ZsYHEl38SfAzoFT/.eh3MhcfaNhDZWdrb0Q/HN2iLhcz.tQ2', 1, 1, 76),
(71, 'shaminda', 'shamainda@gmail.com', '$2b$10$tcnE2cciaG1k1M7Nsjm6OufnHmvmflQyK3OrAeoIs/HeoJH8zLH0y', 1, 1, 77),
(72, 'shaminda', 'shamainda@gmail.com', '$2b$10$MUP.75W.dH0OJ5at4UqN3u3gFP19MtXoHVhxhoeCfwv0iPpFC4LaW', 1, 1, 78),
(73, 'Amila Wickramarathne', 'amilawicramarathna95@gmail.com', '$2b$10$BPMepOQCCktXKn6LD.j.H.JGjmJPQxAsvO2QsWjjxSShEb8C4opv6', 1, 1, 79),
(74, 'shaminda', 'aaa@gamil.com', '$2b$10$wQEIa09JTtQo.IILYFlqdOHHgdo26TxJUV6caoD0K7JOwioYtQHWy', 1, 1, 80),
(75, 'rath', 'rath@gmail.com', '$2b$10$M3ofNSfNoplgjAqsDdMpUuQGthVOpb29dcu.SaDnvWOTKnkMlQd0S', 1, 1, 81),
(76, 'Hasini', 'hasini@gmail.com', '$2b$10$KX4Qi7xwuzOS9j/spbtLqOQfijZsT0a84gKLYXfF8PjE4wKjPHw.2', 2, 1, 82);

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
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `provider_talent`
--
ALTER TABLE `provider_talent`
  MODIFY `p_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `s_p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `sub_talent`
--
ALTER TABLE `sub_talent`
  MODIFY `s_t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
