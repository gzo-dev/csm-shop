
-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 19, 2023 at 06:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `discrict` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `states` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `shipping` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `custId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `fullname`, `phone`, `orderId`, `discrict`, `city`, `states`, `area`, `shipping`, `createdAt`, `updatedAt`, `custId`) VALUES
(1, 'Pham Giang', '0388015984', 1, NULL, 'Ha noi', 'Ha noi', NULL, 'Ha noi', '2023-06-24 15:16:19', '2023-06-24 15:16:19', 16),
(2, 'Pham Giang', '0388015984', 2, NULL, '1', 'Ha noi', NULL, 'aaaaaaaaa', '2023-07-03 19:41:31', '2023-07-03 19:41:31', 16),
(3, '', '', 3, '', '', '', NULL, '', '2023-07-04 09:30:57', '2023-07-04 09:30:57', 16),
(4, 'Pham Giang', '0388015984', 4, NULL, '1', 'Ha noi', NULL, '', '2023-07-04 09:35:27', '2023-07-04 09:35:27', 16),
(5, 'Pham Giang', '0388015984', 5, NULL, '1', 'Ha noi', NULL, 'aaaaaaa', '2023-07-04 09:49:52', '2023-07-04 09:49:52', 16),
(6, '', '', 6, '', '', '', NULL, '', '2023-07-04 10:00:33', '2023-07-04 10:00:33', 16),
(7, '', '', 7, '', '', '', NULL, '', '2023-07-04 10:02:41', '2023-07-04 10:02:41', 16),
(8, '', '', 8, '', '', '', NULL, '', '2023-07-04 10:19:13', '2023-07-04 10:19:13', 16),
(9, '', '', 9, '', '', '', NULL, '', '2023-07-04 10:21:55', '2023-07-04 10:21:55', 16),
(10, '', '', 10, '', '', '', NULL, '', '2023-07-04 10:27:12', '2023-07-04 10:27:12', 16),
(11, '', '', 11, '', '', '', NULL, '', '2023-07-04 10:29:02', '2023-07-04 10:29:02', 16),
(12, 'Pham Giang', '0388015984', 12, NULL, '34', 'Ha noi', NULL, 'qqqqwsaassasasaw', '2023-07-04 10:29:48', '2023-07-04 10:29:48', 16),
(13, 'Pham Giang', '0388015984', 13, NULL, '10', 'Ha noi', NULL, 'aaaaa', '2023-07-04 10:32:21', '2023-07-04 10:32:21', 16),
(14, 'Pham Giang', '0388015984', 14, NULL, '6', 'Ha noi', NULL, 'aaaaa', '2023-07-04 10:35:32', '2023-07-04 10:35:32', 16),
(15, '', '', 15, '', '', '', NULL, '', '2023-07-12 10:21:11', '2023-07-12 10:21:11', 16),
(16, 'Pham Giang', '0388015984', 16, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-12 10:24:19', '2023-07-12 10:24:19', 16),
(17, '', '', 17, '', '', '', NULL, '', '2023-07-12 10:24:34', '2023-07-12 10:24:34', 16),
(18, '', '', 18, '', '', '', NULL, '', '2023-07-12 10:24:45', '2023-07-12 10:24:45', 16),
(19, 'Pham Giang', '0388015984', 19, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-12 10:25:43', '2023-07-12 10:25:43', 16),
(20, 'Pham Giang', '0388015984', 20, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-12 11:00:45', '2023-07-12 11:00:45', 16),
(21, 'Pham Giang', '0388015984', 21, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-12 12:11:10', '2023-07-12 12:11:10', 16),
(22, 'Pham Giang', '0388015984', 22, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-16 10:44:35', '2023-07-16 10:44:35', 16),
(23, 'Pham Giang', '0388015984', 23, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-19 10:24:55', '2023-07-19 10:24:55', 16),
(24, 'Pham Giang', '0388015984', 24, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-19 12:29:13', '2023-07-19 12:29:13', 16),
(25, '', '', 25, '', '', '', NULL, '', '2023-07-19 12:33:14', '2023-07-19 12:33:14', 16),
(26, 'Pham Giang', '0388015984', 26, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-19 12:35:43', '2023-07-19 12:35:43', 16),
(27, '', '', 27, '', '', '', NULL, '', '2023-07-19 12:37:21', '2023-07-19 12:37:21', 16),
(28, '', '', 28, '', '', '', NULL, '', '2023-07-19 12:38:33', '2023-07-19 12:38:33', 16),
(29, '', '', 29, '', '', '', NULL, '', '2023-07-19 12:43:55', '2023-07-19 12:43:55', 16),
(30, '', '', 30, '', '', '', NULL, '', '2023-07-19 12:45:24', '2023-07-19 12:45:24', 16),
(31, 'Pham Giang', '0388015984', 31, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-19 12:47:05', '2023-07-19 12:47:05', 16),
(32, '', '', 32, '', '', '', NULL, '', '2023-07-19 12:47:52', '2023-07-19 12:47:52', 16),
(33, 'Pham Giang', '0388015984', 33, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-31 19:51:35', '2023-07-31 19:51:35', 16),
(34, 'Pham Giang', '0388015984', 34, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-07-31 19:54:32', '2023-07-31 19:54:32', 16),
(35, 'Pham Giang', '0388015984', 35, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 03:45:24', '2023-08-01 03:45:24', 16),
(36, 'Pham Giang', '0388015984', 36, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 03:47:12', '2023-08-01 03:47:12', 16),
(37, '', '', 37, '', '', '', NULL, '', '2023-08-01 03:51:49', '2023-08-01 03:51:49', 16),
(38, '', '', 38, '', '', '', NULL, '', '2023-08-01 03:55:14', '2023-08-01 03:55:14', 16),
(39, 'Pham Giang', '0388015984', 39, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:00:12', '2023-08-01 04:00:12', 16),
(40, 'Pham Giang', '0388015984', 40, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:00:17', '2023-08-01 04:00:17', 16),
(41, 'Pham Giang', '0388015984', 41, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:00:22', '2023-08-01 04:00:22', 16),
(42, 'Pham Giang', '0388015984', 42, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:00:27', '2023-08-01 04:00:27', 16),
(43, 'Pham Giang', '0388015984', 43, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:00:32', '2023-08-01 04:00:32', 16),
(44, 'Pham Giang', '0388015984', 44, NULL, '1', 'datistpham@gmail.com', NULL, 'Ha noi', '2023-08-01 04:02:01', '2023-08-01 04:02:01', 16),
(45, 'Quan Nguyen', '0398128319', 45, NULL, '48', 'quannguyen321@gmail.com', NULL, 'nhaf 51', '2023-08-08 03:34:04', '2023-08-08 03:34:04', 22);

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `zipcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `name`, `locationId`, `status`, `createdAt`, `updatedAt`, `zipcode`) VALUES
(1, 'bcd', 1, 'active', '2023-05-30 02:37:09', '2023-05-30 02:37:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `addressId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `discount` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `productId`, `name`, `orderId`, `addressId`, `price`, `total`, `qty`, `photo`, `discount`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Quan 123', 1, 1, 100, 300, 3, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-06-24 15:16:19', '2023-06-24 15:16:19'),
(2, 2, 'Quan 123', 2, 2, 100, 400, 4, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-03 19:41:31', '2023-07-03 19:41:31'),
(3, 1, 'admin', 2, 2, 100, 7000, 7, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-03 19:41:31', '2023-07-03 19:41:31'),
(4, 14, 'quan bo 123', 3, 3, 100, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 09:30:57', '2023-07-04 09:30:57'),
(5, 1, 'admin', 3, 3, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-04 09:30:57', '2023-07-04 09:30:57'),
(6, 4, 'svvvvv', 3, 3, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-04 09:30:57', '2023-07-04 09:30:57'),
(7, 14, 'quan bo 123', 4, 4, 100, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 09:35:27', '2023-07-04 09:35:27'),
(8, 1, 'admin', 4, 4, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-04 09:35:27', '2023-07-04 09:35:27'),
(9, 4, 'svvvvv', 4, 4, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-04 09:35:27', '2023-07-04 09:35:27'),
(10, 14, 'quan bo 123', 5, 5, 100, 0, 6, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 09:49:52', '2023-07-04 09:49:52'),
(11, 14, 'quan bo 123', 6, 6, 100, 0, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 10:00:33', '2023-07-04 10:00:33'),
(12, 1, 'admin', 7, 7, 100, 11000, 11, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-04 10:02:41', '2023-07-04 10:02:41'),
(13, 1, 'admin', 8, 8, 100, 11000, 11, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-04 10:19:13', '2023-07-04 10:19:13'),
(14, 14, 'quan bo 123', 9, 9, 100, 0, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 10:21:55', '2023-07-04 10:21:55'),
(15, 14, 'quan bo 123', 10, 10, 100, 0, 6, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-04 10:27:12', '2023-07-04 10:27:12'),
(16, 2, 'Quan 123', 10, 10, 100, 700, 7, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-04 10:27:12', '2023-07-04 10:27:12'),
(17, 2, 'Quan 123', 11, 11, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-04 10:29:02', '2023-07-04 10:29:02'),
(18, 2, 'Quan 123', 12, 12, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-04 10:29:48', '2023-07-04 10:29:48'),
(19, 2, 'Quan 123', 13, 13, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-04 10:32:21', '2023-07-04 10:32:21'),
(20, 2, 'Quan 123', 14, 14, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-04 10:35:33', '2023-07-04 10:35:33'),
(21, 14, 'quan bo 123', 15, 15, 100, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 0, '2023-07-12 10:21:11', '2023-07-12 10:21:11'),
(22, 14, 'quan bo 123', 19, 19, 100, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 12, '2023-07-12 10:25:43', '2023-07-12 10:25:43'),
(23, 1, 'admin', 20, 20, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-12 11:00:45', '2023-07-12 11:00:45'),
(24, 1, 'admin', 21, 21, 100, 11000, 11, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-12 12:11:10', '2023-07-12 12:11:10'),
(25, 4, 'svvvvv', 22, 22, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-16 10:44:35', '2023-07-16 10:44:35'),
(26, 14, 'quan bo 123', 22, 22, 100, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688041993/gjzphnh3jhja9rqgfttx.png', 12, '2023-07-16 10:44:35', '2023-07-16 10:44:35'),
(27, 2, 'Quan 123', 22, 22, 100, 500, 5, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-16 10:44:35', '2023-07-16 10:44:35'),
(28, 1, 'admin', 23, 23, 100, 13000, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-19 10:24:55', '2023-07-19 10:24:55'),
(29, 4, 'svvvvv', 24, 24, 100, 16000, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-19 12:29:13', '2023-07-19 12:29:13'),
(30, 16, 'quan bo 1234', 24, 24, 50000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847163/m1tbnienemftnmqx0h3r.png', 0, '2023-07-19 12:29:13', '2023-07-19 12:29:13'),
(31, 4, 'svvvvv', 25, 25, 100, 16000, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-19 12:33:14', '2023-07-19 12:33:14'),
(32, 16, 'quan bo 1234', 25, 25, 50000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847163/m1tbnienemftnmqx0h3r.png', 0, '2023-07-19 12:33:14', '2023-07-19 12:33:14'),
(33, 4, 'svvvvv', 26, 26, 100, 16000, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-19 12:35:43', '2023-07-19 12:35:43'),
(34, 16, 'quan bo 1234', 26, 26, 50000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847163/m1tbnienemftnmqx0h3r.png', 0, '2023-07-19 12:35:43', '2023-07-19 12:35:43'),
(35, 4, 'svvvvv', 27, 27, 100, 16000, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1687688335/e1etjvqshsalloz9xq6p.png', 0, '2023-07-19 12:37:21', '2023-07-19 12:37:21'),
(36, 16, 'quan bo 1234', 27, 27, 50000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847163/m1tbnienemftnmqx0h3r.png', 0, '2023-07-19 12:37:21', '2023-07-19 12:37:21'),
(37, 15, 'quan short 123', 28, 28, 1000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847003/l7dpksjvil878l5i7gwt.png', 0, '2023-07-19 12:38:33', '2023-07-19 12:38:33'),
(38, 15, 'quan short 123', 29, 29, 1000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1688847003/l7dpksjvil878l5i7gwt.png', 0, '2023-07-19 12:43:55', '2023-07-19 12:43:55'),
(39, 1, 'admin', 30, 30, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-19 12:45:24', '2023-07-19 12:45:24'),
(40, 2, 'Quan 123', 30, 30, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-19 12:45:24', '2023-07-19 12:45:24'),
(41, 1, 'admin', 31, 31, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1685296447/cvnua1khss6ilfvkrftn.jpg', 0, '2023-07-19 12:47:05', '2023-07-19 12:47:05'),
(42, 11, 'assasadsdasasaaaaaaa', 32, 32, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1687690468/c3y0gmvcozbzed6blgxw.png', 0, '2023-07-19 12:47:52', '2023-07-19 12:47:52'),
(43, 7, 'aaaaaavvvv', 32, 32, 100, 1000, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1687689895/kcqkixpobu8lj6p6kb5g.png', 0, '2023-07-19 12:47:52', '2023-07-19 12:47:52'),
(44, 2, 'Quan 123', 33, 33, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-31 19:51:35', '2023-07-31 19:51:35'),
(45, 2, 'Quan 123', 34, 34, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-07-31 19:54:32', '2023-07-31 19:54:32'),
(46, 2, 'Quan 123', 35, 35, 100, 1300, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 03:45:24', '2023-08-01 03:45:24'),
(47, 2, 'Quan 123', 36, 36, 100, 1300, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 03:47:12', '2023-08-01 03:47:12'),
(48, 2, 'Quan 123', 37, 37, 100, 1300, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 03:51:49', '2023-08-01 03:51:49'),
(49, 2, 'Quan 123', 38, 38, 100, 1300, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 03:55:14', '2023-08-01 03:55:14'),
(50, 2, 'Quan 123', 39, 39, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:00:12', '2023-08-01 04:00:12'),
(51, 2, 'Quan 123', 40, 40, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:00:17', '2023-08-01 04:00:17'),
(52, 2, 'Quan 123', 41, 41, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:00:22', '2023-08-01 04:00:22'),
(53, 2, 'Quan 123', 42, 42, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:00:27', '2023-08-01 04:00:27'),
(54, 2, 'Quan 123', 43, 43, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:00:32', '2023-08-01 04:00:32'),
(55, 2, 'Quan 123', 44, 44, 100, 1200, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-01 04:02:01', '2023-08-01 04:02:01'),
(56, 2, 'Quan 123', 45, 45, 100, 100, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1686850387/pxjlovokgvgqlknfywli.jpg', 0, '2023-08-08 03:34:04', '2023-08-08 03:34:04'),
(57, 30, 'Quần tây 1', 45, 45, 10000000, 0, 1, 'https://res.cloudinary.com/cockbook/image/upload/v1691384875/r3uvrd7vvbrluwotbyco.jpg', 10, '2023-08-08 03:34:04', '2023-08-08 03:34:04');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `slug`) VALUES
(6, 'Áo', '2023-08-07 04:42:56', '2023-08-07 04:42:56', 'áo'),
(7, 'Quần', '2023-08-07 04:43:53', '2023-08-07 04:43:53', 'quần'),
(8, 'Mũ', '2023-08-07 04:45:25', '2023-08-07 04:45:25', 'mũ'),
(9, 'Underpant', '2023-08-18 09:34:43', '2023-08-18 09:34:43', 'underpant');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_send` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `reply_text` varchar(1000) NOT NULL,
  `user_reply` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `date_send`, `content`, `email`, `phone`, `status`, `reply_text`, `user_reply`, `createdAt`, `updatedAt`) VALUES
(1, 'Tuan ', '', 'jaklsjaksasa', 'tuan@gmail.com', '', '', '', 0, '2023-06-29 10:14:45', '2023-06-29 10:14:45'),
(2, 'Tuan ', '', 'jaklsjaksasa', 'tuan@gmail.com', '', 'replied', 'ok', 1, '2023-06-29 10:16:15', '2023-08-08 03:42:08'),
(3, 'Tuan ', '', 'jaklsjaksasa', 'tuan@gmail.com', '', 'replied', 'ok', 1, '2023-06-29 10:16:28', '2023-08-08 03:43:30'),
(4, 'Tuan 123', '', 'xin chào tôi muốn ', 'datistpham@gmail.com', '', 'processed', '', 0, '2023-06-29 10:27:24', '2023-07-02 10:13:00');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstName`, `lastName`, `phone`, `email`, `password`, `userid`, `gender`, `createdAt`, `updatedAt`) VALUES
(17, 'Pham', NULL, NULL, 'datistpham1@gmail.com', '$2a$10$R5.lEtG/N1oNjgTh0N6OaenURYmxE0ihzEIeRXb/xzGQ67MJIB1bq', NULL, NULL, '2023-08-05 11:24:35', '2023-08-05 11:24:35'),
(18, 'Pham', NULL, NULL, 'datistpham4@gmail.com', '$2a$10$JLKHK87kzwbqIkZ4EiuzEeHG45dm3G9dtNq2V5c.isH286NDP0PB.', NULL, NULL, '2023-08-05 11:27:06', '2023-08-05 11:27:06'),
(19, 'Pham', NULL, NULL, 'giang10a1dz@gmail.com', '$2a$10$Ehp0ZYXE/Ek8ItniuFxR/ebQl64WsJaAIBtNq.RZjr1qq2tjQskl6', NULL, NULL, '2023-08-05 11:35:25', '2023-08-05 11:35:25'),
(20, 'Pham', NULL, NULL, 'admin@materialize.com', '$2a$10$4kGDylO631zVyd0rT8qRouYb3ep5OeXwL.JjhE/V6eJwqqk6Tex36', NULL, NULL, '2023-08-05 11:36:08', '2023-08-05 11:36:08'),
(22, 'Tran', 'Nhat Hoang', NULL, 'datistpham@gmail.com', '$2a$10$IvFKwCIqoTka6YADp3VLyeTImVJwl2LFuvgh6UUvlDcAu.wX/8ir6', NULL, NULL, '2023-08-05 12:23:22', '2023-08-18 15:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `zipcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `status`, `createdAt`, `updatedAt`, `zipcode`) VALUES
(1, 'aaaa', 'active', '2023-05-29 04:38:39', '2023-05-29 04:38:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `custId` int(11) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `paymentmethod` varchar(255) DEFAULT NULL,
  `grandtotal` int(11) DEFAULT NULL,
  `status` enum('processing','shipping','delieverd','cancel') DEFAULT 'processing',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deliverydate` datetime DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `voucherId` int(11) NOT NULL,
  `deliveryFee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `custId`, `number`, `paymentmethod`, `grandtotal`, `status`, `createdAt`, `updatedAt`, `deliverydate`, `reason`, `voucherId`, `deliveryFee`) VALUES
(1, 16, '12151025561', 'cash', 300, 'delieverd', '2023-06-24 15:16:19', '2023-07-02 09:26:23', '2023-07-03 00:00:00', '', 0, 0),
(2, 16, '1079801872718', 'cash', 0, 'processing', '2023-07-03 19:41:31', '2023-07-03 19:41:31', NULL, '', 4, 0),
(3, 16, '1043329721931', '', 0, 'processing', '2023-07-04 09:30:57', '2023-07-04 09:30:57', NULL, '', 0, 0),
(4, 16, '24163981097', 'cash', 0, 'processing', '2023-07-04 09:35:27', '2023-07-04 09:35:27', NULL, '', 0, 0),
(5, 16, '1395272228482', 'cash', 528, 'processing', '2023-07-04 09:49:52', '2023-07-04 09:49:52', NULL, '', 0, 0),
(6, 16, '427158997703', '', 1408, 'processing', '2023-07-04 10:00:33', '2023-07-04 10:00:33', NULL, '', 0, 0),
(7, 16, '807410782988', '', 1100, 'processing', '2023-07-04 10:02:41', '2023-07-04 10:02:41', NULL, '', 0, 0),
(8, 16, '614912502375', 'Online payment', 1100, 'processing', '2023-07-04 10:19:13', '2023-07-04 10:19:13', NULL, '', 0, 0),
(9, 16, '375272987704', 'Online payment', 1056, 'processing', '2023-07-04 10:21:55', '2023-07-04 10:21:55', NULL, '', 0, 0),
(10, 16, '183555284317', 'cash', 51228, 'processing', '2023-07-04 10:27:12', '2023-07-04 10:27:12', NULL, '', 0, 0),
(11, 16, '75487745162', 'cash', 100, 'processing', '2023-07-04 10:29:02', '2023-07-04 10:29:02', NULL, '', 0, 0),
(12, 16, '187342222942', 'cash', 50100, 'processing', '2023-07-04 10:29:48', '2023-07-04 10:29:48', NULL, '', 0, 50000),
(13, 16, '93001473519', 'cash', 0, 'processing', '2023-07-04 10:32:21', '2023-07-04 10:32:21', NULL, '', 0, 50000),
(14, 16, '272443039337', 'cash', 0, 'processing', '2023-07-04 10:35:32', '2023-07-04 10:35:32', NULL, '', 5, 50000),
(15, 16, '28147305440', 'cash', 88, 'processing', '2023-07-12 10:21:11', '2023-07-12 10:21:11', NULL, '', 0, 0),
(16, 16, '377524972811', 'cash', 88, 'processing', '2023-07-12 10:24:19', '2023-07-12 10:24:19', NULL, '', 0, 0),
(17, 16, '429743201513', 'cash', 88, 'processing', '2023-07-12 10:24:34', '2023-07-12 10:24:34', NULL, '', 0, 0),
(18, 16, '740184807258', 'cash', 88, 'processing', '2023-07-12 10:24:45', '2023-07-12 10:24:45', NULL, '', 0, 0),
(19, 16, '199799730100', 'cash', 88, 'cancel', '2023-07-12 10:25:43', '2023-07-12 10:46:47', NULL, 'aaaa', 0, 0),
(20, 16, '356912960560', 'cash', 100, 'processing', '2023-07-12 11:00:45', '2023-07-12 11:00:45', NULL, '', 0, 0),
(21, 16, '901335159457', 'cash', 1100, 'processing', '2023-07-12 12:11:10', '2023-07-12 12:11:10', NULL, '', 0, 0),
(22, 16, '322410141200', 'cash', 0, 'processing', '2023-07-16 10:44:35', '2023-07-16 10:44:35', NULL, '', 56, 0),
(23, 16, '77604995273', 'cash', 1300, 'processing', '2023-07-19 10:24:55', '2023-07-19 10:24:55', NULL, '', 0, 0),
(24, 16, '109980129509', 'Pay online', 51600, 'processing', '2023-07-19 12:29:12', '2023-07-19 12:29:12', NULL, '', 0, 0),
(25, 16, '187942875320', 'Pay online', 51600, 'processing', '2023-07-19 12:33:14', '2023-07-19 12:33:14', NULL, '', 0, 0),
(26, 16, '293913521308', 'Pay online', 51600, 'processing', '2023-07-19 12:35:43', '2023-07-19 12:35:43', NULL, '', 0, 0),
(27, 16, '841172765608', 'cash', 51600, 'processing', '2023-07-19 12:37:21', '2023-07-19 12:37:21', NULL, '', 0, 0),
(28, 16, '335272612529', 'cash', 1000, 'processing', '2023-07-19 12:38:33', '2023-07-19 12:38:33', NULL, '', 0, 0),
(29, 16, '201585637375', 'cash', 1000, 'processing', '2023-07-19 12:43:55', '2023-07-19 12:43:55', NULL, '', 0, 0),
(30, 16, '191831966392', 'cash', 200, 'processing', '2023-07-19 12:45:24', '2023-07-19 12:45:24', NULL, '', 0, 0),
(31, 16, '184888048632', 'cash', 100, 'processing', '2023-07-19 12:47:05', '2023-07-19 12:47:05', NULL, '', 0, 0),
(32, 16, '1093184048882', 'cash', 200, 'processing', '2023-07-19 12:47:52', '2023-07-19 12:47:52', NULL, '', 0, 0),
(33, 16, '326807002284', 'cash', 100, 'processing', '2023-07-31 19:51:35', '2023-07-31 19:51:35', NULL, '', 0, 0),
(34, 16, '496026487674', 'cash', 100, 'shipping', '2023-07-31 19:54:32', '2023-07-31 20:09:30', '2023-08-02 00:00:00', '', 0, 0),
(35, 16, '382773226723', 'Pay online', 1300, 'processing', '2023-08-01 03:45:24', '2023-08-01 03:45:24', NULL, '', 0, 0),
(36, 16, '1122645837850', 'Pay online', 1300, 'processing', '2023-08-01 03:47:12', '2023-08-01 03:47:12', NULL, '', 0, 0),
(37, 16, '66400954209', 'cash', 1300, 'processing', '2023-08-01 03:51:49', '2023-08-01 03:51:49', NULL, '', 0, 0),
(38, 16, '606720891624', 'Pay online', 1300, 'processing', '2023-08-01 03:55:14', '2023-08-01 03:55:14', NULL, '', 0, 0),
(39, 16, '608712380948', 'Pay online', 1200, 'processing', '2023-08-01 04:00:12', '2023-08-01 04:00:12', NULL, '', 0, 0),
(40, 16, '226041949202', 'Pay online', 1200, 'processing', '2023-08-01 04:00:17', '2023-08-01 04:00:17', NULL, '', 0, 0),
(41, 16, '1130849157709', 'Pay online', 1200, 'processing', '2023-08-01 04:00:22', '2023-08-01 04:00:22', NULL, '', 0, 0),
(42, 16, '77000645444', 'Pay online', 1200, 'processing', '2023-08-01 04:00:27', '2023-08-01 04:00:27', NULL, '', 0, 0),
(43, 16, '306064337670', 'Pay online', 1200, 'processing', '2023-08-01 04:00:32', '2023-08-01 04:00:32', NULL, '', 0, 0),
(44, 16, '432411140886', 'Pay online', 1200, 'processing', '2023-08-01 04:02:01', '2023-08-01 04:02:01', NULL, '', 0, 0),
(45, 22, '986202238271', 'cash', 9050100, 'delieverd', '2023-08-08 03:34:04', '2023-08-08 03:34:55', '2023-08-09 00:00:00', '', 0, 50000);

-- --------------------------------------------------------

--
-- Table structure for table `productphotos`
--

CREATE TABLE `productphotos` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productphotos`
--

INSERT INTO `productphotos` (`id`, `productId`, `imgUrl`, `createdAt`, `updatedAt`) VALUES
(1, 2, NULL, '2023-06-21 12:28:29', '2023-06-21 12:28:29'),
(2, 2, NULL, '2023-06-21 12:28:29', '2023-06-21 12:28:29'),
(3, 2, NULL, '2023-06-21 12:28:29', '2023-06-21 12:28:29'),
(4, 2, NULL, '2023-06-21 12:29:25', '2023-06-21 12:29:25'),
(5, 2, NULL, '2023-06-21 12:29:25', '2023-06-21 12:29:25'),
(6, 2, NULL, '2023-06-21 12:29:25', '2023-06-21 12:29:25'),
(7, 2, NULL, '2023-06-21 12:30:29', '2023-06-21 12:30:29'),
(8, 2, NULL, '2023-06-21 12:30:29', '2023-06-21 12:30:29'),
(9, 2, NULL, '2023-06-21 12:30:29', '2023-06-21 12:30:29'),
(10, 2, NULL, '2023-06-21 12:30:29', '2023-06-21 12:30:29'),
(11, 2, NULL, '2023-06-21 12:30:29', '2023-06-21 12:30:29'),
(12, 2, NULL, '2023-06-21 12:33:03', '2023-06-21 12:33:03'),
(13, 2, NULL, '2023-06-21 12:33:03', '2023-06-21 12:33:03'),
(14, 2, NULL, '2023-06-21 12:33:03', '2023-06-21 12:33:03'),
(15, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687350824/fkqxsty6oq60bojjvgqn.png', '2023-06-21 12:33:45', '2023-06-21 12:33:45'),
(16, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687351312/oehqpkery5daf8szhhkk.png', '2023-06-21 12:41:54', '2023-06-21 12:41:54'),
(17, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687351312/k98f1mqjckzufln0e88e.png', '2023-06-21 12:41:54', '2023-06-21 12:41:54'),
(18, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687351312/cgh0fnenyjkqppdhlxqd.png', '2023-06-21 12:41:54', '2023-06-21 12:41:54'),
(19, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618575/eo4nbwchpfzeacwuivt7.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(20, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618575/oghdxsy4vivozsenfetp.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(21, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618575/oaui7udnhmks1ggkvuvj.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(22, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618576/zzekebnzxygpurwvfme7.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(23, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618575/u1psrnr7rsnu38oq5swe.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(24, 2, 'https://res.cloudinary.com/cockbook/image/upload/v1687618575/sbdrnzkdntrv6rmxyxxr.png', '2023-06-24 14:56:16', '2023-06-24 14:56:16'),
(25, 8, 'https://res.cloudinary.com/cockbook/image/upload/v1687690043/z3xmhzqviprlbkw8juhz.png', '2023-06-25 10:47:24', '2023-06-25 10:47:24'),
(26, 8, 'https://res.cloudinary.com/cockbook/image/upload/v1687690043/ukmrqrk27pehpbkqlol5.png', '2023-06-25 10:47:24', '2023-06-25 10:47:24'),
(27, 8, 'https://res.cloudinary.com/cockbook/image/upload/v1687690042/jaevkpydjdatxmmpcs6z.png', '2023-06-25 10:47:24', '2023-06-25 10:47:24'),
(28, 8, 'https://res.cloudinary.com/cockbook/image/upload/v1687690043/mytfdpxoeu2pmv2hjled.png', '2023-06-25 10:47:24', '2023-06-25 10:47:24'),
(29, 8, 'https://res.cloudinary.com/cockbook/image/upload/v1687690042/zdoxnhptivqro3tlpm5w.png', '2023-06-25 10:47:24', '2023-06-25 10:47:24'),
(30, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1687690638/rplcyhqwjpehckyzrz4l.png', '2023-06-25 10:57:27', '2023-06-25 10:57:27'),
(31, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1687690638/wfu8dqsrnl7pvumbbadl.png', '2023-06-25 10:57:27', '2023-06-25 10:57:27'),
(32, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1687690638/anfiqoupfmsokyklgrfq.png', '2023-06-25 10:57:27', '2023-06-25 10:57:27'),
(33, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1687690638/cqhxx7zorchpoqj3dd2c.png', '2023-06-25 10:57:27', '2023-06-25 10:57:27'),
(34, 12, 'https://res.cloudinary.com/cockbook/image/upload/v1687690638/tytnrlxum4cheskpu5iw.png', '2023-06-25 10:57:27', '2023-06-25 10:57:27'),
(35, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1687700231/pjfc0fswqhmq0eab3atm.png', '2023-06-25 13:37:22', '2023-06-25 13:37:22'),
(36, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1687700231/dmy1dhstldylsja0fpfu.png', '2023-06-25 13:37:22', '2023-06-25 13:37:22'),
(37, 13, 'https://res.cloudinary.com/cockbook/image/upload/v1687700231/hqblbndorqekjpwhsswi.png', '2023-06-25 13:37:22', '2023-06-25 13:37:22'),
(38, 14, 'https://res.cloudinary.com/cockbook/image/upload/v1688041983/jvbjiq7sv0trjk133jyt.png', '2023-06-29 12:33:13', '2023-06-29 12:33:13'),
(39, 14, 'https://res.cloudinary.com/cockbook/image/upload/v1688041983/qy3ygh0vkeajvwptvwee.png', '2023-06-29 12:33:13', '2023-06-29 12:33:13'),
(40, 14, 'https://res.cloudinary.com/cockbook/image/upload/v1688041983/f5favgrtfgmje170mmyl.png', '2023-06-29 12:33:13', '2023-06-29 12:33:13'),
(42, 15, 'https://res.cloudinary.com/cockbook/image/upload/v1688846994/mp8ex0bc9y53trvbmm25.png', '2023-07-08 20:10:04', '2023-07-08 20:10:04'),
(43, 15, 'https://res.cloudinary.com/cockbook/image/upload/v1688846994/lutzljuesfckey54rmqv.png', '2023-07-08 20:10:04', '2023-07-08 20:10:04'),
(44, 15, 'https://res.cloudinary.com/cockbook/image/upload/v1688846994/zvssmeamt0hwpplkdmba.png', '2023-07-08 20:10:04', '2023-07-08 20:10:04'),
(45, 15, 'https://res.cloudinary.com/cockbook/image/upload/v1688846994/dgnqrods0885bafohm9c.png', '2023-07-08 20:10:04', '2023-07-08 20:10:04'),
(46, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1688847154/fl5vw48tdp5dl3nzmwnq.png', '2023-07-08 20:12:43', '2023-07-08 20:12:43'),
(47, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1688847154/xjfuowdv5rgecuo3teit.png', '2023-07-08 20:12:43', '2023-07-08 20:12:43'),
(48, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1688847154/ptvpebaxcy3v5bwj5qxo.png', '2023-07-08 20:12:43', '2023-07-08 20:12:43'),
(49, 16, 'https://res.cloudinary.com/cockbook/image/upload/v1688847154/pnuozlrkdy6s1o4oc5mh.png', '2023-07-08 20:12:43', '2023-07-08 20:12:43'),
(50, 17, 'https://res.cloudinary.com/cockbook/image/upload/v1691093420/zn0aczwi8mooqgdxlili.png', '2023-08-03 20:10:29', '2023-08-03 20:10:29'),
(51, 17, 'https://res.cloudinary.com/cockbook/image/upload/v1691100610/ottn1fxd94bgeglyxozd.png', '2023-08-03 22:10:10', '2023-08-03 22:10:10'),
(52, 18, 'https://res.cloudinary.com/cockbook/image/upload/v1691102524/jhp9dwjukszozyemwe8w.png', '2023-08-03 22:42:12', '2023-08-03 22:42:12'),
(53, 19, 'https://res.cloudinary.com/cockbook/image/upload/v1691102774/dtq36p6kntryfymru488.png', '2023-08-03 22:46:24', '2023-08-03 22:46:24'),
(54, 20, 'https://res.cloudinary.com/cockbook/image/upload/v1691103013/vxmnehhfe5c3mqeoummj.png', '2023-08-03 22:50:25', '2023-08-03 22:50:25'),
(55, 21, 'https://res.cloudinary.com/cockbook/image/upload/v1691103200/ihaz0a6b8h0v0w6gozre.png', '2023-08-03 22:53:29', '2023-08-03 22:53:29'),
(56, 22, 'https://res.cloudinary.com/cockbook/image/upload/v1691103309/tzhzhjd03tlhkcky2tdz.png', '2023-08-03 22:55:19', '2023-08-03 22:55:19'),
(57, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383778/cg3zaj5stxuyodrcezl5.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(58, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383778/g2e0dhjk4652jdd8rvth.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(59, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383779/zfaf9vcj2f7ikotiyte5.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(60, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383781/v0lz7nehubgczoig9fpd.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(61, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383780/tljp8rfkubxhl7huag0l.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(62, 23, 'https://res.cloudinary.com/cockbook/image/upload/v1691383781/sybdg8uo3funnel6p9mx.jpg', '2023-08-07 04:49:51', '2023-08-07 04:49:51'),
(63, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/rytk8112fmtbuum9yqws.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(64, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/ccddywojmcuvyg1o8m2g.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(65, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/h3eybwhprbp5ecpoxrp8.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(66, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/m6eb9r5nom0aa9vbi9gc.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(67, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/cba4jnyamopwd2spe7hj.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(68, 24, 'https://res.cloudinary.com/cockbook/image/upload/v1691384076/osgcznmajdjxmm2yuluu.jpg', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(69, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/hzdzz2mday9oqru27zfx.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(70, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/a54fcxdmaevt8psbohon.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(71, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/g3khibqffo89htbcpurh.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(72, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/zu34qnq1hw2myccoytl5.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(73, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/cfqv3uexljkoqfzl7uhz.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(74, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/m02cugor3sqvftnry6gv.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(75, 25, 'https://res.cloudinary.com/cockbook/image/upload/v1691384173/khmemoilv907pdh0tpes.jpg', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(76, 26, 'https://res.cloudinary.com/cockbook/image/upload/v1691384313/zqi7miqkisglqguvqxcl.jpg', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(77, 26, 'https://res.cloudinary.com/cockbook/image/upload/v1691384313/uulkvbdqyonp9wsdfc0n.jpg', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(78, 26, 'https://res.cloudinary.com/cockbook/image/upload/v1691384313/rqnvkpnwim4oz4fxvvml.jpg', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(79, 26, 'https://res.cloudinary.com/cockbook/image/upload/v1691384313/tst6pggdd4urbgr7xnhm.jpg', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(80, 26, 'https://res.cloudinary.com/cockbook/image/upload/v1691384313/fwehiobnbgci8w56xsrg.jpg', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(81, 27, 'https://res.cloudinary.com/cockbook/image/upload/v1691384413/e2awye7zxqqvkq4gduay.jpg', '2023-08-07 05:00:25', '2023-08-07 05:00:25'),
(82, 27, 'https://res.cloudinary.com/cockbook/image/upload/v1691384413/uyqbrv9ppqfvqwpbxlms.jpg', '2023-08-07 05:00:25', '2023-08-07 05:00:25'),
(83, 27, 'https://res.cloudinary.com/cockbook/image/upload/v1691384413/jqtknevxdejlo9tvzyn3.jpg', '2023-08-07 05:00:25', '2023-08-07 05:00:25'),
(84, 27, 'https://res.cloudinary.com/cockbook/image/upload/v1691384413/kxg0ljihco6jgdcyntkq.jpg', '2023-08-07 05:00:25', '2023-08-07 05:00:25'),
(85, 28, 'https://res.cloudinary.com/cockbook/image/upload/v1691384499/er0e2ocyqkbjnysuegvv.jpg', '2023-08-07 05:02:04', '2023-08-07 05:02:04'),
(86, 28, 'https://res.cloudinary.com/cockbook/image/upload/v1691384499/doduvnkuzv6yncy9fpbg.jpg', '2023-08-07 05:02:04', '2023-08-07 05:02:04'),
(87, 28, 'https://res.cloudinary.com/cockbook/image/upload/v1691384499/tlws2hhpxgnb5ehquz6m.jpg', '2023-08-07 05:02:04', '2023-08-07 05:02:04'),
(88, 28, 'https://res.cloudinary.com/cockbook/image/upload/v1691384499/fxjnco9vvvtzn6jkhlch.jpg', '2023-08-07 05:02:04', '2023-08-07 05:02:04'),
(89, 29, 'https://res.cloudinary.com/cockbook/image/upload/v1691384602/cxobhvjh4qdbgx8k1ply.jpg', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(90, 29, 'https://res.cloudinary.com/cockbook/image/upload/v1691384602/xhykfqdyt5c0gxwyvihc.jpg', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(91, 29, 'https://res.cloudinary.com/cockbook/image/upload/v1691384602/uuaecf1ccv3waqaohbha.jpg', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(92, 29, 'https://res.cloudinary.com/cockbook/image/upload/v1691384602/imgbcyak2atgvjnkaqgp.jpg', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(93, 29, 'https://res.cloudinary.com/cockbook/image/upload/v1691384602/f0nxxiou7xnjxgwshxwv.jpg', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(94, 30, 'https://res.cloudinary.com/cockbook/image/upload/v1691384866/jp6qaghpzzrwa0cwwudk.jpg', '2023-08-07 05:07:55', '2023-08-07 05:07:55'),
(95, 30, 'https://res.cloudinary.com/cockbook/image/upload/v1691384866/k01jqilcertuexa7rjxj.jpg', '2023-08-07 05:07:55', '2023-08-07 05:07:55'),
(96, 30, 'https://res.cloudinary.com/cockbook/image/upload/v1691384866/cztupsibcq74vwkoyybo.jpg', '2023-08-07 05:07:55', '2023-08-07 05:07:55'),
(97, 30, 'https://res.cloudinary.com/cockbook/image/upload/v1691384866/j71vsb0jixwon7sdhigv.jpg', '2023-08-07 05:07:55', '2023-08-07 05:07:55'),
(98, 31, 'https://res.cloudinary.com/cockbook/image/upload/v1691466028/vs31tiy0p6ircu2iex48.jpg', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(99, 31, 'https://res.cloudinary.com/cockbook/image/upload/v1691466028/dym8kfaawjjqsnvneadq.jpg', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(100, 31, 'https://res.cloudinary.com/cockbook/image/upload/v1691466028/e9dwctayzo2rpih7kdco.jpg', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(101, 31, 'https://res.cloudinary.com/cockbook/image/upload/v1691466028/zoij40qazymopywdrq19.jpg', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(102, 31, 'https://res.cloudinary.com/cockbook/image/upload/v1691466028/xkgi0k2lcutqt0huriqs.jpg', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(103, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466095/ah0pd06cc2ulsksqegbe.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(104, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466095/iiw82xj3nhg3rlbbtn4i.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(105, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466097/einkst8bpqzjkxzlkiaj.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(106, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466097/ih5lnctw5jck8bfvuktb.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(107, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466096/qkgpblwj1ca3sccj31zm.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(108, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466097/twaptsm83vbzuvbljbah.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(109, 32, 'https://res.cloudinary.com/cockbook/image/upload/v1691466097/owjdmlkglbxzuwfa0xtf.jpg', '2023-08-08 03:41:46', '2023-08-08 03:41:46');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `subCategoryId` int(11) DEFAULT NULL,
  `childCategoryId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `unitSize` varchar(255) DEFAULT NULL,
  `buyerPrice` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `discountPer` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `netPrice` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `sortDesc` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `subCategoryId`, `childCategoryId`, `name`, `brand`, `status`, `unitSize`, `buyerPrice`, `price`, `qty`, `discountPer`, `discount`, `total`, `netPrice`, `photo`, `sortDesc`, `slug`, `desc`, `createdAt`, `updatedAt`) VALUES
(23, 7, 7, 0, 'Quần short 1', 'Gucci', 'active', '', 100000, 200000, 19, 0, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691383790/thpwtr3aogp7mrxx27kf.jpg', 'Quần Short Kaki HMM Form Trên Gối Co Giãn Lưng Thun Thoải Mái', 'quần-short-1', '<p><span style=\"color: rgba(0, 0, 0, 0.8);\">Thông tin sản phẩm: </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Tên sản phẩm: Quần Short Kaki HMM Form Trên Gối Co Giãn Lưng Thun Thoải Mái</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Vải kaki 2 chiều co giãn tốt tạo cảm giác thoải mái. Vải kaKi được dệt với các sợi đan chéo nhau, tạo nên những lỗ thoáng khí giúp người mặc cảm thoáng mát và không gây khó chịu cho làn da.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hàng được may và gia công kĩ lưỡng bởi những người thợ có kinh nghiệm trong nghề, vừa đẹp mắt vừa bảo đảm được độ bền với thời gian.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Thiết kế túi 2 bên bên tiện lợi, lưng thun, dây rút. Kiểu dáng trên gối, ôm nhẹ tạo cảm giác thoải mái khi sử dụng. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Mặc đi tập gym, caffe, du lịch, mặc nhà đều ổn. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Màu sắc: TRẮNG, ĐEN, XANH RÊU, VÀNG BE</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">✔️✔️ đảm bảo chất lượng sản phẩm đến tay khách hàng.</span></p><p><br></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hướng dẫn sử dụng: Quần short trên gối HMM</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Trong quá trình sử dụng không nên giặt hay xả bằng nước tẩy tránh ảnh hưởng đến chất lượng sản phẩm.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">** HMM ** cam kết: </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Quần short trên gối HMM chất vải kakico giãn 2 chiều giống mô tả. Hình ảnh sản phẩm là thật, do shop chụp.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Bảo đảm vải chất lượng, đường may tỉ mỉ, đẹp mắt.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Sản phẩm được kiểm tra kĩ càng, cẩn thận, nhân viên tư vấn nhiệt tình trước khi giao hàng đến tay quý khách. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hàng có sẵn, đóng gói và đi đơn ngay sau khi chốt đơn.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi trả, hoàn tiền khi sản phẩm không giống mô tả. </span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">** Hỗ trợ đổi trả theo quy định </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 1. Điều kiện áp dụng (trong vòng 07 ngày kể từ khi nhận sản phẩm) Hàng hoá vẫn còn mới, chưa qua sử dụng Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 2. Trường hợp được chấp nhận: Hàng không đúng size, kiểu dáng như quý khách đặt hàng . Không đủ số lượng, không đủ bộ như trong đơn hàng.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 3. Trường hợp không đủ điều kiện áp dụng chính sách: Quá 07 ngày kể từ khi Quý khách nhận hàng Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của HMM. Không thích, không hợp, đặt nhầm mã, nhầm màu...</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5%</span></p>', '2023-08-07 04:49:51', '2023-08-10 09:52:50'),
(24, 6, 3, 0, 'Áo thun 1', 'Gucci', 'active', '', 200000, 400000, 10, 0, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384085/s93nbquch7beqapjfreh.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-thun-1', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p>Thông số chọn size:</p><p>Size M: 1m45-1m55 (45-55kg) </p><p>Size L: 1m55-1m65 (55-65kg) </p><p>Size XL: 1m65- 1m75 (65-75kg) </p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm) </p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất </p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách: </p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 04:54:46', '2023-08-07 04:54:46'),
(25, 6, 4, 0, 'Áo polo 1', 'Gucci', 'active', '', 200000, 300000, 10, 12, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384226/qidopjmtiaiv76b01nfo.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-polo-1', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p><br></p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p><br></p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p><br></p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p><br></p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p><br></p><p><br></p><p>Thông số chọn size:</p><p><br></p><p>Size M: 1m45-1m55 (45-55kg)&nbsp;</p><p><br></p><p>Size L: 1m55-1m65 (55-65kg)&nbsp;</p><p><br></p><p>Size XL: 1m65- 1m75 (65-75kg)&nbsp;</p><p><br></p><p><br></p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p><br></p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p><br></p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p><br></p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p><br></p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p><br></p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p><br></p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p><br></p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm)&nbsp;</p><p><br></p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p><br></p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất&nbsp;</p><p><br></p><p><br></p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách:&nbsp;</p><p><br></p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p><br></p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p><br></p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p><br></p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p><br></p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p><br></p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p><br></p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p><br></p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 04:57:07', '2023-08-07 04:57:07'),
(26, 6, 5, 0, 'Áo sơ mi 1', 'Gucci', 'active', '', 150000, 400000, 10, 11, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384323/xkklkihz5twgid4trf1r.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-sơ-mi-1', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p><br></p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p><br></p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p><br></p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p><br></p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p><br></p><p><br></p><p>Thông số chọn size:</p><p><br></p><p>Size M: 1m45-1m55 (45-55kg)&nbsp;</p><p><br></p><p>Size L: 1m55-1m65 (55-65kg)&nbsp;</p><p><br></p><p>Size XL: 1m65- 1m75 (65-75kg)&nbsp;</p><p><br></p><p><br></p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p><br></p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p><br></p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p><br></p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p><br></p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p><br></p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p><br></p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p><br></p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm)&nbsp;</p><p><br></p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p><br></p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất&nbsp;</p><p><br></p><p><br></p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách:&nbsp;</p><p><br></p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p><br></p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p><br></p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p><br></p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p><br></p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p><br></p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p><br></p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p><br></p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 04:58:44', '2023-08-07 04:58:44'),
(27, 6, 5, 0, 'Áo sơ mi 2', 'Gucci', 'active', '', 200000, 500000, 19, 30, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384425/m4lrvw0ipbtfjg0wsqak.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-sơ-mi-2', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p><br></p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p><br></p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p><br></p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p><br></p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p><br></p><p><br></p><p>Thông số chọn size:</p><p><br></p><p>Size M: 1m45-1m55 (45-55kg)&nbsp;</p><p><br></p><p>Size L: 1m55-1m65 (55-65kg)&nbsp;</p><p><br></p><p>Size XL: 1m65- 1m75 (65-75kg)&nbsp;</p><p><br></p><p><br></p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p><br></p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p><br></p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p><br></p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p><br></p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p><br></p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p><br></p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p><br></p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm)&nbsp;</p><p><br></p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p><br></p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất&nbsp;</p><p><br></p><p><br></p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách:&nbsp;</p><p><br></p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p><br></p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p><br></p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p><br></p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p><br></p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p><br></p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p><br></p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p><br></p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 05:00:25', '2023-08-10 09:52:32'),
(28, 6, 6, 0, 'Áo khoác 1', 'Gucci', 'active', '', 500000, 2000000, 10, 12, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384524/e27t9ruxblqhuxfvswxt.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-khoác-1', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p><br></p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p><br></p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p><br></p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p><br></p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p><br></p><p><br></p><p>Thông số chọn size:</p><p><br></p><p>Size M: 1m45-1m55 (45-55kg)&nbsp;</p><p><br></p><p>Size L: 1m55-1m65 (55-65kg)&nbsp;</p><p><br></p><p>Size XL: 1m65- 1m75 (65-75kg)&nbsp;</p><p><br></p><p><br></p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p><br></p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p><br></p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p><br></p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p><br></p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p><br></p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p><br></p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p><br></p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm)&nbsp;</p><p><br></p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p><br></p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất&nbsp;</p><p><br></p><p><br></p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách:&nbsp;</p><p><br></p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p><br></p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p><br></p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p><br></p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p><br></p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p><br></p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p><br></p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p><br></p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 05:02:04', '2023-08-07 05:02:04'),
(29, 6, 3, 0, 'Áo thun 2', 'Gucci', 'active', '', 1000000, 3000000, 10, 10, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384610/yzccjq0dhmrcda4iupoz.jpg', 'Áo thun FIDE Cừu Shaun, Áo phông trơn nam nữ cổ tròn unisex SHAUN 07', 'áo-thun-2', '<p>Thông tin sản phẩm Áo thun :</p><p><br></p><p><br></p><p><br></p><p>- Chất liệu: thun cotton 100%, co giãn 2 chiều, vải mềm, vải mịn, dày dặn đứng form, không xù lông.</p><p><br></p><p>- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.</p><p><br></p><p>- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p><p><br></p><p>- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.</p><p><br></p><p><br></p><p><br></p><p>Thông số chọn size:</p><p><br></p><p>Size M: 1m45-1m55 (45-55kg)&nbsp;</p><p><br></p><p>Size L: 1m55-1m65 (55-65kg)&nbsp;</p><p><br></p><p>Size XL: 1m65- 1m75 (65-75kg)&nbsp;</p><p><br></p><p><br></p><p><br></p><p>(Bảng trên chỉ mang tính chất tham khảo, chọn mặc fom vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>CHÚNG TÔI XIN CAM KẾT:</p><p><br></p><p>Đảm bảo vải chuẩn cotton 2 chiều 100% chất lượng .</p><p><br></p><p>Hàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .</p><p><br></p><p>Hoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.</p><p><br></p><p>Chấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).</p><p><br></p><p>Giao hàng toàn quốc, thanh toán khi nhận hàng.</p><p><br></p><p>Hỗ trợ đổi trả theo quy định của Shopee .</p><p><br></p><p><br></p><p><br></p><p>1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm)&nbsp;</p><p><br></p><p>- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.</p><p><br></p><p>- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất&nbsp;</p><p><br></p><p><br></p><p><br></p><p>2. Trường hợp không đủ điều kiện áp dụng chính sách:&nbsp;</p><p><br></p><p>- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.</p><p><br></p><p>- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Shop</p><p><br></p><p>- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.</p><p><br></p><p><br></p><p><br></p><p>Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%</p><p><br></p><p><br></p><p><br></p><p>Chúng tôi không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...</p><p><br></p><p><br></p><p><br></p><p>Hàng giá rẻ sẽ có chất lượng kém, xin đừng so sánh với sản phẩm chất lượng cao của chúng tôi. Trong trường hợp nhận được các sản phẩm có vấn đề không đáng kể ví dụ như bề mặt hơi bẩn có thể hết sau khi giặt, có chỉ thừa.... chúng tôi hy vọng bạn có thể tự mình giải quyết các vấn đề đó. Nếu bạn là người cầu toàn và sẽ bận tâm về các vấn đề đó, mong bạn cân nhắc cẩn thận trước khi đặt sản phẩm.</p><p><br></p><p><br></p><p><br></p><p>NẾU CÂN NẶNG CỦA BẠN QUÁ CỠ - XIN ĐỪNG CHỌN MUA SẢN PHẨM NÀY - CHỌN KÍCH CỠ SAI SẼ KHIẾN BẠN CẢM THẤY KHÔNG HÀI LÒNG VÀ ĐƯA RA PHẢN HỒI TIÊU CỰC.</p><p><br></p><p><br></p><p><br></p><p>#aothunnam #aothunnu #aothununisex #aothuntaylo #aophongnuformrong #aoformrong #aophongtaylo #aothuncotton #aothunnuformrong #aounisex #aophongnudep #aophongrongnu #aothundep #aothuntayloformrong #aothunhanquoc #aophongdep #aocotton #aophongnurong #aothuntaylounisex</p>', '2023-08-07 05:03:31', '2023-08-07 05:03:31'),
(30, 7, 8, 0, 'Quần tây 1', 'Gucci', 'active', '', 100000, 10000000, 10, 10, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691384875/r3uvrd7vvbrluwotbyco.jpg', 'Quần Short Kaki HMM Form Trên Gối Co Giãn Lưng Thun Thoải Mái', 'quần-tây-1', '<p><span style=\"color: rgba(0, 0, 0, 0.8);\">Thông tin sản phẩm: </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Tên sản phẩm: Quần Short Kaki HMM Form Trên Gối Co Giãn Lưng Thun Thoải Mái</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Vải kaki 2 chiều co giãn tốt tạo cảm giác thoải mái. Vải kaKi được dệt với các sợi đan chéo nhau, tạo nên những lỗ thoáng khí giúp người mặc cảm thoáng mát và không gây khó chịu cho làn da.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hàng được may và gia công kĩ lưỡng bởi những người thợ có kinh nghiệm trong nghề, vừa đẹp mắt vừa bảo đảm được độ bền với thời gian.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Thiết kế túi 2 bên bên tiện lợi, lưng thun, dây rút. Kiểu dáng trên gối, ôm nhẹ tạo cảm giác thoải mái khi sử dụng. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Mặc đi tập gym, caffe, du lịch, mặc nhà đều ổn. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Màu sắc: TRẮNG, ĐEN, XANH RÊU, VÀNG BE</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">✔️✔️ đảm bảo chất lượng sản phẩm đến tay khách hàng.</span></p><p><br></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hướng dẫn sử dụng: Quần short trên gối HMM</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Trong quá trình sử dụng không nên giặt hay xả bằng nước tẩy tránh ảnh hưởng đến chất lượng sản phẩm.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">** HMM ** cam kết: </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Quần short trên gối HMM chất vải kakico giãn 2 chiều giống mô tả. Hình ảnh sản phẩm là thật, do shop chụp.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Bảo đảm vải chất lượng, đường may tỉ mỉ, đẹp mắt.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Sản phẩm được kiểm tra kĩ càng, cẩn thận, nhân viên tư vấn nhiệt tình trước khi giao hàng đến tay quý khách. </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hàng có sẵn, đóng gói và đi đơn ngay sau khi chốt đơn.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi trả, hoàn tiền khi sản phẩm không giống mô tả. </span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">** Hỗ trợ đổi trả theo quy định </span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 1. Điều kiện áp dụng (trong vòng 07 ngày kể từ khi nhận sản phẩm) Hàng hoá vẫn còn mới, chưa qua sử dụng Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 2. Trường hợp được chấp nhận: Hàng không đúng size, kiểu dáng như quý khách đặt hàng . Không đủ số lượng, không đủ bộ như trong đơn hàng.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- 3. Trường hợp không đủ điều kiện áp dụng chính sách: Quá 07 ngày kể từ khi Quý khách nhận hàng Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của HMM. Không thích, không hợp, đặt nhầm mã, nhầm màu...</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8);\">- Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5%</span></p>', '2023-08-07 05:07:55', '2023-08-07 06:03:00'),
(31, 6, 4, 0, 'Áo polo 2', 'Gucci', 'active', '', 100000, 500000, 10, 12, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691466037/qu2svmiwskk2za0exkvp.jpg', 'null', 'áo-polo-2', '<p>aa</p>', '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(32, 6, 4, 0, 'Áo polo 3', 'Gucci', 'active', '', 100000, 500000, 10, 12, 0, 0, 0, 'https://res.cloudinary.com/cockbook/image/upload/v1691466105/hpnxkef6tcmbismvpzdf.jpg', 'null', 'áo-polo-3', '<p>Áo polo 3</p><p><br></p>', '2023-08-08 03:41:46', '2023-08-08 03:41:46');

-- --------------------------------------------------------

--
-- Table structure for table `productsizes`
--

CREATE TABLE `productsizes` (
  `id` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productsizes`
--

INSERT INTO `productsizes` (`id`, `size`, `amount`, `productId`, `createdAt`, `updatedAt`) VALUES
(2, 'm', 0, 2, '2023-07-08 13:12:43', '2023-07-08 13:12:43'),
(3, 'l', 0, 2, '2023-07-08 13:12:43', '2023-07-08 13:12:43'),
(4, 'm', 10, 30, '2023-08-07 06:03:00', '2023-08-07 06:03:00'),
(5, 'm', 10, 31, '2023-08-08 03:40:38', '2023-08-08 03:40:38'),
(6, 'm', 10, 32, '2023-08-08 03:41:46', '2023-08-08 03:41:46'),
(7, 'm', 19, 27, '2023-08-10 09:52:32', '2023-08-10 09:52:32'),
(8, 'm', 19, 23, '2023-08-10 09:52:50', '2023-08-10 09:52:50');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200613173828-create-user.js'),
('20200621141549-create-category.js'),
('20200622174557-add-column-user.js'),
('20200708120626-create-product-offer.js'),
('20200713195253-create-sub-category.js'),
('20200717174011-create-sub-child-category.js'),
('20200730084936-add-column-category.js'),
('20200730184103-create-productphoto.js'),
('20200804102505-create-location.js'),
('20200804102730-create-area.js'),
('20200809045756-create-product.js'),
('20200903150938-create-address.js'),
('20200903161901-create-cart.js'),
('20200904052351-create-order.js'),
('20200906050310-add-column-address.js'),
('20200906064257-create-customer.js'),
('20200908052854-add-column-order.js'),
('20201225083703-create-payment.js'),
('20210109223021-create-vendor.js'),
('20210109223242-create-vendor-product.js'),
('20210111184629-add-column-location.js'),
('20210111184635-add-column-area.js'),
('20210111200003-create-vendor-area.js');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `sub_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `categoryId`, `sub_name`, `createdAt`, `updatedAt`) VALUES
(3, 6, 'Áo thun', '2023-08-07 04:43:18', '2023-08-07 04:43:18'),
(4, 6, 'Áo polo', '2023-08-07 04:43:28', '2023-08-07 04:43:28'),
(5, 6, 'Áo sơ mi', '2023-08-07 04:43:36', '2023-08-07 04:43:36'),
(6, 6, 'Áo khoác', '2023-08-07 04:43:40', '2023-08-07 04:43:40'),
(7, 7, 'Quần Short', '2023-08-07 04:44:51', '2023-08-07 04:44:51'),
(8, 7, 'Quần Tây', '2023-08-07 04:44:57', '2023-08-07 04:44:57'),
(9, 7, 'Quần Jeans', '2023-08-07 04:45:06', '2023-08-07 04:45:06'),
(10, 7, 'Quần Kaki', '2023-08-07 04:45:12', '2023-08-07 04:45:12'),
(11, 8, 'Mũ len', '2023-08-07 04:45:35', '2023-08-07 04:45:35'),
(12, 8, 'Mũ lưỡi trai', '2023-08-07 04:45:53', '2023-08-07 04:45:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `verify` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `address`, `email`, `phone`, `verify`, `password`, `createdAt`, `updatedAt`, `role`) VALUES
(1, 'Pham', 'Giang', 'ha noi', 'datistpham@gmail.com', NULL, 1, '25f9e794323b453885f5181f1b624d0b', '2023-07-03 09:58:12', '2023-07-03 09:58:12', 'admin'),
(2, 'Nguyen', 'A', 'Ha noi', 'datistphamx@gmail.com', NULL, 1, '25f9e794323b453885f5181f1b624d0b', '2023-07-09 11:15:49', '2023-07-09 11:15:49', 'emp');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `storename` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `shopaddress` text DEFAULT NULL,
  `shopdesc` text DEFAULT NULL,
  `ownername` varchar(255) DEFAULT NULL,
  `owneraddress` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `areaId` int(11) DEFAULT NULL,
  `accountNo` varchar(255) DEFAULT NULL,
  `accountHolderName` varchar(255) DEFAULT NULL,
  `IFSC` varchar(255) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `adharCardNo` varchar(255) DEFAULT NULL,
  `panCardNo` varchar(255) DEFAULT NULL,
  `GSTNo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `storename`, `status`, `shopaddress`, `shopdesc`, `ownername`, `owneraddress`, `email`, `password`, `phone`, `areaId`, `accountNo`, `accountHolderName`, `IFSC`, `bankName`, `branch`, `adharCardNo`, `panCardNo`, `GSTNo`, `createdAt`, `updatedAt`) VALUES
(1, 'Pham Giang', 'active', 'Ha noi', 'aaaaaa', 'Pham Giang', 'Ha noi', 'giang10a1dz@gmail.com', '12345678', '0388015984', NULL, 'aaaaaaaaa', 'aaaaaaaaaaaaa', 'a', 'aaaaaaaaaaaaa', NULL, 'aaaaaaaaaaaaa', 'aaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaa', '2023-05-30 02:40:19', '2023-05-30 02:40:19'),
(2, 'Pham Giang', 'active', 'Ha noi', 'aaaaaaaaaaa', 'Pham Giang', 'Ha noi', 'giang10a1dz@gmail.com', '12345678', '0388015984', NULL, 'aaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaa', NULL, 'aaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaa', '2023-05-30 02:42:36', '2023-05-30 02:42:36');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_products`
--

CREATE TABLE `vendor_products` (
  `id` int(11) NOT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `unitSize` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor_products`
--

INSERT INTO `vendor_products` (`id`, `supplierId`, `productId`, `price`, `unitSize`, `createdAt`, `updatedAt`) VALUES
(1, 1, 16, 5000, 'L', '2023-07-18 18:14:54', '2023-07-18 18:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `vouchercustomers`
--

CREATE TABLE `vouchercustomers` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `is_use` int(11) NOT NULL,
  `voucherId` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vouchercustomers`
--

INSERT INTO `vouchercustomers` (`id`, `customerId`, `is_use`, `voucherId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 26, '2023-07-16 09:24:42', '2023-07-16 09:24:42'),
(2, 1, 0, 40, '2023-07-16 09:29:03', '2023-07-16 09:29:03'),
(3, 16, 1, 56, '2023-07-16 09:36:27', '2023-07-16 10:44:35'),
(4, 16, 0, 33, '2023-07-16 09:51:41', '2023-07-16 09:51:41'),
(5, 16, 0, 21, '2023-07-16 09:52:39', '2023-07-16 09:52:39'),
(6, 16, 0, 21, '2023-07-16 09:53:04', '2023-07-16 09:53:04'),
(7, 16, 0, 59, '2023-07-16 09:57:13', '2023-07-16 09:57:13'),
(8, 16, 0, 25, '2023-07-16 09:58:06', '2023-07-16 09:58:06'),
(9, 16, 0, 29, '2023-07-16 09:58:44', '2023-07-16 09:58:44'),
(10, 16, 0, 26, '2023-07-16 09:59:27', '2023-07-16 09:59:27'),
(11, 16, 0, 26, '2023-07-16 09:59:28', '2023-07-16 09:59:28'),
(12, 16, 0, 36, '2023-07-16 10:02:59', '2023-07-16 10:02:59'),
(13, 16, 0, 64, '2023-07-16 10:03:02', '2023-07-16 10:03:02'),
(14, 22, 0, 61, '2023-08-05 12:30:28', '2023-08-05 12:30:28'),
(15, 22, 0, 52, '2023-08-08 03:34:12', '2023-08-08 03:34:12'),
(16, 22, 0, 17, '2023-08-08 03:34:13', '2023-08-08 03:34:13'),
(17, 22, 0, 31, '2023-08-08 03:34:14', '2023-08-08 03:34:14'),
(18, 22, 0, 40, '2023-08-08 09:00:04', '2023-08-08 09:00:04'),
(19, 22, 0, 42, '2023-08-08 09:00:05', '2023-08-08 09:00:05'),
(20, 22, 0, 63, '2023-08-08 09:01:01', '2023-08-08 09:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL,
  `expire` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `discount`, `expire`, `createdAt`, `updatedAt`) VALUES
(71, 'TI0SX2G6', 15000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(72, '3GDDDY19', 25000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(73, 'TGY90QV1', 60000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(74, '2B3IJOB8', 70000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(75, 'RIHLNA4M', 45000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(76, 'NO3AMZBN', 20000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(77, 'SZVNDQ8P', 50000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(78, '3034JWOV', 80000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(79, 'VGMUEGYK', 55000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(80, 'VG0J1LNA', 55000, '2023-09-03T04:41:34.647Z', '2023-08-04 04:41:34', '2023-08-04 04:41:34'),
(81, 'ZHLNIRJX', 10000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(82, 'A2C19KOV', 25000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(83, 'QDXLDE25', 10000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(84, '1BK2IN0O', 40000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(85, 'T0KO6F57', 75000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(86, 'ZRILZ762', 25000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(87, '453PLRYB', 95000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(88, 'K8MF3QSF', 35000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(89, '2SWD1ZDB', 70000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(90, 'JQ4H4WWX', 65000, '2023-09-04T12:30:23.898Z', '2023-08-05 12:30:23', '2023-08-05 12:30:23'),
(91, 'BDPZ724L', 100000, '2023-08-19T16:35', '2023-08-18 09:35:15', '2023-08-18 09:35:15'),
(92, 'E42XC1KT', 1000000, '2023-08-19T16:36', '2023-08-18 09:36:30', '2023-08-18 09:36:30');

-- --------------------------------------------------------

--
-- Table structure for table `voucherschedules`
--

CREATE TABLE `voucherschedules` (
  `id` int(11) NOT NULL,
  `date_start` varchar(255) NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `amount_voucher` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `custId` (`custId`);

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `locationId` (`locationId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `price` (`price`),
  ADD KEY `addressId` (`addressId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_reply` (`user_reply`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custId` (`custId`),
  ADD KEY `voucherId` (`voucherId`);

--
-- Indexes for table `productphotos`
--
ALTER TABLE `productphotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `subCategoryId` (`subCategoryId`),
  ADD KEY `childCategoryId` (`childCategoryId`);

--
-- Indexes for table `productsizes`
--
ALTER TABLE `productsizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_products`
--
ALTER TABLE `vendor_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchercustomers`
--
ALTER TABLE `vouchercustomers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `voucherId` (`voucherId`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucherschedules`
--
ALTER TABLE `voucherschedules`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `productphotos`
--
ALTER TABLE `productphotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `productsizes`
--
ALTER TABLE `productsizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor_products`
--
ALTER TABLE `vendor_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vouchercustomers`
--
ALTER TABLE `vouchercustomers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `voucherschedules`
--
ALTER TABLE `voucherschedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
