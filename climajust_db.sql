-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 16, 2026 at 08:07 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `climajust_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `id` int NOT NULL,
  `judul` varchar(255) NOT NULL,
  `adm4_code` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `risk_level` enum('low','medium','high') NOT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','valid','invalid') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lokasi`
--

CREATE TABLE `lokasi` (
  `adm4_code` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kota` varchar(100) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL,
  `populasi` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lokasi`
--

INSERT INTO `lokasi` (`adm4_code`, `nama`, `kecamatan`, `kota`, `provinsi`, `lat`, `lng`, `populasi`, `created_at`) VALUES
('33.09.07.2001', 'Teras, Boyolali', 'Teras', 'Boyolali', 'Jawa Tengah', -7.54586150, 110.65569950, 50052, '2026-03-09 05:54:53'),
('33.09.10.2001', 'Sambi, Boyolali', 'Sambi', 'Boyolali', 'Jawa Tengah', -7.47999070, 110.68576170, 43125, '2026-03-09 05:54:53'),
('33.09.11.2001', 'Ngemplak, Boyolali', 'Ngemplak', 'Boyolali', 'Jawa Tengah', -7.51003030, 110.76649270, 96000, '2026-03-09 05:54:53'),
('33.09.12.2001', 'Nogosari, Boyolali', 'Nogosari', 'Boyolali', 'Jawa Tengah', -7.46135860, 110.75603280, 72687, '2026-03-09 05:54:53'),
('33.09.13.20001', 'Simo, Boyolali', 'Simo', 'Boyolali', 'Jawa Tengah', -7.42900204, 110.68436861, 51377, '2026-03-09 05:54:53'),
('33.11.07.2001', 'Polokarto, Sukoharjo', 'Polokarto', 'Sukoharjo', 'Jawa Tengah', -7.64282472, 110.90182287, 87611, '2026-03-09 05:54:53'),
('33.11.08.2001', 'Mojolaban, Sukoharjo', 'Mojolaban', 'Sukoharjo', 'Jawa Tengah', -7.59457730, 110.87197900, 97114, '2026-03-09 05:54:53'),
('33.11.10.2001', 'Baki, Sukoharjo', 'Baki', 'Sukoharjo', 'Jawa Tengah', -7.60531560, 110.78046355, 72147, '2026-03-09 05:54:53'),
('33.11.11.2001', 'Gatak, Sukoharjo', 'Gatak', 'Sukoharjo', 'Jawa Tengah ', -7.59017124, 110.74274692, 54853, '2026-03-09 05:54:53'),
('33.11.12.2001', 'Kartasura, Sukoharjo', 'Kartasura', 'Sukoharjo', 'Jawa Tengah', -7.55908088, 110.75034034, 116053, '2026-03-09 05:54:53'),
('33.13.11.2001', 'Jaten, Karanganyar', 'Jaten', 'Karanganyar', 'Jawa Tengah', -7.55715146, 110.88825187, 81988, '2026-03-09 05:54:53'),
('33.13.12.2001', 'Colomadu, Karanganyar', 'Colomadu', 'Karanganyar', 'Jawa Tengah', -7.53572968, 110.76320365, 75542, '2026-03-09 05:54:53'),
('33.13.13.2001', 'Gondangrejo, Karanganyar', 'Gondangrejo', 'Karanganyar', 'Jawa Tengah', -7.50511982, 110.84890035, 83030, '2026-03-09 05:54:53'),
('33.13.14.2001', 'Kebakkramat, Karanganyar', 'Kebakkramat', 'Karanganyar', 'Jawa Tengah', -7.51967851, 110.92588592, 65539, '2026-03-09 05:54:53'),
('33.14.01.2001', 'Kalijambe, Sragen', 'Kalijambe', 'Sragen', 'Jawa Tengah', -7.43466748, 110.81563508, 47289, '2026-03-09 05:54:53'),
('33.14.02.2001', 'Plupuh, Sragen', 'Plupuh', 'Sragen', 'Jawa Tengah', -7.43866281, 110.88521907, 50897, '2026-03-09 05:54:53'),
('33.14.03.2001', 'Masaran, Sragen', 'Masaran', 'Sragen', 'Jawa Tengah', -7.47626206, 110.93799432, 66091, '2026-03-09 05:54:53'),
('33.14.04.2001', 'Kedawung, Sragen', 'Kedawung', 'Sragen', 'Jawa Tengah', -7.49637428, 111.02712081, 65812, '2026-03-09 05:54:53'),
('33.14.13.2001', 'Gemolong, Sragen', 'Gemolong', 'Sragen', 'Jawa Tengah', -7.39435793, 110.84730497, 50379, '2026-03-09 05:54:53'),
('33.72.01.1002', 'Laweyan, Surakarta', 'Laweyan', 'Surakarta', 'Jawa Tengah', -7.56074585, 110.79185282, 88941, '2026-03-09 04:53:12'),
('33.72.02.1003', 'Serengan, Surakarta', 'Serengan', 'Surakarta', 'Jawa Tengah', -7.58172236, 110.81698388, 54848, '2026-03-09 04:53:12'),
('33.72.03.1003', 'Pasar Kliwon, Surakarta', 'Pasar Kliwon', 'Surakarta', 'Jawa Tengah', -7.58003410, 110.83291480, 79726, '2026-03-09 04:56:28'),
('33.72.04.1010', 'Jebres, Surakarta', 'Jebres', 'Surakarta', 'Jawa Tengah', -7.55683517, 110.84726224, 139295, '2026-03-09 04:56:28'),
('33.72.05.1014', 'Banjarsari, Surakarta', 'Banjarsari', 'Surakarta', 'Jawa Tengah', -7.54826908, 110.81940359, 171645, '2026-03-09 04:59:22');

-- --------------------------------------------------------

--
-- Table structure for table `lokasi_alias`
--

CREATE TABLE `lokasi_alias` (
  `id` bigint UNSIGNED NOT NULL,
  `alias_name` varchar(100) NOT NULL,
  `adm4_code` varchar(20) NOT NULL,
  `is_default` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pekerjaan` varchar(50) NOT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `pekerjaan`, `lokasi`, `created_at`) VALUES
(1, 'Fisnln', 'asa@gmail.com', '$2b$10$dwyQMFk0NK0CdddD2ZdNK.jz5EAa2U.SpAoHQhz.33O7EXdgOaJFK', 'ojek_online', NULL, '2026-03-12 06:29:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adm4_code` (`adm4_code`);

--
-- Indexes for table `lokasi`
--
ALTER TABLE `lokasi`
  ADD PRIMARY KEY (`adm4_code`);

--
-- Indexes for table `lokasi_alias`
--
ALTER TABLE `lokasi_alias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `alias_name` (`alias_name`),
  ADD KEY `adm4_code` (`adm4_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `lokasi_alias`
--
ALTER TABLE `lokasi_alias`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `laporan_ibfk_1` FOREIGN KEY (`adm4_code`) REFERENCES `lokasi` (`adm4_code`);

--
-- Constraints for table `lokasi_alias`
--
ALTER TABLE `lokasi_alias`
  ADD CONSTRAINT `lokasi_alias_ibfk_1` FOREIGN KEY (`adm4_code`) REFERENCES `lokasi` (`adm4_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
