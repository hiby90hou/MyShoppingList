-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-27 08:25:20
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshoppinglist_server`
--

-- --------------------------------------------------------

--
-- 表的结构 `ar_internal_metadata`
--

CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `ar_internal_metadata`
--

INSERT INTO `ar_internal_metadata` (`key`, `value`, `created_at`, `updated_at`) VALUES
('environment', 'development', '2017-12-27 06:12:45', '2017-12-27 06:12:45');

-- --------------------------------------------------------

--
-- 表的结构 `schema_migrations`
--

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `schema_migrations`
--

INSERT INTO `schema_migrations` (`version`) VALUES
('20171227000101');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `todos` varchar(1024) DEFAULT NULL,
  `is_all_done` tinyint(1) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `todos`, `is_all_done`, `user_name`, `password`, `created_at`, `updated_at`) VALUES
(1, '[{is_done:false,title:\'Teriyaki Chicken donburi\',expire:null},{is_done:false,title:\'Chicken milanese\',expire:null},{is_done:false,title:\'Scotch eggs\',expire:null}]', 0, 'Monica Geller', '12345', '2017-12-27 06:41:24', '2017-12-27 06:41:24'),
(2, '[{is_done:false,title:\'Linguine with clams\',expire:null},{is_done:false,title:\'Chicken milanese\',expire:null},{is_done:false,title:\'Pasta with Tomato and Basil\',expire:null}]', 0, 'Ross Geller', '12345', '2017-12-27 06:41:24', '2017-12-27 06:41:24'),
(3, '[{is_done:false,title:\'Vegetable Soup\',expire:null},{is_done:false,title:\'Pasta Carbonara\',expire:null},{is_done:false,title:\'Chilli con carne\',expire:null}]', 0, 'Joey Tribbiani', '12345', '2017-12-27 06:41:24', '2017-12-27 06:41:24'),
(4, '[{\'is_done\':\'false\',title:\'Chicken wings4\',expire:null}]', 0, 'Richard Burke', '12345', '2017-12-27 06:41:24', '2017-12-27 07:08:34'),
(5, '[{is_done:false,title:\'Tuna sashimi\',expire:null},{is_done:false,title:\'Fettuccine Alfredo\',expire:null},{is_done:false,title:\'Pork sausage roll\',expire:null}]', 0, 'Phoebe Buffay', '12345', '2017-12-27 06:41:24', '2017-12-27 06:41:24'),
(6, '[{is_done:false,title:\'Fish and chips\',expire:null},{is_done:false,title:\'Ricotta stuffed Ravioli\',expire:null},{is_done:false,title:\'Ricotta stuffed Ravioli\',expire:null}]', 0, 'Carol Willick', '12345', '2017-12-27 06:44:34', '2017-12-27 06:44:34'),
(7, '[{is_done:false,title:\'Chicken Fajitas\',expire:null},{is_done:false,title:\'Ricotta stuffed Ravioli\',expire:null},{is_done:false,title:\'Chicken milanese\',expire:null}]', 0, 'Chandler Bing', '12345', '2017-12-27 06:44:34', '2017-12-27 06:44:34'),
(8, '[{is_done:false,title:\'Teriyaki Chicken donburi\',expire:null},{is_done:false,title:\'Meatballs with sauce\',expire:null},{is_done:false,title:\'Scotch eggs\',expire:null}]', 0, 'Miss Chanandler Bong', '12345', '2017-12-27 06:44:34', '2017-12-27 06:44:34'),
(9, '[{is_done:false,title:\'Tiramisù\',expire:null},{is_done:false,title:\'Bruschette with Tomato\',expire:null},{is_done:false,title:\'Pappardelle alla Bolognese\',expire:null}]', 0, 'Emily Waltham', '12345', '2017-12-27 06:44:34', '2017-12-27 06:44:34'),
(10, '[{is_done:false,title:\'Scotch eggs\',expire:null},{is_done:false,title:\'Katsu Curry\',expire:null},{is_done:false,title:\'Tuna sashimi\',expire:null}]', 0, 'Janice Goralnik', '12345', '2017-12-27 06:44:34', '2017-12-27 06:44:34'),
(11, '[{is_done:false,title:\'Chicken milanese\',expire:null},{is_done:false,title:\'Chicken Fajitas\',expire:null},{is_done:false,title:\'Chicken milanese\',expire:null}]', 1, 'Emily Waltham', '12345', '2017-12-27 06:45:25', '2017-12-27 06:45:25'),
(12, '[{is_done:false,title:\'Tiramisù\',expire:null},{is_done:false,title:\'Katsu Curry\',expire:null},{is_done:false,title:\'Teriyaki Chicken donburi\',expire:null}]', 1, 'Ross Geller', '12345', '2017-12-27 06:45:25', '2017-12-27 06:45:25'),
(13, '[{is_done:false,title:\'Chicken milanese\',expire:null},{is_done:false,title:\'Meatballs with sauce\',expire:null},{is_done:false,title:\'Ricotta stuffed Ravioli\',expire:null}]', 1, 'Janice Goralnik', '12345', '2017-12-27 06:45:25', '2017-12-27 06:45:25'),
(14, '[{is_done:false,title:\'Califlower penne\',expire:null},{is_done:false,title:\'Cheeseburger\',expire:null},{is_done:false,title:\'Pork sausage roll\',expire:null}]', 1, 'Chandler Bing', '12345', '2017-12-27 06:45:25', '2017-12-27 06:45:25'),
(15, '[{is_done:false,title:\'Caprese Salad\',expire:null},{is_done:false,title:\'Katsu Curry\',expire:null},{is_done:false,title:\'Tiramisù\',expire:null}]', 1, 'Richard Burke', '12345', '2017-12-27 06:45:25', '2017-12-27 06:45:25'),
(16, '[{is_done:false,title:\'Lasagne\',expire:null},{is_done:false,title:\'Pork sausage roll\',expire:null},{is_done:false,title:\'Cheeseburger\',expire:null}]', 1, 'Chandler Bing', '12345', '2017-12-27 06:45:53', '2017-12-27 06:45:53'),
(17, '[{is_done:false,title:\'Linguine with clams\',expire:null},{is_done:false,title:\'Chilli con carne\',expire:null},{is_done:false,title:\'Chilli con carne\',expire:null}]', 1, 'Monica Geller', '12345', '2017-12-27 06:45:53', '2017-12-27 06:45:53'),
(18, '[{is_done:false,title:\'Chilli con carne\',expire:null},{is_done:false,title:\'Chicken Fajitas\',expire:null},{is_done:false,title:\'Linguine with clams\',expire:null}]', 1, 'Emily Waltham', '12345', '2017-12-27 06:45:53', '2017-12-27 06:45:53'),
(19, '[{is_done:false,title:\'Linguine with clams\',expire:null},{is_done:false,title:\'Pizza\',expire:null},{is_done:false,title:\'Pork belly buns\',expire:null}]', 1, 'Janice Goralnik', '12345', '2017-12-27 06:45:53', '2017-12-27 06:45:53'),
(20, '[{is_done:false,title:\'Chilli con carne\',expire:null},{is_done:false,title:\'French fries with sausages\',expire:null},{is_done:false,title:\'Caprese Salad\',expire:null}]', 1, 'Janice Goralnik', '12345', '2017-12-27 06:45:53', '2017-12-27 06:45:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ar_internal_metadata`
--
ALTER TABLE `ar_internal_metadata`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `schema_migrations`
--
ALTER TABLE `schema_migrations`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
