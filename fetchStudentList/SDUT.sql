-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 23, 2016 at 12:11 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `SDUT`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
	  `id` int(6) NOT NULL,
	  `sdut_num` varchar(11) NOT NULL,
	  `really_name` varchar(20) NOT NULL,
	  `sex` tinytext NOT NULL,
	  `grade` varchar(4) NOT NULL,
	  `major` varchar(20) NOT NULL,
	  `class` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24723 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sdut_num` (`sdut_num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24723;
