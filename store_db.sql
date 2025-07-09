-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2025 at 01:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `answerable_id` int(11) NOT NULL,
  `answerable_type` varchar(255) NOT NULL,
  `comment_id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(255) NOT NULL,
  `active_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'اپل', NULL, NULL),
(2, 'سامسونگ', NULL, NULL),
(4, 'شیائومی', NULL, NULL),
(5, 'اچ پی', NULL, NULL),
(6, 'لنوو', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_authentication-code-09144831183', 'i:8013;', 1751714437);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `productType_id` bigint(20) UNSIGNED NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'موبایل', NULL, NULL),
(2, 'لپ تاپ', NULL, NULL),
(5, 'ساعت هوشمند', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `commentable_id` int(11) NOT NULL,
  `commentable_type` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `score` varchar(255) NOT NULL,
  `active_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(285, 16, 18, '2025-07-04 17:30:07', '2025-07-04 17:30:07'),
(287, 16, 2, '2025-07-05 06:47:50', '2025-07-05 06:47:50'),
(288, 16, 20, '2025-07-05 07:03:45', '2025-07-05 07:03:45'),
(289, 16, 8, '2025-07-05 07:48:47', '2025-07-05 07:48:47');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_05_085513_create_personal_access_tokens_table', 1),
(5, '2025_03_08_072559_create_categories_table', 1),
(6, '2025_03_08_072609_create_brands_table', 1),
(7, '2025_03_08_072916_create_products_table', 1),
(8, '2025_03_08_073650_create_product_types_table', 1),
(9, '2025_03_08_074008_create_likes_table', 1),
(10, '2025_03_08_074102_create_product_properties_table', 1),
(11, '2025_03_08_074427_create_comments_table', 1),
(12, '2025_03_08_074435_create_answers_table', 1),
(13, '2025_03_12_065754_create_product_type_galleries_table', 2),
(15, '2025_03_12_093120_create_carts_table', 3),
(16, '2025_03_14_083134_create_comments_table', 4),
(17, '2025_03_14_083216_create_answers_table', 4),
(22, '2025_03_15_092626_create_orders_table', 5),
(23, '2025_03_15_092637_create_order_products_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `driver` varchar(255) NOT NULL,
  `status` enum('پرداخت نشده','پرداخت شده') NOT NULL DEFAULT 'پرداخت نشده',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `productType_id` bigint(20) UNSIGNED NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `payment` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(17, 'App\\Models\\User', 1, '09144831183', '1daa0c4b98ffc53c543648e6fcfa50725ef83278d1f7f191fdd7aabff7e3ead7', '[\"*\"]', '2025-03-14 06:29:10', '2025-05-13 17:34:27', '2025-03-13 17:34:27', '2025-03-14 06:29:10'),
(18, 'App\\Models\\User', 1, '09144831183', '1b1971a4b7f95fce081d2d5243b97f8aa0b77568d10c3e15486edc241ae042b0', '[\"*\"]', '2025-03-14 06:19:04', '2025-05-14 05:07:42', '2025-03-14 05:07:42', '2025-03-14 06:19:04'),
(25, 'App\\Models\\User', 2, '09144831183', '1115ec43e5b9115b23f042db4c5987a785b5e99e963782862fca4bab64f249bc', '[\"*\"]', '2025-03-16 07:00:10', '2025-05-16 04:25:18', '2025-03-16 04:25:18', '2025-03-16 07:00:10'),
(26, 'App\\Models\\User', 2, '09144831183', '02bbe42242d2b810790686dca4e33ec82b08d9872413121e2ed8410b29841920', '[\"*\"]', '2025-03-16 06:40:23', '2025-05-16 04:59:29', '2025-03-16 04:59:29', '2025-03-16 06:40:23'),
(28, 'App\\Models\\User', 2, '09144831183', '3958a73543dd7c508c858c32fa46df987d0e2bcea7ce1d84eb3fa37bdf58e6f3', '[\"*\"]', '2025-03-17 07:16:44', '2025-05-17 05:29:39', '2025-03-17 05:29:39', '2025-03-17 07:16:44'),
(30, 'App\\Models\\User', 2, '09144831183', '7d1e3f0250ef9cea4e6cdfe0daf5e15d933c17a3597c780925eb694e27d2b98f', '[\"*\"]', '2025-03-18 09:06:20', '2025-05-18 08:35:38', '2025-03-18 08:35:38', '2025-03-18 09:06:20'),
(31, 'App\\Models\\User', 2, '09144831183', '3427be743417f630fb84874103d642ddc9facab425d7d9f17efad04278517152', '[\"*\"]', '2025-03-18 08:55:11', '2025-05-18 08:53:59', '2025-03-18 08:53:59', '2025-03-18 08:55:11'),
(32, 'App\\Models\\User', 2, '09144831183', '310a14d3afc89998e410ba8c3b229561ea482449cf39bc2fa1c74533ab146948', '[\"*\"]', '2025-03-18 13:54:46', '2025-05-18 09:34:30', '2025-03-18 09:34:30', '2025-03-18 13:54:46'),
(33, 'App\\Models\\User', 7, '09144831183', '49a7b102b1831c336a3ff6bdda65b91b6bef3108c0e764e1acc104bc2fab974f', '[\"*\"]', '2025-03-19 08:55:14', '2025-05-18 17:45:02', '2025-03-18 17:45:02', '2025-03-19 08:55:14'),
(34, 'App\\Models\\User', 7, '09144831183', '4683e4a736835ef16a5bbbe9165ca58c7b8a5eeb2ce383f9fd8a6faa907acc83', '[\"*\"]', '2025-03-21 11:41:17', '2025-05-21 11:06:45', '2025-03-21 11:06:45', '2025-03-21 11:41:17'),
(35, 'App\\Models\\User', 7, '09144831183', '099c8a5f2cb0fe26578860b0e3dbd30c344ff646cc71eb23c4e0a03c48f770ac', '[\"*\"]', NULL, NULL, '2025-07-02 05:29:53', '2025-07-02 05:29:53'),
(36, 'App\\Models\\User', 7, '09144831183', '45a73e3222b7f8b94171c86b5ac358ecf70e85b748e7e1e8f7dc63f1ce681da9', '[\"*\"]', NULL, NULL, '2025-07-02 05:30:17', '2025-07-02 05:30:17'),
(37, 'App\\Models\\User', 7, '09144831183', 'f0df226d94f79ea15b0e2c6fcbc6947046f3667bf9fb9b75f17423044f974630', '[\"*\"]', NULL, NULL, '2025-07-02 05:31:10', '2025-07-02 05:31:10'),
(52, 'App\\Models\\User', 8, '09144831183', '598b31a35b64c5681fb3a56cc421f570042b46e2afdb5e9c0b4e1a7de5941333', '[\"*\"]', '2025-07-04 10:17:26', NULL, '2025-07-04 10:05:10', '2025-07-04 10:17:26'),
(53, 'App\\Models\\User', 8, '09144831183', 'c81aa457b8f9d547986c9a724c809b80049e9961c3c0556933766b7b0d3362ee', '[\"*\"]', '2025-07-04 10:20:15', NULL, '2025-07-04 10:18:08', '2025-07-04 10:20:15'),
(58, 'App\\Models\\User', 9, '09144831183', 'c134570640c4d78d6b99710919613ca95aadb32f5116bdd9f9a8c55070e150af', '[\"*\"]', NULL, '2025-09-04 12:03:17', '2025-07-04 12:03:17', '2025-07-04 12:03:17'),
(66, 'App\\Models\\User', 12, '09144831183', 'a89d80e016a07f2011ce799a850641728f5bfcc810949a054a5078960c47c48f', '[\"*\"]', NULL, '2025-09-04 12:13:33', '2025-07-04 12:13:33', '2025-07-04 12:13:33'),
(79, 'App\\Models\\User', 16, '09144831183', '0daa2dbac518bd1495505b24990e9ff1552cc962234629e8dd79d0f1493301ee', '[\"*\"]', '2025-07-05 07:50:09', '2025-09-05 07:48:45', '2025-07-05 07:48:45', '2025-07-05 07:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `brand_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'گوشی موبایل اپل مدل iPhone 16 Pro Max ZAA دو سیم کارت ظرفیت 1 ترابایت و رم 8 گیگابایت', '2025-03-08 09:15:36', NULL),
(2, 1, 1, 'گوشی موبایل اپل مدل iPhone 13 Pro Max ZAA دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت - نات اکتیو پارت نامبر F', '2025-03-08 09:15:34', NULL),
(3, 1, 1, 'گوشی موبایل اپل مدل iPhone 16 CH دو سیم کارت ظرفیت 128 گیگابایت و رم 8 گیگابایت', '2025-03-08 09:15:40', NULL),
(4, 1, 1, 'گوشی آیفون 15 پرو مکس حافظه 256 گیگابایت', '2025-03-08 09:15:30', NULL),
(5, 1, 2, 'گوشی موبایل سامسونگ مدل Galaxy A35 دو سیم کارت ظرفیت 128 گیگابایت رم 8 گیگابایت', '2025-03-08 09:15:42', NULL),
(6, 1, 2, 'گوشی موبایل سامسونگ مدل Galaxy A05s دو سیم کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت', '2025-03-08 09:15:25', NULL),
(7, 1, 4, 'گوشی موبایل شیائومی مدل Redmi Note 13 Pro Plus 5G دو سیم کارت ظرفیت 512 گیگابایت و رم 12 گیگابایت', '2025-03-08 09:15:22', NULL),
(8, 2, 1, 'لپ تاپ 15.3 اینچی اپل مدل MacBook Air MXD33 2024 LLA-M3-16GB RAM-512GB SSD', '2025-03-08 09:32:06', NULL),
(9, 2, 1, 'لپ تاپ 16.2 اینچی اپل مدل MacBook Pro MX2X3 2024 LLA-M4 Pro-24GB RAM-512GB SSD', '2025-03-08 09:32:20', NULL),
(10, 2, 1, 'لپ تاپ 15.3 اینچی اپل مدل MacBook Air MXD13 2024 LLA-M3-16GB RAM-512GB SSD', '2025-03-08 09:35:20', NULL),
(11, 2, 1, 'لپ تاپ 15.3 اینچی اپل مدل MacBook Air MXD23 2024 LLA-M3-16GB RAM-512GB SSD', '2025-03-08 09:40:16', NULL),
(12, 2, 6, 'لپ تاپ 15.6 اینچی لنوو مدل V15 G4 AMN-Athlon Silver 7120U-8GB LPDDR5-256GB SSD-TN', '2025-03-08 09:46:38', NULL),
(13, 2, 5, 'لپ تاپ 16.1 اینچی اچ‌ پی مدل Victus 16-R0073CL-i7 13700HX 32GB 1SSD RTX4060', '2025-03-08 09:52:29', NULL),
(14, 5, 1, 'ساعت هوشمند اپل واچ مدل 38mm Stainless Steel Case with Black Modern Buckle', '2025-03-07 10:04:14', NULL),
(15, 5, 1, 'ساعت هوشمند اپل واچ سری 4 سلولار مدل 40mm Stainless Steel Case with Stone Sport Silicon Band', '2025-03-07 10:07:30', NULL),
(16, 1, 1, 'گوشی موبایل اپل مدل iPhone XS Max دو سیم‌ کارت ظرفیت 256 گیگابایت', '2025-03-08 10:25:53', NULL),
(17, 2, 1, 'لپ تاپ 13.6 اینچی اپل مدل MacBook Air MLXW3 2022 LLA-M2-8GB Ram-256GB SSD', '2025-03-21 14:30:33', NULL),
(18, 2, 5, 'لپ تاپ 15.6 اینچی اچ‌ پی مدل Victus 15 Gaming FB2082wm-R5 8645HS-8GB', '2025-03-21 14:40:27', '2025-03-21 14:40:27'),
(19, 1, 2, 'گوشی موبایل سامسونگ مدل Galaxy S25 Ultra دو سیم کارت', '2025-07-05 11:40:21', NULL),
(20, 1, 2, 'گوشی موبایل سامسونگ مدل S24 FE دو سیم کارت', '2025-07-05 11:40:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_properties`
--

CREATE TABLE `product_properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_properties`
--

INSERT INTO `product_properties` (`id`, `product_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 1, 'پرچم‌دار', NULL, NULL),
(2, 1, 'دوربین 48 مگاپیکسلی', NULL, NULL),
(3, 1, '8 گیگ رم', NULL, NULL),
(4, 1, '1 ترابایت', NULL, NULL),
(5, 2, '6 گیگ رم', NULL, NULL),
(6, 2, '128 گیگ فضای ذخیره سازی', NULL, NULL),
(7, 2, 'دو سیم کارته', NULL, NULL),
(8, 3, '8 گیگ رم', NULL, NULL),
(9, 3, '128 گیگ فضای ذخیره سازی', NULL, NULL),
(10, 3, 'دو سیم کارته', NULL, NULL),
(11, 4, '256 گیگ حافظه', NULL, NULL),
(12, 4, '8 گیگ رم', NULL, NULL),
(13, 5, '128 گیگ حافظه', NULL, NULL),
(14, 5, '8 گیگ رم', NULL, NULL),
(15, 6, '4 گیگ رم', NULL, NULL),
(16, 6, '128 گیگ حافظه', NULL, NULL),
(17, 7, '512 گیگ حافظه', NULL, NULL),
(18, 7, '12 گیگ رم', NULL, NULL),
(19, 7, 'دو سیم کارته', NULL, NULL),
(20, 8, '16 گیگ رم', NULL, NULL),
(21, 8, '512 SSD حافظه', NULL, NULL),
(22, 8, 'پردازنده M3', NULL, NULL),
(23, 8, 'صفحه نمایش 2880x1864 پیکسل', NULL, NULL),
(24, 9, 'پردازنده M4', NULL, NULL),
(25, 9, '24 گیگ رم', NULL, NULL),
(26, 9, '512 گیگ حاقظه SSD', NULL, NULL),
(27, 9, 'صفحه نمایش 3456x2234 پیکسل', NULL, NULL),
(28, 10, 'پردازنده M3', NULL, NULL),
(29, 10, '16 گیگ رم', NULL, NULL),
(30, 10, '512 گیگ حافظه', NULL, NULL),
(31, 11, 'پردازنده M3', NULL, NULL),
(32, 11, '512 گیگ حافظه', NULL, NULL),
(33, 11, '16 گیگ رم', NULL, NULL),
(34, 12, 'سری پردازنده ATHLON', NULL, NULL),
(35, 12, '8 گیگ رم', NULL, NULL),
(36, 12, '256 گیگ حافظه', NULL, NULL),
(37, 12, 'گرافیک Radeon 610M', NULL, NULL),
(39, 13, 'سری پردازنده Core i7', NULL, NULL),
(40, 13, '32 گیگ رم', NULL, NULL),
(41, 13, '1 ترابایت حافظه', NULL, NULL),
(42, 13, 'NVIDIA GeForce RTX 4060', NULL, NULL),
(43, 14, 'روزمره، ورزشی', NULL, NULL),
(44, 14, 'مناسب برای بانوان', NULL, NULL),
(45, 14, 'رزولوشن صفحه نمایش ۲۷۲x۳۴۰ ', NULL, NULL),
(46, 15, 'ورزشی، رسمی، روزمره', NULL, NULL),
(47, 15, 'جنس بند سیلیکون', NULL, NULL),
(48, 16, '256 گیگ حافظه', NULL, NULL),
(49, 16, '4 گیگ رم', NULL, NULL),
(50, 17, 'پردازنده M2', NULL, NULL),
(51, 17, '8 گیگ رم', NULL, NULL),
(52, 17, '256 گیگ فضای ذخیره سازی', NULL, NULL),
(53, 18, 'پردازنده Core i7 نسل 13', '2025-03-21 14:40:52', NULL),
(54, 18, '24 گیگ رم', NULL, NULL),
(55, 18, 'دو ترابایت حافظه ذخیره سازی', NULL, NULL),
(56, 19, 'Android 15', NULL, NULL),
(57, 19, '200 مگاپیکسل', NULL, NULL),
(58, 19, '512 گیگ حافظه داخلی', NULL, NULL),
(59, 19, '12 گیگ رم', NULL, NULL),
(60, 20, 'Android 14', NULL, NULL),
(61, 20, '50 مگاپیکسل', NULL, NULL),
(62, 20, '8 گیگ رم', NULL, NULL),
(63, 20, '256 گیگ حافظه', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `color_code` varchar(255) NOT NULL,
  `color_title` varchar(255) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `payment` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `product_id`, `image`, `color_code`, `color_title`, `discount`, `price`, `payment`, `count`, `created_at`, `updated_at`) VALUES
(1, 1, '/images/673beeacd35379a3944551e2ca51389730d7703d_1736598864.webp', '#333', 'تیتانیوم مشکی', 25, 70000000, 52500000, 27, NULL, '2025-03-18 10:15:48'),
(2, 1, '/images/ecddd0557a29c361ec03563931394125578f4128_1736598673.webp', '#cbbbad', 'تیتانیوم صحرایی', 20, 71500000, 57200000, 45, NULL, '2025-03-17 07:34:45'),
(5, 2, '/images/dcd6e4e843bea3f070614a95d27b1181fdf23008_1727276123.webp', '#c99212', 'طلایی', 15, 56000000, 47600000, 42, NULL, '2025-03-17 07:37:49'),
(6, 3, '/images/5af568b4909435c6a215ad5e728e902db234b673_1736597759.webp', '#2196f3', 'آبی', 13, 79200000, 68784000, 22, NULL, NULL),
(7, 3, '/images/atrinkala-apple-iphone-16-128-black_2.jpg', '#000', 'مشکی', NULL, NULL, 69200000, 25, NULL, NULL),
(8, 3, '/images/atrinkala-apple-iphone-16-128-green_2.jpg', '#a1c9c9', 'سبز', NULL, NULL, 69000000, 29, NULL, '2025-03-18 10:15:48'),
(9, 4, '/images/atrinkala-iphone-15-pro-max-256gb-white.jpg', '#fff', 'سفید', 12, 48500000, 42680000, 20, NULL, NULL),
(10, 4, '/images/atrinkala-iphone-15-pro-max-256gb-titanium.jpg', '#b5b5b5', 'تیتانیوم', 10, 48700000, 43830000, 20, NULL, NULL),
(11, 5, '/images/color_image_TLP-31018_3479bf_18ea70be-b6a0-44b7-bd03-7e70961774eb.webp', '#3479bf', 'آبی', 10, 18560000, 16704000, 25, NULL, NULL),
(12, 5, '/images/samsung-galaxy-a35-8GB-256GB-awesome-navy.jpg', '#00009c', 'سرمه ای', 13, 18160000, 15803000, 11, NULL, NULL),
(13, 6, '/images/Screenshot-2024-04-25-133240.png', '#dfebbd', 'سبز', NULL, NULL, 32000000, 25, NULL, NULL),
(14, 7, '/images/8bcbe8c1a392d66add16bf9adf4e58f1066d4df1_1706095042.webp', '#000', 'مشکی', 22, 29000000, 25980000, 17, NULL, NULL),
(15, 7, '/images/Redmi-Note-13-Pro-plus-White.jpg', '#fff', 'سفید', 20, 29200000, 26250000, 20, NULL, NULL),
(16, 8, '/images/e75d69cc408ea9d99fee43cd8e3229fa6e57f06a_1723653904.webp', '#e6dab3', 'طلایی', 20, 117000000, 98600000, 17, NULL, '2025-03-17 07:23:31'),
(17, 9, '/images/52911bcdb01c4122759b430697732b2bf538c784_1731165214.webp', '#000', 'مشکی', 12, 150000000, 143500000, 19, NULL, '2025-03-17 07:08:30'),
(18, 10, '/images/f947a1158081a83438a8f6d7d53ecbdd69f72a37_1723644625.webp', '#9e9e9e', 'خاکستری', 10, 116000000, 113680000, 17, NULL, '2025-03-17 03:55:06'),
(19, 10, '/images/b872d69721bf570c6c99278a890b6c82c87687db_1733937234.webp', '#002171', 'سرمه ای', 11, 115900000, 114899000, 21, NULL, '2025-03-17 07:18:03'),
(20, 11, '/images/5c2368648b37a98c33c513316c71f79436db6a5a_1723654426.webp', 'rgb(222, 222, 222)', 'نقره ای', NULL, NULL, 100000000, 23, NULL, '2025-03-17 07:23:31'),
(21, 12, '/images/f9d556a68cc4a507cc80981935cf68ae2e3d7711_1690028248.webp', '#000', 'مشکی', 12, 55000000, 53980000, 29, NULL, '2025-03-17 03:55:06'),
(22, 13, '/images/a44eeef495ef317c6c7c3aa8d1220d78ba308cd6_1703448223.webp', '#e0e0e0', 'خاکستری', NULL, NULL, 120000000, 39, NULL, '2025-03-17 03:55:06'),
(23, 14, '/images/876148.webp', '#000', 'مشکی', 10, 6900000, 5550000, 30, NULL, NULL),
(24, 14, '/images/1ed7524074e83cdb665d4e9619e5a8ff32b133b0_1701161232.webp', '#e6dab3', 'طلایی', 12, 6900000, 5880000, 32, NULL, NULL),
(25, 15, '/images/1ed7524074e83cdb665d4e9619e5a8ff32b133b0_1701161232.webp', '#fff', 'سفید', NULL, NULL, 9600000, 25, NULL, NULL),
(28, 16, '/images/80aedbf89779340a46c5974916222cf9dd7309c9_1656406751.webp', '#fee0ca', 'طلایی', 20, 60000000, 54500000, 25, NULL, '2025-03-18 10:15:48'),
(29, 17, '/images/1103d366e8d73bc155a7e1be7f926f0d2bfca503_1671475208.webp', '#334155', 'تیتانیوم', 20, 76200000, 75600000, 35, '2025-03-21 14:31:40', '2025-03-21 14:31:40'),
(30, 17, '/images/3898504ea35d50f59ac5c6755ac732dc310ca399_1671472029.webp', 'rgb(59, 130, 246)', 'آبی', 25, 76800000, 75680000, 25, '2025-03-21 14:31:40', '2025-03-21 14:31:40'),
(31, 18, '/images/2716b42068af45cb01c4cec0b4544236669e8dc8_1733325587.webp', '#002171', 'سرمه ای', 15, 89200000, 88900000, 42, '2025-03-21 14:41:55', '2025-03-21 14:41:55'),
(32, 18, '/images/d2f04c540a24374af145991bb2e7f79b8afbc57b_1727772138.webp', '#9e9e9e', 'خاکستری', 10, 89500000, 89250000, 49, NULL, NULL),
(33, 19, '/images/9083bfc1247b12a1a082a68ca8da8ea4b98e3204_1737642906.webp', '#fff', 'سفید', 20, 97000000, 96480000, 55, NULL, NULL),
(34, 19, '/images/0d80cf1763f87dfba48641cc09674f49f999386f_1737642906.webp', 'rgb(173, 180, 166)', 'سبز تیره', 25, 98600000, 98150000, 62, NULL, NULL),
(35, 19, '/images/fc14a8f19a56d5fa8754d26ef499bba9f5a3d2f4_1737642907.webp', '#000', 'مشکی', 0, 0, 96000000, 49, NULL, NULL),
(36, 20, '/images/1727684512-S24-FE-256-8-5g.png', '#000', 'مشکی', 20, 45000000, 44670000, 36, NULL, NULL),
(37, 20, '/images/aligned_5-600x600.jpg', 'rgb(211, 211, 209)', 'نقره ای', 15, 48200000, 47820000, 46, NULL, NULL),
(38, 20, '/images/49e641068be2c28ef70b946ce1230724351a8603_1727685940.webp', '#fbe9a6', 'زرد', 50, 48000000, 24000000, 36, NULL, NULL),
(39, 20, '/images/6a8b8bdd45a198c3d120189bb47011bd37ed3195_1727685939.webp', '#d6e3f3', 'آبی', NULL, NULL, 47900000, 46, NULL, NULL),
(40, 20, '/images/42e6fe2ec2fd02c1e52abda18534bf403fd8f8e8_1727685940.webp', '#d9eae3', 'سبز', 10, 48500000, 48250000, 30, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0orfCNnXWl3dV7KvPFqt0aSNdc9Qx97UkflgMYoJ', NULL, '127.0.0.1', 'PostmanRuntime/7.43.2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGVhMlloMmF0M3lnbUZ6b0NqQUdvVTY2WVh3aGJqMmxiQ25NM1VSTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1742201959),
('FSJIFoOUWFeb5KbS7ZYw6pPOef1eXuZXXpJAu46C', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFZ4NnNLZFhMZExqN0gza3M4RE9MNHBDbjFhSDdBcjBhcGtiNDZmciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvdmVyaWZ5P2Ftb3VudD0xNzYwMDAwMDAmc3RhdHVzPXN1Y2Nlc3MmdG9rZW49M2IwMTkzZjYtNzgyZC00ZTA5LTgxZTUtMjJlYTVmZWQ5MWIyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742305550),
('jOLiIPPLbi34k8vfKD8ccPK3jFJ1wRHtv29mvkTe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibTdiMjVRTmRWRUFLY085eFBpRGliNEZ5RnpBUW15S0IxQjdMZjhJMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAyOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvdmVyaWZ5P2Ftb3VudD05NTIwMDAwMCZzdGF0dXM9c3VjY2VzcyZ0b2tlbj1lNjU0N2E2OC0xZWU2LTQ4N2EtOWI1NC1lNDVlYjFmMmRkMTUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1742209670),
('mG0dMpkPtAcHehffexNpI7YLSeL9SWJYtcpqq0sQ', NULL, '127.0.0.1', 'PostmanRuntime/7.43.2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGM0S01xdDlwNGtQc2hjMW9idWIwTnBQa1J0Q0xKa3phallUaVRyMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1742300349);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `phone`, `is_admin`, `created_at`, `updated_at`) VALUES
(16, 'مهران', 'امان الله', '09144831183', 0, '2025-07-04 17:26:08', '2025-07-04 17:26:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answers_user_id_foreign` (`user_id`),
  ADD KEY `answers_comment_id_foreign` (`comment_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_producttype_id_foreign` (`productType_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likes_user_id_foreign` (`user_id`),
  ADD KEY `likes_product_id_foreign` (`product_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_products_order_id_foreign` (`order_id`),
  ADD KEY `order_products_producttype_id_foreign` (`productType_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_properties`
--
ALTER TABLE `product_properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_properties_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_types_product_id_foreign` (`product_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=290;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_properties`
--
ALTER TABLE `product_properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_producttype_id_foreign` FOREIGN KEY (`productType_id`) REFERENCES `product_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_producttype_id_foreign` FOREIGN KEY (`productType_id`) REFERENCES `product_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_properties`
--
ALTER TABLE `product_properties`
  ADD CONSTRAINT `product_properties_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_types`
--
ALTER TABLE `product_types`
  ADD CONSTRAINT `product_types_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
