-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 18, 2023 at 01:58 PM
-- Server version: 10.6.12-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `u259618636_funktoon`
--
CREATE DATABASE IF NOT EXISTS `u259618636_funktoon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u259618636_funktoon`;

-- --------------------------------------------------------

--
-- Table structure for table `Autenticacao`
--

DROP TABLE IF EXISTS `Autenticacao`;
CREATE TABLE IF NOT EXISTS `Autenticacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id da sessao',
  `usuario` varchar(60) NOT NULL COMMENT 'Identificacao do usuário que criou o token. poderá ser email ou id',
  `token` longtext DEFAULT NULL,
  `tipo_token` int(11) NOT NULL COMMENT 'Os tokens podem ser de sessao, criados com JWT,\nou de validação, que são números com de 4 a 6 dígitos gerados randomicamente',
  `codigo` varchar(255) NOT NULL COMMENT 'Valor do token gerado no momento da acao do usuário. Login ou reset de senha',
  `codigo_validado` tinyint(4) DEFAULT 0 COMMENT 'Token não pode mais ser usado. O usuário que estive usando deverá ser deslogado',
  `tentativas` int(11) DEFAULT 0,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data que a sessão foi criada',
  `data_expiracao` datetime NOT NULL COMMENT 'Data que a sessao/token perde a validade',
  `data_atualizacao` datetime DEFAULT NULL COMMENT 'Data que o token foi alterado',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Autenticacao`
--

INSERT INTO `Autenticacao` (`id`, `usuario`, `token`, `tipo_token`, `codigo`, `codigo_validado`, `tentativas`, `data_inclusao`, `data_expiracao`, `data_atualizacao`) VALUES
(88, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg3NDQ2ODM1LCJleHAiOjE2ODc0NDc3MzV9.vBNUu64JBeqCgCEQ65YPAIqef4DYnRKgurX7F65HO2o', 2, '800843', 0, 0, '2023-06-22 15:14:02', '2023-06-22 12:28:55', NULL),
(89, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg3NDQ2ODQ5LCJleHAiOjE2ODc0NDc3NDl9.-POxCTdhQbPpfFzgIuHk1C45sLF0Z3oZ92II0BCgnPs', 2, '421883', 0, 0, '2023-06-22 15:14:16', '2023-06-22 12:29:09', NULL),
(93, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5NDIxLCJleHAiOjE2ODkwMTAzMjF9.DhunvrFX4SCWpXxKxa2N0zFfJohhS4myjHzsWxeSCPE', 2, '847712', 0, 0, '2023-07-10 17:17:01', '2023-07-10 14:32:01', NULL),
(94, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5NTU1LCJleHAiOjE2ODkwMTA0NTV9.71ZQZ_sc2vRlPz72sgnq7dH38ZyxEkxbECe23KU_EwQ', 2, '995857', 0, 0, '2023-07-10 17:19:14', '2023-07-10 14:34:15', NULL),
(95, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5NTgwLCJleHAiOjE2ODkwMTA0ODB9.6pidQKdwigYzwrSiuelGPW5rT33wcCRJCiFtDB_5wII', 2, '658843', 1, 1, '2023-07-10 17:19:39', '2023-07-10 14:34:40', NULL),
(96, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5NjI3LCJleHAiOjE2ODkwMTA1Mjd9.pWbE0oVWMGAOUhrsyXSqB2zPLWHPeDOYWSdVbrcgyLc', 2, '850441', 1, 1, '2023-07-10 17:20:26', '2023-07-10 14:35:27', NULL),
(97, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5NzA3LCJleHAiOjE2ODkwMTA2MDd9.ih5POC8GpacyL1vswYK_XPNwUD3qLJaYDfwfRZ8mX-8', 2, '740644', 1, 1, '2023-07-10 17:21:46', '2023-07-10 14:36:47', NULL),
(98, 'joao.holanda@soulasalle.com.br', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiam9hby5ob2xhbmRhQHNvdWxhc2FsbGUuY29tLmJyIiwiaWF0IjoxNjg5MDA5Nzg3LCJleHAiOjE2ODkwMTA2ODd9.k-7Hk-Ly-97nto1nY2eLQeCH0hp8J1h1teQxPUJpgwQ', 2, '811586', 1, 1, '2023-07-10 17:23:06', '2023-07-10 14:38:07', NULL),
(99, 'marcelovaughan@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibWFyY2Vsb3ZhdWdoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg5MTYzMDQ4LCJleHAiOjE2ODkxNjM5NDh9.DR2-Htb1iUceGHMIbCr9aL5PdoO9xOJfMjVb1yvi7rs', 2, '489977', 0, 0, '2023-07-12 11:57:23', '2023-07-12 09:12:28', NULL),
(100, 'marcelovaughan@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibWFyY2Vsb3ZhdWdoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg5MTY0MDkwLCJleHAiOjE2ODkxNjQ5OTB9.vhazP1ASQW6vKToGwrGJIBzSup04FAN_BOZJV8NsA3A', 2, '833258', 0, 0, '2023-07-12 12:14:46', '2023-07-12 09:29:50', NULL),
(101, 'marcelovaughan@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibWFyY2Vsb3ZhdWdoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg5MTY0NDcwLCJleHAiOjE2ODkxNjUzNzB9.26htYWV9jy_onxFi1pSKPPsQFVRU1v3yP3j4zqIHzZI', 2, '933246', 0, 0, '2023-07-12 12:21:06', '2023-07-12 09:36:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Colecao`
--

DROP TABLE IF EXISTS `Colecao`;
CREATE TABLE IF NOT EXISTS `Colecao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_atualizacao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Colecao__Conteudo`
--

DROP TABLE IF EXISTS `Colecao__Conteudo`;
CREATE TABLE IF NOT EXISTS `Colecao__Conteudo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_colecao` int(11) NOT NULL,
  `id_conteudo` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `id_usuario_operacao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_colecao` (`id_colecao`),
  KEY `id_conteudo` (`id_conteudo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Comentario`
--

DROP TABLE IF EXISTS `Comentario`;
CREATE TABLE IF NOT EXISTS `Comentario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_episodio` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `descricao` longtext NOT NULL,
  `pubicado` tinyint(1) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `id_usuario_operacao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_episodio` (`id_episodio`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Comentários';

-- --------------------------------------------------------

--
-- Table structure for table `Configuracao`
--

DROP TABLE IF EXISTS `Configuracao`;
CREATE TABLE IF NOT EXISTS `Configuracao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `habilitar_banner_selecao` tinyint(1) NOT NULL,
  `url_banner_assinatura` mediumtext NOT NULL,
  `habilitar_pagina_assinatura` tinyint(1) NOT NULL,
  `nome_editora` varchar(255) DEFAULT NULL,
  `descricao_editora` mediumtext DEFAULT NULL,
  `imagem_editora` varchar(255) DEFAULT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL,
  `qtd_item_home` smallint(6) DEFAULT NULL,
  `qtd_item_ultimos_dia` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Configurações';

--
-- Dumping data for table `Configuracao`
--

INSERT INTO `Configuracao` (`id`, `habilitar_banner_selecao`, `url_banner_assinatura`, `habilitar_pagina_assinatura`, `nome_editora`, `descricao_editora`, `imagem_editora`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `qtd_item_home`, `qtd_item_ultimos_dia`) VALUES
(1, 1, 'https://i.imgur.com/UnOKhsU.png', 1, 'Guará', 'Somos um estúdio que publica e produz histórias em quadrinhos totalmente brasileiras. Queremos popularizar o quadrinho nacional e levá-lo para o dia-a-dia das pessoas. Buscamos contribuir com a expansão do mercado para artistas e leitores. Vencedores do Troféu HQMix de Editora do Ano em 2022.', 'Guara.png', NULL, NULL, NULL, '2023-05-18 18:55:57', NULL, NULL),
(2, 1, 'https://i.imgur.com/UnOKhsU.png', 1, 'Guará', 'Somos um estúdio que publica e produz histórias em quadrinhos totalmente brasileiras. Queremos popularizar o quadrinho nacional e levá-lo para o dia-a-dia das pessoas. Buscamos contribuir com a expansão do mercado para artistas e leitores. Vencedores do Troféu HQMix de Editora do Ano em 2022.', 'http://image-url.com', 1, '2023-07-10 14:05:45', NULL, '2023-07-09 21:00:00', 5, 2),
(3, 1, 'https://i.imgur.com/UnOKhsU.png', 1, 'Guará', 'Somos um estúdio que publica e produz histórias em quadrinhos totalmente brasileiras. Queremos popularizar o quadrinho nacional e levá-lo para o dia-a-dia das pessoas. Buscamos contribuir com a expansão do mercado para artistas e leitores. Vencedores do Troféu HQMix de Editora do Ano em 2022.', 'http://image-url.com', 1, '2023-07-10 14:07:28', NULL, '2023-07-10 14:07:06', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Conteudo`
--

DROP TABLE IF EXISTS `Conteudo`;
CREATE TABLE IF NOT EXISTS `Conteudo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint(20) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` longtext DEFAULT NULL,
  `slug` mediumtext NOT NULL,
  `imagem_capa` varchar(255) NOT NULL,
  `imagem_miniatura` varchar(255) NOT NULL,
  `imagem_banner` varchar(255) NOT NULL,
  `publicado` tinyint(1) NOT NULL,
  `selecao` tinyint(1) NOT NULL,
  `premium` tinyint(1) NOT NULL,
  `moderada` tinyint(1) NOT NULL,
  `id_usuario_operacao` bigint(20) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Conteúdos';

--
-- Dumping data for table `Conteudo`
--

INSERT INTO `Conteudo` (`id`, `id_usuario`, `nome`, `descricao`, `slug`, `imagem_capa`, `imagem_miniatura`, `imagem_banner`, `publicado`, `selecao`, `premium`, `moderada`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(2, 20, 'Tentativa de update', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 1, 1, 1, 20, '2023-07-16 22:21:47', '2023-07-16 22:46:19', '2023-07-16 13:07:54'),
(3, 20, 'Conteúdo 2', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 1, 1, 1, 20, NULL, NULL, '2023-07-16 23:44:42'),
(4, 20, 'Conteúdo 3', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 1, 1, 1, 20, NULL, NULL, '2023-07-16 23:48:12'),
(5, 20, 'Tentativa de update do conteúdo 5', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 1, 1, 1, 20, '2023-07-16 23:50:11', NULL, '2023-07-16 23:48:21'),
(6, 20, 'Conteúdo 3', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:11:59'),
(7, 20, 'Conteúdo 4', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:06'),
(8, 20, 'Conteúdo 5', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:11'),
(9, 20, 'Conteúdo 6', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:42'),
(10, 20, 'Conteúdo 7', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:47'),
(11, 20, 'Conteúdo 8', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:50'),
(12, 20, 'Conteúdo 9', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:12:55'),
(13, 20, 'Conteúdo 10', 'As aventuras do NodeJS', 'as-aventuras-do-nodejs', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/cover.jpg?time=1683665207', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/banner.jpg?time=1683665207', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-18 00:13:00');

-- --------------------------------------------------------

--
-- Table structure for table `Conteudo__Selo`
--

DROP TABLE IF EXISTS `Conteudo__Selo`;
CREATE TABLE IF NOT EXISTS `Conteudo__Selo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_conteudo` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_conteudo` (`id_conteudo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Associação Conteúdo (n) - Selo (n)';

-- --------------------------------------------------------

--
-- Table structure for table `Conteudo__Vitrine_Conteudo`
--

DROP TABLE IF EXISTS `Conteudo__Vitrine_Conteudo`;
CREATE TABLE IF NOT EXISTS `Conteudo__Vitrine_Conteudo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_conteudo` int(11) NOT NULL,
  `id_vitrine_conteudo` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `ordem` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_conteudo` (`id_conteudo`),
  KEY `id_vitrine_conteudo` (`id_vitrine_conteudo`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Relação entre Conteúdo (n) - Vitrine_Conteudo (n)';

--
-- Dumping data for table `Conteudo__Vitrine_Conteudo`
--

INSERT INTO `Conteudo__Vitrine_Conteudo` (`id`, `id_conteudo`, `id_vitrine_conteudo`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `ordem`) VALUES
(2, 3, 9, 20, '2023-07-18 00:17:46', NULL, '2023-07-17 19:07:38', 10),
(3, 2, 9, 20, '2023-07-17 23:29:09', NULL, '2023-07-17 19:08:51', 2),
(4, 4, 12, 20, NULL, NULL, '2023-07-17 22:37:08', 0),
(5, 5, 11, 20, '2023-07-18 01:34:01', NULL, '2023-07-17 22:37:25', 10),
(8, 6, 13, 20, NULL, NULL, '2023-07-18 00:24:57', 5),
(9, 7, 14, 20, NULL, NULL, '2023-07-18 00:25:36', 5),
(10, 8, 14, 20, NULL, NULL, '2023-07-18 00:25:46', 5),
(11, 9, 12, 20, NULL, NULL, '2023-07-18 00:26:21', 5),
(12, 10, 13, 20, NULL, NULL, '2023-07-18 00:28:19', 5),
(13, 11, 11, 20, NULL, NULL, '2023-07-18 00:28:33', 5),
(14, 12, 14, 20, NULL, NULL, '2023-07-18 01:34:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Cupom`
--

DROP TABLE IF EXISTS `Cupom`;
CREATE TABLE IF NOT EXISTS `Cupom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `limite_uso` int(11) NOT NULL,
  `qtd_usado` int(11) DEFAULT NULL,
  `qtd_dias` int(11) NOT NULL,
  `data_validade` date DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Cupom';

--
-- Dumping data for table `Cupom`
--

INSERT INTO `Cupom` (`id`, `nome`, `codigo`, `limite_uso`, `qtd_usado`, `qtd_dias`, `data_validade`, `ativo`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, '1 lugar FATECON', 'FATECON23-1', 1, NULL, 180, '2023-06-30', 1, NULL, NULL, NULL, '2023-05-18 19:03:07'),
(2, '2 lugar FATECON', 'FATECON23-2', 1, NULL, 180, '2023-06-30', 1, NULL, NULL, NULL, '2023-05-18 19:19:37'),
(3, '3 lugar FATECON', 'FATECON23-3', 1, NULL, 180, '2023-06-30', 1, NULL, NULL, NULL, '2023-05-18 19:24:49'),
(4, 'Free Comic Book Day', 'FNKTN', 20000, NULL, 1, '2023-05-14', 1, NULL, NULL, NULL, '2023-05-18 19:27:13'),
(5, 'Fora do Plástico - Seguidores', 'FORADOPICOLE', 42, NULL, 31, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:29:40'),
(6, 'Fora do Plástico - Uso Único', 'FDPNOPICOLE', 0, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:31:09'),
(7, 'AfroNerd - Seguidores', 'PICOLEAFRO', 50, NULL, 31, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:33:42'),
(8, 'AfroNerd - Uso Único', 'THIAGONOPICOLE', 1, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:35:14'),
(9, 'Brush Rush - Seguidores', 'PICOLERUSH', 100, NULL, 31, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:36:42'),
(10, 'Brush Rush - Uso Único', 'GULHERMENOPICOLE', 0, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:37:22'),
(11, 'Nerd AllStars - Seguidores', 'PICOLEALLSTARS', 100, NULL, 31, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:38:16'),
(12, 'Nerd AllStars - Uso Único', 'RINONOPICOLÉ', 1, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:39:24'),
(13, 'A Batcaverna - Seguidores', 'BATPICOLE', 43, NULL, 30, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:39:24'),
(14, 'A Batcaverna - Uso Único', 'MARCELONOPICOLE', 0, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:42:06'),
(15, 'Mina de HQ - Seguidores', 'MINADEPICOLE', 50, NULL, 31, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:42:06'),
(16, 'Mina de HQ - Uso Único', 'GABINOPICOLE', 0, NULL, 360, '2023-05-31', 1, NULL, NULL, NULL, '2023-05-18 19:44:17'),
(17, 'Páscoa', 'COELHINHO', 8000, NULL, 3, '2023-04-09', 1, NULL, NULL, NULL, '2023-05-18 19:44:17'),
(18, 'Pro Guilherme Ler Guará', 'KROLLLEIAGUARA', 1, NULL, 15, '2023-04-01', 1, NULL, NULL, NULL, '2023-05-18 19:45:31'),
(19, 'Parceiros de Mídia', 'PARCEIRO2023', 49, NULL, 300, '2023-04-29', 1, NULL, NULL, NULL, '2023-05-18 19:45:31'),
(20, 'Presente de Aniversário da Sâmela', 'PRESENTEDASAMELA', 0, NULL, 30, '2023-03-17', 1, NULL, NULL, NULL, '2023-05-18 19:48:08'),
(21, 'E-mail de lançamento', 'CHEGUEIPRIMEIRO', 3979, NULL, 7, '2023-03-16', 1, NULL, NULL, NULL, '2023-05-18 19:48:08'),
(22, 'Discord', 'DISCORDO', 498, NULL, 7, '2023-03-11', 1, NULL, NULL, NULL, '2023-05-18 19:49:43'),
(23, 'Cerveja Grátis', 'CERVEJAGRATIS', 1000, NULL, 14, '2023-03-12', 1, NULL, NULL, NULL, '2023-05-18 19:49:43'),
(24, 'Time Guará', 'SEMTANGENTE', 33, NULL, 90, '2023-03-25', 1, NULL, NULL, NULL, '2023-05-18 19:51:20'),
(25, 'GUARÁ', 'GUARÁ', 1000, NULL, 90, '2023-04-29', 1, NULL, NULL, NULL, '2023-05-18 19:51:20'),
(26, 'Mundo dos Super-Heróis', 'K7I2V4E7', 1, NULL, 90, NULL, 1, NULL, '2023-05-18 19:51:23', '2023-05-18 19:51:23', '2023-05-18 19:52:08'),
(27, 'Ursinhos Carinhosos', 'URSOFUNK', 11, NULL, 60, NULL, 1, NULL, NULL, NULL, '2023-05-18 19:54:48'),
(28, 'Funktoonnnn', ' FUNKTOON2024', 120, NULL, 50, '2024-12-30', 0, 15, NULL, '2023-05-31 17:27:06', '2023-05-31 14:17:06'),
(29, 'Funktoon Sale', ' FUNKTOON2023', 100, NULL, 30, '2023-12-30', 1, 10, NULL, NULL, '2023-06-27 10:49:37'),
(30, 'Funktoon Sale', ' FUNKTOON2023', 100, NULL, 30, '2023-12-30', 1, 152, NULL, NULL, '2023-06-27 10:49:47');

-- --------------------------------------------------------

--
-- Table structure for table `Denuncia`
--

DROP TABLE IF EXISTS `Denuncia`;
CREATE TABLE IF NOT EXISTS `Denuncia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_tipo_denuncia` tinyint(4) NOT NULL,
  `descricao` longtext NOT NULL,
  `id_episodio` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_denuncia` (`id_tipo_denuncia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Deníncias';

-- --------------------------------------------------------

--
-- Table structure for table `Episodio`
--

DROP TABLE IF EXISTS `Episodio`;
CREATE TABLE IF NOT EXISTS `Episodio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` mediumtext NOT NULL,
  `id_conteudo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `publicado` tinyint(1) NOT NULL,
  `data_publicacao` date NOT NULL,
  `ordem` int(11) NOT NULL,
  `premium` tinyint(1) NOT NULL,
  `view` int(11) NOT NULL,
  `curtida` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `thumb` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_conteudo` (`id_conteudo`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Episódios';

--
-- Dumping data for table `Episodio`
--

INSERT INTO `Episodio` (`id`, `nome`, `id_conteudo`, `id_usuario`, `publicado`, `data_publicacao`, `ordem`, `premium`, `view`, `curtida`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `thumb`) VALUES
(3, 'O episódio 3', 2, 20, 1, '2023-12-30', 56, 0, 0, 0, 20, '2023-07-16 23:43:16', NULL, '2023-07-17 01:50:09', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(4, 'O episódio 1', 2, 20, 1, '2023-12-29', 0, 0, 0, 0, 20, NULL, NULL, '2023-07-17 01:50:57', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(5, 'O episódio 2', 2, 20, 1, '2023-12-29', 0, 0, 0, 0, 20, NULL, NULL, '2023-07-17 01:51:01', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(6, 'O episódio 6', 2, 20, 1, '2023-12-30', 56, 0, 0, 0, 20, '2023-07-16 23:43:39', NULL, '2023-07-17 01:57:40', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(7, 'O episódio 2', 2, 20, 1, '2023-12-29', 0, 0, 0, 0, 20, NULL, NULL, '2023-07-17 02:01:17', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(8, 'O episódio 2', 2, 20, 1, '2023-12-29', 0, 0, 0, 0, 20, NULL, NULL, '2023-07-17 02:06:34', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(9, 'O episódio 3', 2, 20, 1, '2023-12-29', 0, 0, 0, 0, 20, NULL, NULL, '2023-07-17 02:07:10', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(10, 'O episódio 5', 2, 20, 1, '2023-12-29', 5, 0, 0, 0, 20, NULL, NULL, '2023-07-17 02:08:11', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358'),
(11, 'O episódio 1', 3, 20, 1, '2023-12-29', 1, 0, 0, 0, 20, NULL, NULL, '2023-07-17 02:45:15', 'https://d34oo2ynf8ecvf.cloudfront.net/production/author-5031/serie-75/comic-808/thumbnail.jpg?time=1677612358');

-- --------------------------------------------------------

--
-- Table structure for table `Episodio__Imagem`
--

DROP TABLE IF EXISTS `Episodio__Imagem`;
CREATE TABLE IF NOT EXISTS `Episodio__Imagem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `episodio_id` int(11) NOT NULL,
  `order` tinyint(4) NOT NULL,
  `url` varchar(255) NOT NULL,
  `url_storage` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `episodio_id` (`episodio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Episodio__Selo`
--

DROP TABLE IF EXISTS `Episodio__Selo`;
CREATE TABLE IF NOT EXISTS `Episodio__Selo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_episodio` int(11) NOT NULL,
  `id_selo` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_episodio` (`id_episodio`),
  KEY `id_selo` (`id_selo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Relacao Episódio (n) - Selo (n)';

-- --------------------------------------------------------

--
-- Table structure for table `Favorito`
--

DROP TABLE IF EXISTS `Favorito`;
CREATE TABLE IF NOT EXISTS `Favorito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_episodio` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_episodio` (`id_episodio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Favoritos';

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
CREATE TABLE IF NOT EXISTS `Log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tabela` varchar(255) NOT NULL,
  `id_tabela` int(11) NOT NULL,
  `comando` mediumtext NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Logs';

-- --------------------------------------------------------

--
-- Table structure for table `Politica`
--

DROP TABLE IF EXISTS `Politica`;
CREATE TABLE IF NOT EXISTS `Politica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_politica` tinyint(4) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` longtext NOT NULL,
  `versao` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Politica';

--
-- Dumping data for table `Politica`
--

INSERT INTO `Politica` (`id`, `id_tipo_politica`, `nome`, `descricao`, `versao`, `ativo`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, 1, 'Política de privacidade e Cookies', 'POLÍTICA DE PRIVACIDADE\r\n\r\nFUNKTOON\r\n\r\nÚltima atualização: 09 de fevereiro de 2023\r\n\r\nOlá! Nossas boas-vindas ao FUNKTOON!\r\n\r\nQuando você usa FUNKTOON, você nos confia seus dados pessoais. Nosso compromisso é mantê-los em segurança.\r\n\r\nEsta Política de Privacidade (neste documento a “Política”) detalha como esses dados serão coletados, armazenados, usados e compartilhados no FUNKTOON. Você compreende e concorda que o uso do FUNKTOON envolve a coleta de informações e dados pessoais nos termos descritos nesta Política, incluindo a transferência desses dados para servidores externos, para fins de armazenamento, processamento e uso para os fins detalhados a seguir. Se você usar qualquer serviço do FUNKTOON, você declara automaticamente que leu, compreendeu e concordou expressamente com esta Política, que integra nossos Termos de Uso.\r\n\r\nDe acordo com o disposto no artigo 41 da Lei nº 13.709/2018 (“Lei Geral de Proteção de Dados” ou “LGPD”), o FUNKTOON indica Raphael Câmara Pinheiro Granda, Editor-Chefe, como pessoa encarregada pelo tratamento de dados, sendo possível o contato através do seguinte e-mail: raphapinheiro@universoguara.com.br.\r\n\r\n1. Que dados coletamos no FUNKTOON?\r\n\r\n1.1	Dados coletados: Quando você usa o FUNKTOON, as seguintes informações podem ser coletadas:\r\n\r\nDados de cadastro - Quando se cadastra no FUNKTOON, você nos fornece seu nome, e-mail e senha. Para que você possa usar determinados serviços, podemos solicitar dados adicionais, tais como CPF, endereço, data de nascimento e telefone, entre outros.\r\nRegistros de acesso - Nós coletamos automaticamente informações relacionadas ao acesso ao nosso website e ao nosso aplicativo, tais como o seu endereço IP, com data e hora, usado para acessar o FUNKTOON. Esses dados são de coleta obrigatória, de acordo com a Lei 12.965/2014, mas somente serão fornecidos para terceiros com a sua autorização expressa ou por determinação judicial.\r\nDados de uso - Nós coletamos automaticamente informações sobre suas ações no FUNKTOON, como sua navegação, os conteúdos que você acessa, os recursos que você usa, suas buscas, entre outras.\r\nDados de pagamento - Quando você realiza pagamentos no FUNKTOON, poderão ser armazenados dados do pagamento, como a data e hora, o valor e outros detalhes da transação, que poderão ser utilizados inclusive para fins de prevenção à fraude, não havendo qualquer retenção de informações relativas a dados do seu cartão de crédito. Desta forma, poderemos lhe proporcionar um ambiente seguro e adequado para você realizar as suas transações.\r\nCaracterísticas do dispositivo - Para funcionar adequadamente, nós coletamos automaticamente dados sobre o seu dispositivo, tais como sistema operacional, navegador, sinal de internet, nível de bateria, idioma e outras informações relacionadas a hardware.\r\nComunicações com o FUNKTOON - Quando você se comunica com o FUNKTOON, nós coletamos informações contidas na sua comunicação, tais como IP, data e hora da comunicação e outros metadados, assim como o conteúdo da comunicação e qualquer outra informação que você tenha escolhido fornecer.\r\nCookies e tecnologias semelhantes - Nós utilizamos cookies, que são arquivos de texto gerados e armazenados no seu dispositivo, de acordo com a nossa Política de Cookies, prevista na Seção 6 deste documento.\r\nDados de localização do dispositivo conectado - Caso você nos autorize durante determinado acesso, nós poderemos coletar dados de localização, que são fornecidas pelo dispositivo conectado. A sua autorização para compartilhar a sua localização poderá ser revogada a qualquer momento, mas isso poderá desativar determinadas funcionalidades do FUNKTOON.\r\nInformações provenientes de outros usuários - Outros usuários do FUNKTOON podem produzir informações sobre você, caso você seja titular de direitos sobre determinado conteúdo publicado no FUNKTOON e seja representado por tais usuários.\r\n\r\n1.2	Forma de coleta: Essas informações poderão ser coletadas no FUNKTOON das seguintes formas: (a) por meio de formulário, preenchidos livremente por você; (b) por meio de tecnologias de coleta configuradas no navegador usado para acessar o FUNKTOON ou no nosso aplicativo; (c) por meio do armazenamento de um cookie no seu dispositivo.\r\n\r\n2. Como usamos os seus dados?\r\n\r\nPrezamos pela sua privacidade. Ao usar os dados coletados por meio do nosso site e do nosso aplicativo, nós nos comprometemos a processá-los de maneira consistente com as finalidades para as quais foram coletados. Por isso, todos os seus dados pessoais serão tratados como informações confidenciais e serão usados exclusivamente para os fins descritos nesta Política e autorizados por você, sempre com o objetivo de permitir que você use o FUNKTOON plenamente e melhorar a sua experiência como usuário.\r\n\r\n2.1	Usos autorizados: Seus dados poderão ser usados para:\r\n\r\nPermitir que você acesse e use todas as funcionalidades do FUNKTOON;\r\nEnviar mensagens a respeito de suporte ou serviço, como alertas, notificações e atualizações;\r\nNos comunicar com sobre produtos, serviços, promoções, notícias, atualizações, eventos e outros assuntos que você possa ter interesse;\r\nAnalisar o tráfego dos usuários em nosso site e em nosso aplicativo;\r\nPersonalizar o serviço para adequá-lo cada vez mais aos seus gostos e interesses;\r\nCriarmos serviços, produtos e funcionalidades;\r\nDetecção e prevenção de fraudes, spam e incidentes de segurança;\r\nVerificar ou autenticar as informações fornecidas por você, inclusive comparando a dados coletados de outras fontes;\r\nEntender melhor o comportamento do usuário e construir perfis comportamentais;\r\nOferecer anúncios relevantes, de acordo com os seus interesses;\r\nQualquer fim que você autorizar no momento da coleta de dados;\r\nCumprir obrigações legais.\r\n\r\nExcepcionalmente, determinados dados poderão ser usados para finalidades que não estejam expressamente previstas nesta Política, desde que dentro das suas legítimas expectativas, de acordo com a natureza dos nossos serviços. Qualquer outro uso de seus dados dependerá de sua autorização prévia.\r\n\r\n2.2	Exclusão dos dados: Todos os dados relacionados a você que tivermos coletado serão excluídos de nossos servidores se você assim solicitar ou quando estes não forem mais necessários ou relevantes para lhe oferecermos os nossos serviços, a não ser que exista outra razão para a sua manutenção (por exemplo, eventual obrigação legal de retenção de dados ou necessidade de preservação destes para resguardo de nossos direitos). Nos casos de solicitação de exclusão dos seus dados, ela será feita prontamente, dentro das nossas capacidades administrativas.\r\n\r\n2.3	Monitoramento: Nós nos reservamos o direito de monitorar toda a plataforma, principalmente para assegurar que as regras descritas em nosso Termos de Uso estão sendo observadas, ou ainda se não há violação ou abuso das leis aplicáveis.\r\n\r\n2.4	Exclusão de usuário: Nós nos reservamos o direito de excluir qualquer usuário se constatar violação à presente Política ou aos Termos de Uso. Como prezamos pelo bom relacionamento com os nossos usuários, reconhecemos que têm, nessa hipótese, o direito de buscar entender os motivos da exclusão e até contestá-los, o que pode ser feito pelo seguinte e-mail: contato@universoguara.com.br.\r\n\r\n3. Como compartilhamos suas informações?\r\n\r\nAs informações de que trata esta Política poderão eventualmente ser compartilhadas com nossos parceiros, desde que estes se comprometam a usá-las de modo consistente com a finalidade para a qual os dados tenham sido coletados, de acordo com esta Política.\r\n\r\nNão compartilhamos informações que identifiquem você diretamente (como nome ou endereço de email, que alguém pode usar para entrar em contato com você ou verificar sua identidade), a menos que você nos dê permissão específica.\r\n\r\nContudo, todos os dados, conteúdos e demais informações sobre você mencionados nesta Política podem ser considerados ativos da empresa controladora do FUNKTOON. Portanto, você reconhece e concorda que, na hipótese em que tal empresa venha a ser vendida, adquirida ou fundida com outra, tais informações poderão ser transferidas aos terceiros envolvidos nessas operações.\r\n\r\nNós nos reservamos o direito de fornecer seus dados e informações sobre você, incluindo interações suas, caso seja requisitado judicialmente para tanto, ato necessário para que a empresa esteja em conformidade com as leis nacionais, ou caso você autorize expressamente.\r\n\r\n4. Quais são os seus direitos?\r\n\r\nVocê sempre poderá optar em não divulgar seus dados para nós, mas tenha em mente que alguns desses dados podem ser necessários para utilizar as funcionalidades do nosso website e do nosso aplicativo. Independentemente disso, você sempre terá preservados seus direitos relativos à privacidade e à proteção dos seus dados pessoais.\r\n\r\nDessa forma, resumimos a seguir todos os direitos que você tem sob as leis setoriais brasileiras relativas à proteção de dados e a LGPD, quais sejam:\r\n\r\n4.1	Direito de acesso: Você pode requisitar e receber uma cópia dos dados pessoais que possuímos sobre você.\r\n\r\n4.2	Direito de retificação: Você pode, a qualquer momento, solicitar a correção dos seus dados pessoais, caso identifique que qualquer um deles está incorreto. Contudo, para ser efetivada essa correção, teremos que checar a validade dos dados que você nos fornece. Para alterar suas informações, entre em contato conosco pelo e-mail contato@universoguara.com.br.\r\n\r\n4.3	Direito de exclusão: Você pode nos solicitar a exclusão dos dados pessoais que possuímos sobre você. Todos os dados coletados serão excluídos de nossos servidores quando você assim requisitar ou quando estes não forem mais necessários ou relevantes para lhe oferecermos nossos serviços, salvo se houver qualquer outra razão para a sua manutenção, como eventual obrigação legal de retenção de dados ou necessidade de preservação destes para resguardo dos nossos direitos. Para solicitar a exclusão das suas informações, entre em contato conosco pelo e-mail contato@universoguara.com.br.\r\n\r\n4.4	Direito de oposição ao processamento: Você pode contestar onde e em que contexto estamos tratando seus dados pessoais para diferentes finalidades. Em determinadas situações, podemos demonstrar que temos motivos legítimos para tratar seus dados, os quais se sobrepõem aos seus direitos, caso, por exemplo, sejam essenciais para o fornecimento de nossas aplicações.\r\n\r\n4.5	Direito de solicitar anonimização, bloqueio ou eliminação: Você pode nos pedir para suspender o processamento de seus dados pessoais nos seguintes cenários: (a) se você quiser que nós estabeleçamos a precisão dos dados; (b) quando você precisar que sejam mantidos os dados mesmo se não precisarmos mais deles, conforme necessário, para estabelecer, exercer ou defender reivindicações legais; ou (c) se você se opôs ao uso de seus dados, mas nesta hipótese precisamos verificar se temos motivos legítimos para usá-los.\r\n\r\n4.6	Direito à portabilidade: Você pode pedir para que lhe forneçamos, ou a terceiro que você indicar, seus dados pessoais em formato estruturado e interoperável.\r\n\r\n4.7	Direito de retirar o seu consentimento. Você pode retirar o seu consentimento em relação aos termos desta Política. No entanto, isso não afetará a legalidade de qualquer processamento realizado anteriormente. Se você retirar o seu consentimento, talvez não possamos fornecer determinados serviços.\r\n\r\n4.8	Direito à revisão de decisões automatizadas: Você também tem o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de seus dados pessoais que afetem seus interesses, incluídas as decisões destinadas a definição de perfis pessoais, profissionais, de consumo e de crédito e/ou os aspectos de sua personalidade.\r\n\r\nTalvez seja necessário solicitar informações específicas suas para nos ajudar a confirmar sua identidade e garantir seu direito de acessar seus dados pessoais (ou de exercer seus outros direitos). Esta é uma medida de segurança para garantir que os dados pessoais não sejam divulgados a qualquer pessoa que não tenha direito de recebê-los. Podemos também contatá-lo para obter mais informações em relação à sua solicitação, a fim de acelerar nossa resposta. Tentamos responder a todas as solicitações legítimas dentro de 5 dias úteis. Ocasionalmente, pode levar mais de 5 dias se sua solicitação for particularmente complexa ou se você tiver feito várias solicitações. Neste caso, iremos comunicá-lo e mantê-lo atualizado sobre o andamento da sua solicitação.\r\n\r\nCaso você tenha alguma dúvida sobre essas questões e sobre como você pode exercer esses direitos, fique à vontade para entrar em contato conosco pelo e-mail contato@universoguara.com.br.\r\n\r\n5. Como garantimos a segurança das suas informações?\r\n\r\nTodos os seus dados são confidenciais e somente as pessoas com as devidas autorizações terão acesso a eles. Qualquer uso destes estará de acordo com a presente Política. Nós empreenderemos todos os esforços razoáveis de mercado para garantir a segurança dos nossos sistemas e dos seus dados. Nossos servidores estão localizados em diferentes locais para garantir estabilidade e segurança, e somente podem ser acessados por meio de canais de comunicação previamente autorizados.\r\n\r\nTodas as suas informações serão, sempre que possível, criptografadas, caso não inviabilizem o seu uso no FUNKTOON. A qualquer momento você poderá requisitar cópia dos seus dados armazenados em nossos sistemas. Manteremos os dados e informações somente até quando estas forem necessárias ou relevantes para as finalidades descritas nesta Política, ou em caso de períodos pré-determinados por lei, ou até quando estas forem necessárias para a manutenção dos nossos legítimos interesses.\r\n\r\nNós consideramos a sua privacidade algo extremamente importante e faremos tudo que estiver ao nosso alcance para protegê-la. Todavia, não temos como garantir que todos os dados e informações sobre você em nossa plataforma estarão livres de acessos não autorizados, principalmente caso haja compartilhamento indevido das credenciais necessárias para acessar o FUNKTOON. Portanto, você é o único responsável por manter sua senha de acesso em local seguro e é vedado o compartilhamento desta com terceiros. Você se compromete a nos notificar imediatamente, através de meio seguro, a respeito de qualquer uso não autorizado de sua conta, bem como o acesso não autorizado por terceiros a esta.\r\n\r\n6. Qual é a Política de Cookies do FUNKTOON?\r\n\r\n6.1. O que são cookies?\r\n\r\nUm cookie é um arquivo de texto armazenado no seu computador ou dispositivo móvel que contém informações que identificam o seu navegador ou dispositivo, permitindo que um website ou aplicativo “se lembre” de suas ações ou preferências.\r\n\r\n6.2. Por que usamos cookies?\r\n\r\nUsamos cookies e tecnologias semelhantes, como armazenamento local e pixels, para aprender como você interage com o nosso conteúdo, para mostrar conteúdo relevante para você, para melhorar a sua experiência ao usar o FUNKTOON e para proteger o FUNKTOON e os nossos usuários.\r\n\r\nPodemos usar essas tecnologias para: (i) permitir que você use o FUNKTOON, acessando áreas seguras e armazenando informações necessárias ao funcionamento de suas funcionalidades; (ii) coletar informações sobre como você usa o FUNKTOON e sobre que recursos e conteúdos você acessa com mais frequência; (iii) memorizar as suas preferências para que você não tenha que configurá-las sempre que usar o FUNKTOON, retomá-las quando você acessar o FUNKTOON e personalizar o FUNKTOON para fornecer conteúdo e recursos aprimorados para você; (iv) empregar o que aprendemos sobre o seu comportamento no FUNKTOON para oferecer anúncios relevantes, de acordo com os seus interesses, dentro do próprio FUNKTOON ou em serviços de terceiros ou para reapresentar os nossos produtos e serviços para você. Essas informações podem ser compartilhadas com anunciantes, redes de anunciantes e outras organizações fora do FUNKTOON, para que possam veicular anúncios ou ajudar a mensurar a eficácia de uma campanha publicitária.\r\n\r\n6.3. Como usamos cookies com relação à apresentação de anúncios?\r\n\r\nUsamos cookies, pixels e tecnologias semelhantes para oferecer anúncios relevantes, de acordo com os seus interesses. Essas tecnologias coletam dados relacionados ao seu comportamento para o direcionamento de anúncios relacionados aos seus interesses, a verificam quando determinados anúncios já foram apresentados a você e consolidam dados para a geração de relatórios de desempenho para anunciantes. Nenhuma informação coletada por essas tecnologias é fornecida diretamente para anunciantes de qualquer forma que você possa ser individualizado ou identificado.\r\n\r\n6.4. Por quanto tempo os cookies permanecerão em meu dispositivo?\r\n\r\nO tempo que um cookie permanecerá em seu computador ou dispositivo móvel dependerá da natureza do cookie: “cookie de sessão” ou “cookie persistente”.\r\n\r\nCookies de sessão permanecem em seu computador ou dispositivo móvel até que você feche o navegador ou aplicativo. São esses os cookies que usamos para memorizar as suas informações durante o curso de determinado acesso ao FUNKTOON.\r\n\r\nCookies persistentes permanecem em seu computador ou dispositivo móvel mesmo depois de você fechar o navegador ou aplicativo, ainda que venha a reiniciar o seu dispositivo, até expirarem ou serem excluídos. São esses os cookies que usamos para memorizar suas preferências ao longo de várias sessões, para analisar o seu comportamento, para oferecer anúncios segmentados e medir a eficiência de tais anúncios.\r\n\r\n6.5. Como são usados cookies de terceiros?\r\n\r\nEm alguns casos, podemos usar no FUNKTOON cookies que pertencem e são administrados por outras empresas, tais como os nossos parceiros de negócios ou provedores de serviços. Esses cookies podem ser colocados em seu dispositivo por alguém que forneça ao FUNKTOON serviços relacionados a publicidade e analytics, para que possamos oferecer anúncios relevantes e analisar como o nosso website e aplicativo estão sendo usados, com o objetivo de nos ajudar a melhorar a sua experiência. Os cookies de terceiros também podem ser colocados em seu dispositivo por nossos parceiros de negócios para que eles possam usá-los para anunciar produtos e serviços para você fora do FUNKTOON.\r\n\r\n6.6. Como você pode controlar os cookies?\r\n\r\nA maioria dos navegadores aceitam cookies automaticamente. Apesar disso, você pode configurar o seu navegador para alterar as suas preferências, o que poderá fazer com que determinados cookies sejam bloqueados. Além disso, você pode apagar os cookies armazenados em seu dispositivo a qualquer momento. Se você bloquear o uso de cookies ou outras tecnologias, talvez não seja possível acessar algumas partes do FUNKTOON, e outras partes do FUNKTOON talvez não funcionem como pretendido.\r\n\r\nAcesse o site www.allaboutcookies.org para aprender como apagar ou bloquear cookies e para obter informações adicionais sobre cookies em geral.\r\n\r\n7. O que mais devo saber sobre esta Política?\r\n\r\n7.1	Alterações: Nós nos reservamos o direito de alterar essa Política sempre que entendermos necessário, objetivando garantir mais segurança e conveniência no uso do FUNKTOON. Quando forem efetuadas alterações, a data da última atualização, na parte superior deste documento, será revista e alterada e as alterações entrarão em vigor imediatamente na data de atualização. Caso você não concorde com a nova Política, você poderá rejeitá-la, mas, infelizmente, isso significa que você não poderá mais ter acesso e fazer uso do FUNKTOON. Se de qualquer maneira você utilizar o FUNKTOON mesmo após a alteração desta Política, isso significa que você concorda com todas as modificações.\r\n\r\n7.2	Lei aplicável: O uso do FUNKTOON estará sempre, em qualquer hipótese e independentemente do local de onde você o esteja acessando, sujeito à legislação brasileira. Apesar disso, reconhecendo o alcance mundial da Internet, você concorda em cumprir toda e qualquer disposição normativa que disponha sobre a sua conduta ou sobre conteúdo aceitável, comprometendo-se a observar a legislação aplicável do país no qual estiver localizado.\r\n\r\n7.3	Foro: Você concorda que qualquer disputa ou reivindicação relacionada à Política será submetida ao foro da comarca do Rio de Janeiro, renunciando a qualquer outro, por mais privilegiado que seja.', 1, 1, NULL, NULL, NULL, '2023-05-18 18:39:46');
INSERT INTO `Politica` (`id`, `id_tipo_politica`, `nome`, `descricao`, `versao`, `ativo`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(2, 2, 'Termos de uso', 'TERMOS DE USO\r\n\r\nFUNKTOON\r\n\r\nÚltima atualização: 02 de março de 2023.\r\n\r\nOlá! Nossas boas-vindas ao FUNKTOON!\r\n\r\nEste documento estabelece as condições que você deve respeitar para usar o FUNKTOON. Se você usar qualquer serviço do FUNKTOON, você declara automaticamente que leu, compreendeu e concordou expressamente com (1) estes Termos de Uso, (2) a Política de Privacidade e quaisquer outras políticas relacionadas ao FUNKTOON que venham a ser publicadas por nós, que constituem parte integrante destes Termos de Uso. Você deve revisar com atenção todos esses documentos (neste documento o “Acordo”).\r\n\r\n1. O que é o FUNKTOON?\r\n\r\nO FUNKTOON foi criado para distribuir quadrinhos brasileiros. O FUNKTOON oferece aos seus usuários, por meio de suas plataformas, o acesso a diferentes funcionalidades, incluindo ler histórias em quadrinhos gratuitas ou mediante pagamento, curti-las e comentá-las, buscar, comprar, baixar e transmitir conteúdos, publicar séries de histórias em quadrinhos originais e gerenciar seus conteúdos e preferências em geral. O FUNKTOON oferece todos esses serviços (neste documento os “Serviços” ou o “FUNKTOON”) por meio do site https://funktoon.com/ (neste documento o “Site FUNKTOON”) e de aplicativos nativos para diferentes dispositivos, tais como smartphones, tablets, desktops, entre outros (neste documento o “Aplicativo FUNKTOON”).\r\n\r\nOs quadrinhos do FUNKTOON (neste documento as “Séries”) são disponibilizados em forma de webcomics ou histórias em quadrinhos digitalizadas, incluindo edições únicas e publicações comerciais, podendo conter outros conteúdos digitais, incluindo animações e efeitos sonoros.\r\n\r\nQualquer novo recurso que aprimore o FUNKTOON, incluindo novos serviços e funcionalidades, estará automaticamente sujeito ao Acordo.\r\n\r\nO Site FUNKTOON, o Aplicativo FUNKTOON, seu conteúdo e todos os Serviços são controlados e operados pela FUNKTOON MÍDIA LTDA., inscrita no CNPJ sob o n.º 47.349.419/0001-17 (neste documento simplesmente “nós”).\r\n\r\n2. Como acessar o FUNKTOON?\r\n\r\n2.1 Acesso: Qualquer pessoa física ou jurídica que queira acessar o FUNKTOON e usar os Serviços (neste documento um “Usuário”) deverá criar uma conta de Usuário. Ao criar sua conta de Usuário, você se compromete a nos fornecer informações verdadeiras e completas, incluindo dados pessoais, de acordo com a nossa Política de Privacidade.\r\n\r\n2.2 Idade: Para usar o FUNKTOON, você deve ter pelo menos 14 (quatorze) anos de idade ou a idade mínima legal em seu país. Se você não tiver atingido a maioridade legal em seu país (18 (dezoito) anos de idade no Brasil), você só pode usar o FUNKTOON com o consentimento de seus pais ou responsáveis legais, que deverão ter conhecimento e concordar com o Acordo.\r\n\r\n2.3 Pessoas jurídicas: Pessoas jurídicas somente poderão se cadastrar por meio de seus representantes legais legitimamente autorizados – os quais respondem civil e criminalmente pela legitimidade da representação –, sendo que a manifestação de vontade do representante produzirá efeitos à pessoa jurídica representada.\r\n\r\n2.4 Conta única: Não é permitido que uma mesma pessoa tenha mais de um cadastro. Se nós detectarmos, por meio do sistema de verificação de dados, cadastros duplicados, nós poderemos os unificar ou inabilitar definitivamente todos os cadastros sem aviso prévio.\r\n\r\n2.5 Titularidade: A partir do momento em que você se cadastrar no FUNKTOON, você será titular de uma conta de Usuário que somente poderá ser acessada por você. Durante o processo de criação de sua conta de Usuário, você deverá escolher uma senha pessoal, comprometendo-se a mantê-la segura e fora do alcance de terceiros. Você se compromete a não permitir que a sua conta seja usada por outras pessoas. Dessa forma, você é o único responsável pela atividade e pelo registro de informações que ocorrem em sua conta.\r\n\r\n2.6 Segurança: Você se compromete a: (a) nos notificar imediatamente de qualquer violação de segurança ou uso não autorizado de sua conta de que tome conhecimento, (b) manter o ambiente de seu dispositivo (computador, celular, tablet, entre outros) seguro, com o uso de ferramentas disponíveis, como antivírus, firewall, entre outras, de modo a contribuir na prevenção de riscos eletrônicos, e (c) se acessar a sua conta de Usuário a partir de um dispositivo que não seja de sua propriedade, sair de sua conta de Usuário ao final de cada sessão, assegurando-se de que sua conta não será acessada por terceiros não autorizados. Você aceita todos os riscos decorrentes de acesso não autorizado e demais ações realizadas por meio da sua conta. Nós não somos responsáveis por suas perdas causadas por qualquer uso não autorizado de sua conta.\r\n\r\n2.8 Contas de outros Usuários: Você nunca poderá usar a conta de outro Usuário sem permissão do titular.\r\n\r\n2.9 Atualização das informações: Você se compromete a manter as informações pessoais da sua conta de Usuário atualizadas, devendo alterá-las no prazo máximo de 7 (sete) dias úteis, sempre que ocorrer alguma alteração, sob pena de responder civil e criminalmente pela veracidade, exatidão e autenticidade dos dados informados.\r\n\r\n2.10 Desativação: Você poderá nos solicitar a qualquer tempo, a desativação definitiva de sua conta e a exclusão dos dados pessoais a ela relacionados, ressalvadas as hipóteses de guarda obrigatória de registros previstas na Lei nº 12.965/2014 (Marco Civil da Internet), na Lei nº 13.709/2018 (Lei Geral da Proteção de Dados) e em outras normas ou os dados agregados e não identificáveis, para fins estatísticos. A desativação da sua conta não excluirá as curtidas e os comentários que você tenha feito em conteúdos disponíveis no FUNKTOON, que permanecerão visíveis para todos os Usuários.\r\n\r\n2.11 Informações adicionais: Nós nos reservamos o direito de utilizar todos os meios válidos e possíveis para identificar seus Usuários, bem como de solicitar dados adicionais e documentos que consideremos pertinentes a fim de verificar a exatidão dos dados pessoais informados. Se checarmos a veracidade dos dados cadastrais de um Usuário e constatarmos que um Usuário apresentou qualquer informação falsa (por exemplo, se alguém que não tenha a idade mínima permitida criar uma conta de Usuário) ou se um Usuário se furtar ou se negar a apresentar as informações solicitadas, nós poderemos suspender temporariamente ou cancelar definitivamente o cadastro do Usuário, sem prejuízo de outras medidas que entendermos convenientes, sem que caiba ao Usuário qualquer tipo de indenização ou ressarcimento.\r\n\r\n2.12 Contas inativas: Nós nos reservamos o direito de desativar contas inativas por um período razoável de tempo.\r\n\r\n3. Que Serviços posso acessar por meio da minha conta de Usuário?\r\n\r\n3.1 Licença: Os Serviços oferecidos por meio do Site FUNKTOON e do Aplicativo FUNKTOON são de nossa propriedade. Ao usar o FUNKTOON e aceitar o Acordo, você está recebendo uma licença de uso, que é não-exclusiva, limitada, revogável e de uso pessoal. Nós nos reservamos todos os direitos não concedidos expressamente a você. É da liberalidade do Usuário realizar qualquer assinatura oferecida por meio do FUNKTOON, sujeito às regras descritas no Acordo.\r\n\r\n3.2 Contas de Usuários: Nós nos reservamos o direito de limitar o acesso a determinados Serviços e conteúdos a determinados tipos de Usuários. O FUNKTOON oferece quatro tipos de contas de Usuários, cada uma delas com acesso a diferentes funcionalidades: (a) Leitor, (b) Leitor Assinante, (c) Autor Indie e (d) Autor Seleções.\r\n\r\n3.3 Leitor: Todo Usuário, depois de se cadastrar no FUNKTOON, começa com uma conta gratuita de Leitor. Se você tiver uma conta gratuita de Leitor, você poderá (a) acessar e ler Séries que estejam disponíveis gratuitamente na plataforma, (b) curtir e compartilhar (de acordo com a Seção 3.9 destes Termos de Uso) Séries que você acessar, (c) publicar comentários com texto, links e imagens nas histórias Séries que você acessar e (d) gerenciar seus dados e preferências em geral.\r\n\r\n3.4 Leitor Assinante\r\n\r\n3.4.1 Serviços disponíveis: Além de ter à sua disposição todos os Serviços oferecidos aos usuários com uma conta gratuita de Leitor, se você se inscrever como Leitor Assinante, poderá acessar e ler todas as Séries publicadas no FUNKTOON, incluindo aquelas disponibilizadas com exclusividades aos Leitores Assinantes. Nós nos reservamos o direito de impedir o acesso aos conteúdos exclusivos para Leitores Assinantes aos Usuários que não estejam em dia com o pagamento de sua assinatura.\r\n\r\n3.4.1 Acesso: Para tornar-se um Leitor Assinante, você deverá realizar assinatura mensal ou anual no FUNKTOON, fornecendo seus dados para cobrança, de acordo com a nossa tabela de preços.\r\n\r\n3.4.2 Pagamento: A assinatura depende do pagamento antecipado para disponibilização dos Serviços exclusivos para Leitor Assinante. Dessa forma, você estará pagando hoje pelo acesso durante o próximo mês corrente. Caso o dia em que o pagamento é efetuado não se repita todos os meses (por exemplo, 31), o pagamento será cobrado no dia útil anterior ao que eventualmente ocorreria caso essa data existisse no mês em questão (por exemplo, 28 ou 30). A assinatura será renovada automaticamente, a não ser que você manifeste-se contrariamente requerendo o cancelamento, antes da data de faturamento. Nunca alteraremos o valor da sua assinatura sem antes avisá-lo. Os pagamentos relacionados a assinaturas estão sujeitos às demais condições previstas na Seção 3.7 destes Termos de Uso.\r\n\r\n3.4.3 Cancelamento. Você pode realizar o cancelamento da assinatura a qualquer tempo pelo Usuário por meio do Aplicativo FUNKTOON. O cancelamento será entendido como manifestação expressa de que você não pretende renovar automaticamente a licença no próximo período ainda não contabilizado para fins de cobrança. O cancelamento não enseja qualquer dever da nossa parte de realizar a devolução do pagamento relativo ao mês corrente. Todas as assinaturas são pré-pagas, então caso você cancele, poderá aproveitar o período mensal restante contratado.\r\n\r\n3.4.4 Exclusão de conteúdos: Em determinados casos, nós e os criadores de determinada Série podemos decidir removê-las do FUNKTOON. Por esse motivo, você compreende e concorda que existe a possibilidade de que determinado conteúdo que ficaria acessível por meio da sua assinatura seja excluído antes que você tenha a oportunidade de acessá-lo.\r\n\r\n3.5 Autor Indie\r\n\r\n3.5.1 Serviços disponíveis: Além de ter à sua disposição todos os Serviços oferecidos aos usuários com uma conta gratuita de Leitor, se você se inscrever como Autor Indie, poderá publicar Séries de que você seja o titular no FUNKTOON, as quais ficarão disponíveis para todos os Usuários que tenham uma conta gratuita de Leitor, observados os termos do Acordo. Um Usuário titular de uma conta de Autor Indie não tem acesso, necessariamente, aos Serviços oferecidos com exclusividade para os Usuários com conta de Leitor Assinante, a menos que ele tenha especificamente contratado uma assinatura nos termos da Seção 3.4 destes Termos de Uso.\r\n\r\n3.5.2 Acesso: Se você quiser publicar Séries no FUNKTOON, você deve cadastrar-se como Autor Indie por meio da opção “QUERO ME TORNAR UM AUTOR” no Site FUNKTOON ou no Aplicativo FUNKTOON. Para tornar-se um Autor Indie no FUNKTOON, você deverá fornecer dados pessoais adicionais.\r\n\r\n3.5.3 Natureza das Séries: De maneira geral, nós não pré-selecionamos as Séries que serão disponibilizadas pelo FUNKTOON, mas nos reservamos o direito de, a nosso exclusivo critério, excluir qualquer Série. Você declara e garante que as Séries que eventualmente publicar no FUNKTOON estão em conformidade com estes Termos de Uso, de acordo com a sua Seção 6.\r\n\r\n3.6 Autor Seleções\r\n\r\n3.6.1 Serviços disponíveis: Além de ter à sua disposição todos os Serviços oferecidos aos usuários com uma conta de Autor Indie, se você for escolhido para se tornar um Autor Seleções, poderá publicar Séries de que você seja o titular no FUNKTOON, podendo o FUNKTOON disponibilizar algumas dessas Séries exclusivamente para os Usuários que tenham uma conta de Leitor Assinante, observados os termos do Acordo.\r\n\r\n3.6.2 Acesso: Apenas criadores especificamente escolhidos pela curadoria do FUNKTOON poderão se tornar Autores Seleções.\r\n\r\n3.6.3 Cancelamento: Tanto o FUNKTOON quanto o Autor Seleções terão o direito de cancelar a participação deste último no programa de Autores Seleções a qualquer momento. Nesse caso, caso suas Séries tenham sido disponibilizadas aos Leitores Assinantes, em respeito aos Usuários que tenham adquirido assinatura em razão de seu interesse em determinada Série, nós nos comprometemos a excluir, dentro do prazo de 01 (um) mês, as Séries do Autor Seleções do FUNKTOON.\r\n\r\n3.7 Pagamentos para o FUNKTOON: Todas as compras no FUNKTOON estarão sujeitas às condições de pagamento previstas nesta Seção.\r\n\r\n3.7.1 Forma de pagamento: Os pagamentos efetuados no FUNKTOON deverão ser realizados dentro do Site FUNKTOON ou do Aplicativo FUNKTOON, por meio de cartão de crédito ou boleto bancário.\r\n\r\n3.7.2 Confirmação: A confirmação do pagamento por meio do Site FUNKTOON ou do Aplicativo FUNKTOON ocorrerá em até 3 (três) dias úteis. O processamento das informações de pagamento e a confirmação do pagamento serão realizados por sistemas de terceiros (por exemplo, instituição financeira ou administradora do cartão de crédito), sendo o Site FUNKTOON ou o Aplicativo FUNKTOON uma mera interface entre o Usuário e esses sistemas.\r\n\r\n3.7.3 Preço final: O preço pago por você é final e não reembolsável. Nós nos reservamos o direito de revisar o preço relativo a todos os Serviços disponibilizados no FUNKTOON a qualquer momento.\r\n\r\n3.7.4 Código promocional: Se criarmos algum código promocional (por exemplo, cupom de desconto), este deve ser usado de forma legal para a finalidade e o público ou Usuário específico a que se destina, seguindo todas suas condições. O código promocional pode ser cancelado caso se verifique que foi transferido, vendido ou utilizado com erro, fraude, ilegalidade ou violação às condições do respectivo código.\r\n\r\n3.8 Anúncios: Nos termos da Seção 6 destes Termos de Uso, podem ser servidos com qualquer conteúdo que você publicar no FUNKTOON anúncios de qualquer um de nossos Serviços ou de terceiras empresas e organizações nos pagam para promover seus produtos e serviços.\r\n\r\n3.9 Compartilhamento de conteúdo: Os conteúdos disponíveis no FUNKTOON só poderão ser compartilhados por meio das ferramentas que oferecemos no próprio FUNKTOON (botão “compartilhar” em cada conteúdo), as quais permitirão o seu compartilhamento nos canais sociais do Usuário (e-mail, WhatsApp, Facebook, Instagram, Twitter, TikTok, entre outros) na forma de links que direcionem para o local onde o seu conteúdo esteja disponível no FUNKTOON, desde que isso não implique a reprodução na íntegra do seu conteúdo em tais canais.\r\n\r\n3.10 Links externos: O FUNKTOON pode conter links para sites de terceiros que não são de propriedade ou controlados por nós. Como nós não temos controle sobre esses sites, não somos responsáveis pela sua disponibilidade, tampouco pelo conteúdo oferecido por terceiros. Esses links são apresentados no FUNKTOON apenas para efeitos de conveniência, mas não implicam afiliação, endosso ou adoção pelo Serviço de qualquer informação contida nesses sites. Você reconhece expressamente que nós não seremos responsáveis por quaisquer prejuízos que venha a sofrer em decorrência do uso desses sites. Esclarecemos que o Acordo não se aplica a sites externos e encorajamos você a tomar conhecimento dos termos de uso e outras políticas desses sites quando acessá-los.\r\n\r\n3.11 Alteração dos Serviços: Nós nos reservamos o direito de, a qualquer tempo, modificar ou descontinuar, temporária ou permanentemente, qualquer aspecto dos Serviços do FUNKTOON, observadas as condições do Acordo, com ou sem notificação prévia aos Usuários.\r\n\r\n4. Quais são as diretrizes gerais que devo respeitar para usar o Funktoon?\r\n\r\n4.1 Condutas proibidas: Nós lhe concedemos permissão para acessar o FUNKTOON e usar seus Serviços, desde que você se abstenha das seguintes condutas, que são terminantemente proibidas:\r\nUsar o FUNKTOON para cometer qualquer ato ilícito, enganoso, fraudulento ou com finalidade ilegal ou não autorizada.\r\nUsar o FUNKTOON para propagar discurso de ódio ou para praticar qualquer ato de assédio ou de discriminação em razão de sexo biológico, identidade de gênero, orientação sexual, raça, cor, nacionalidade, religião, idade ou deficiência física ou mental.\r\nPropagar informações sobre atividades ilegais.\r\nTransmitir, divulgar, exibir, enviar, ou, de qualquer outra forma, tornar disponível, conteúdo ilícito, proibido, vulgar, obsceno, ou de qualquer outra forma censurável ou, ainda, agredir, caluniar, injuriar ou difamar qualquer pessoa física ou jurídica.\r\nTransmitir, divulgar, exibir, enviar, ou, de qualquer outra forma, tornar disponível, qualquer conteúdo, sem que tenha o direito de fazê-lo de acordo com a legislação brasileira,\r\nTransmitir, divulgar, exibir, enviar, ou, de qualquer outra forma, tornar disponível, qualquer conteúdo que viole patente, marca, segredo de negócio, direitos autorais ou qualquer outro direito de terceiros.\r\nTransferir, copiar ou retransmitir qualquer parte ou todo o FUNKTOON e seu conteúdo sem, ou em violação de, um contrato ou licença por escrito assinado pelos nossos representantes legais.\r\nCometer qualquer ato que interfira ou afete a operação pretendida do FUNKTOON.\r\nAssumir a identidade de outra pessoa física ou jurídica legitimamente registrada no FUNKTOON.\r\nRegistrar, subscrever, cancelar assinaturas, ou tentar registrar, subscrever ou cancelar a assinatura de qualquer parte para qualquer produto ou Serviço do FUNKTOON se não estiver expressamente autorizado por tal parte a fazê-lo.\r\nCriar falsa identidade ou utilizar-se de subterfúgios com a finalidade de enganar outras pessoas ou de obter benefícios.\r\nEmpregar qualquer método de prospecção ou extração de dados para capturar conteúdo do FUNKTOON.\r\nFazer uso de qualquer sistema automatizado (por exemplo, bots, web crawlers, leitores offline, entre outros) que acesse o Serviço, forjando a presença de um Usuário no Site FUNKTOON ou no Aplicativo FUNKTOON, com o propósito de aumentar artificialmente Leituras, curtidas, comentários ou outras métricas que contribuem para a popularidade de uma Série no FUNKTOON.\r\nManipular ou de qualquer forma apresentar o FUNKTOON e seu conteúdo usando “enquadramento” ou tecnologia de navegação semelhante.\r\nEnviar material publicitário não solicitado, inclusive spam, junk mail, chain letters, mala direta ou pirâmides para terceiros\r\nColetar qualquer informação de identificação pessoal, incluindo nomes de contas de usuário, do Serviço, nem use os sistemas de comunicação fornecidos pelo Serviço (por exemplo, comentários) para quaisquer fins de solicitação comercial.\r\nVender ou transferir qualquer um dos conteúdos ou informações disponíveis no Site FUNKTOON ou no Aplicativo FUNKTOON, parcial ou completamente, para qualquer terceira pessoa ou entidade em troca de qualquer coisa de valor, incluindo dinheiro \"real\" ou de outra forma, exceto se for o titular do conteúdo (mas desde que a operação não prejudique o uso do conteúdo no FUNKTOON).\r\nTransmitir arquivos que sejam danosos, incluindo, sem restrições, vírus de computador, bombas lógicas, cavalos de Tróia, worms, injeção de SQL, componentes danosos, dados corrompidos ou qualquer outro software malicioso com o propósito de interromper, destruir ou limitar a funcionalidade de qualquer software, hardware ou equipamento de telecomunicação.\r\nUsar o FUNKTOON para outros fins que não os determinados neste Acordo.\r\nDescumprir qualquer lei aplicável no uso do Serviço.\r\n\r\n5. Como são tratadas a propriedade intelectual e as marcas que aparecem no FUNKTOON?\r\n\r\n5.1 Propriedade intelectual: Somos os exclusivos proprietários do Site FUNKTOON, do Aplicativo FUNKTOON, dos Serviços e de todo conteúdo das nossas plataformas que tenha sido produzido, encomendado ou adquirido por nós, incluindo, sem limitação, textos, gráficos, dados, fotografias, imagens, vídeos, sons, layouts, ilustrações, software, códigos, bases de dados, artigos, fotografias e as respectivas seleções e arranjos (neste documento o “Conteúdo do FUNKTOON”), exceto em relação ao conteúdo disponibilizado pelo próprio Usuário, de acordo com a Seção 6 destes Termos de Uso. É proibido usar, copiar, reproduzir, modificar, traduzir, publicar, transmitir, distribuir, executar, fazer o upload, exibir, licenciar, vender ou explorar e fazer engenharia reversa do Conteúdo do FUNKTOON para qualquer finalidade, sem o nosso consentimento prévio e expresso.\r\n\r\n5.2 Marcas: O logotipo do FUNKTOON e qualquer outro nome ou slogan de produto ou serviço contido no Serviço são marcas de nossa propriedade, de nossos fornecedores ou de nossos Usuários, e não podem ser copiadas, imitadas ou usadas, total ou parcialmente, sem autorização prévia, por escrito, da nossa parte ou do respectivo titular, independentemente de registro. Não está autorizada a utilização de metatags ou de qualquer outro “hidden text” utilizando a FUNKTOON ou qualquer outro nome, marca ou nome de produto ou serviço da FUNKTOON sem a respectiva autorização prévia, por escrito.\r\n\r\n5.3 Distribuição de conteúdo: Exceto se for o legítimo titular do conteúdo, você não poderá publicar, distribuir, reproduzir, alterar, alugar, vender, fazer o download ou criar obras derivadas de qualquer conteúdo do FUNKTOON.\r\n\r\n6. Como o FUNKTOON trata os direitos sobre o meu conteúdo?\r\n\r\n6.1 Conteúdo de Usuário: Nós não reivindicamos os direitos de propriedade do seu conteúdo, incluindo informações de texto, imagem, áudio ou vídeo, seus comentários, as Séries que você publicar no FUNKTOON e qualquer outro conteúdo que você forneça por meio do Site FUNKTOON ou do Aplicativo FUNKTOON (neste documento o “Conteúdo de Usuário”). Qualquer Conteúdo de Usuário fornecido por você permanece de sua propriedade.\r\n\r\n6.2 Declaração de titularidade: Ao disponibilizar qualquer conteúdo no FUNKTOON, você declara e garante expressamente que (a) o conteúdo é dotado de absoluta originalidade e não contém qualquer elemento que possa implicar ou dar causa a violação, conflito ou infração a direitos de terceiros, incluindo, mas não se limitando a direitos de autor e conexos, direitos sobre marcas, propriedade intelectual em geral e direitos da personalidade, como nome, imagem, voz, intimidade, privacidade e honra; (b) você é o exclusivo titular de todos os direitos sobre o conteúdo ou está devidamente autorizado, por escrito, por todos os titulares a publicá-lo no FUNKTOON e usá-lo na abrangência prevista nestes Termos de Uso, comprometendo-se a nos fornecer prova dessa autorização caso a solicitemos; e (c) você não firmou e não firmará quaisquer acordos (por exemplo, você não garantiu a terceiros o uso exclusivo do conteúdo) e não fez e não fará quaisquer promessas com terceiros que impeçam ou limitem o uso do conteúdo na abrangência prevista nestes Termos de Uso. Assim, você se obriga a responder perante nós e perante terceiros por quaisquer acusações de violações de tais direitos e assume a total responsabilidade pelas perdas e danos e toda e qualquer despesa decorrente de tais acusações e eventuais condenações, inclusive custas judiciais e honorários de advogado.\r\n\r\n6.2 Licença: Para permitir que disponibilizemos o seu Conteúdo de Usuário no FUNKTOON, você nos outorga uma licença gratuita, não exclusiva e mundial, para que nós, direta ou indiretamente, possamos usar o conteúdo para os seguintes fins: (a) distribuir o conteúdo por meio do Site FUNKTOON, do Aplicativo FUNKTOON e de outras plataformas que venham a expandir o Serviço, disponibilizando-o para o público em geral; (b) explorar o conteúdo economicamente, exibindo anúncios junto a qualquer conteúdo ou, nas hipóteses previstas nestes Termos de Uso, exigindo dos Usuários o pagamento de uma assinatura para acesso ao conteúdo, sendo que você não receberá pagamento em decorrência dessa exploração, exceto, se for o caso, na forma especificada nas Seções 3.6.3; (c) permitir que nossos Usuários compartilhem o seu conteúdo em seus canais sociais (e-mail, WhatsApp, Facebook, Instagram, Twitter, TikTok, entre outros) na forma de links que direcionem para o local onde o seu conteúdo esteja disponível no Serviço, desde que isso não implique a reprodução na íntegra do seu conteúdo em tais canais, e (d) usar o conteúdo ou trechos dele em materiais promocionais, físicos ou digitais, para divulgação do FUNKTOON e do próprio conteúdo, podendo esses materiais ser distribuídos no Site FUNKTOON, no Aplicativo FUNKTOON, nos canais sociais da FUNKTOON, por meio de e-mails, por meio de anúncios/publicações “impulsionados” (Facebook Ads, Google Ads, entre outros) em redes sociais, buscadores, blogs e sites da internet em geral, por meio de quaisquer veículos de imprensa (por exemplo, em jornais, revistas, entre outros), em eventos ao vivo, entre outros meios de distribuição. Essa licença terá os seguintes prazos: (a) para as Séries que você publicar no FUNKTOON na condição de Autor Indie, a licença vigerá a partir da data em que você nos enviar o conteúdo até o 30º (trigésimo) dia após a data em que você solicitar expressamente a exclusão do conteúdo; (b) para as Séries que você publicar no FUNKTOON na condição de Autor Seleções, a licença vigerá a partir da data em que você nos enviar o conteúdo até o 30º (trigésimo) dia após a data em que você solicitar expressamente a exclusão do conteúdo; (c) para os demais conteúdos que você publicar no FUNKTOON, a licença vigerá definitivamente, por todo o prazo legal de proteção do conteúdo, consistindo em licença irretratável para todos os fins.\r\n\r\n6.4 Disponibilização ao público: Todo o Conteúdo de Usuário que você nos fornecer poderá disponibilizado aos demais Usuários do FUNKTOON nos termos deste Acordo. Assim, você reconhece e concorda que nós não guardaremos qualquer confidencialidade em relação a esse conteúdo.\r\n\r\n6.5 Conteúdos proibidos: Você declara que não publicará no FUNKTOON qualquer Conteúdo de Usuário que esteja em violação de direitos de terceiros, de acordo com a Seção 6.3, e qualquer Conteúdo de Usuário de caráter difamatório, calunioso, injurioso, pornográfico, obsceno, ofensivo ou ilícito. Nós nos reservamos o direito de decidir, a nosso exclusivo critério, se o conteúdo viola estes Termos de Uso. Além disso, é sua responsabilidade sinalizar, por meio das ferramentas disponíveis no FUNKTOON, qualquer conteúdo que possa conter elementos impróprios para menores de idade.\r\n\r\n6.6 Responsabilidade: A disponibilização de qualquer Conteúdo de Usuário no FUNKTOON constitui nem implica endosso, patrocínio ou recomendação da nossa parte em relação ao conteúdo ou qualquer opinião nele expressa. Nós não nos responsabilizamos por eventual violação de direitos da personalidade, direitos autorais, direitos conexos e direitos de marca e propriedade industrial, decorrente de qualquer Conteúdo de Usuário que você venha a publicar no FUNKTOON, tampouco pela natureza desse conteúdo. Você será o único responsável pelo seu próprio conteúdo e pelas consequências de publicá-lo por meio de um Serviço do FUNKTOON.\r\n\r\n6.7 Exclusão do conteúdo: Nós nos reservamos o direito de, mas não nos obrigamos a, analisar, monitorar e remover Conteúdo de Usuário, a nosso exclusivo critério, a qualquer momento e por qualquer motivo, se houver indícios de que o Conteúdo de Usuário infringe o Acordo, sem aviso prévio.\r\n\r\n6.8 Cessão: Você não pode transferir seus direitos ou obrigações decorrentes deste acordo sem nosso consentimento. Por outro lado, nossos direitos e obrigações podem ser cedidos a outras pessoas (por exemplo, em caso de alteração de propriedade do FUNKTOON, total ou parcial, ou por outros motivos de acordo com a lei).\r\n\r\n6. Violações de direitos autorais\r\n\r\n6.1 Notificação de violação: Nós respeitamos os direitos de propriedade intelectual de terceiros e solicitamos que nossos Usuários façam o mesmo. Caso qualquer Usuário ou terceiro acredite que suas obras foram utilizadas de maneira que constitua violação de direitos autorais ou que sua imagem tenha sido indevidamente empregada, ou ainda, caso julgue que outras infrações a direitos tenham sido cometidas, poderá solicitar a remoção do conteúdo ilícito, desde que nos forneça, através de e-mail para contato@universoguara.com.br, as seguintes informações:\r\n\r\n\r\n\r\nAssinatura normal ou eletrônica da pessoa autorizada a agir em nome do titular dos direitos autorais supostamente violados, bem como a cópia legível de um documento de identificação;\r\nDescrição da obra protegida ou da obra que tenha violado o pretenso direito;\r\nDescrição do local no Serviço, incluindo URL, se for o caso, onde se encontra o material que alegadamente está infringindo o direito;\r\nEndereço, telefone e endereço de e-mail do suposto titular dos direitos lesados;\r\nDeclaração do Usuário, mencionando acreditar de boa fé que o uso questionado não foi autorizado pelo titular dos direitos autorais (ou pelo titular de outros direitos aplicáveis), por seu representante ou pela lei; e\r\nDeclaração do Usuário, sob as penas da lei, indicando que as informações contidas na notificação de infração são verdadeiras e que o Usuário é o titular dos direitos autorais (ou de outro direito aplicável) ou está autorizado a agir em defesa de tais direitos.\r\n\r\n6.2 Contranotificação: Se você acredita que o seu conteúdo que foi removido do FUNKTOON não está infringindo direitos de terceiros, seja porque você é o exclusivo titular do conteúdo, seja porque você está autorizado pelos titulares do conteúdo a publicá-lo, poderá nos enviar uma contranotificação, desde que nos forneça, através de e-mail para contato@universoguara.com.br, as razões pelas quais acredita que o conteúdo que tenha sido removido não viola direitos de terceiros.\r\n\r\n6.3 Avisos: Poderemos comunicar uma violação de direitos de autor por meio de um aviso geral no FUNKTOON ou por e-mail direcionado a um Usuário.\r\n\r\n7. Em que situações minha conta pode ser excluída?\r\n\r\n7.1 Suspensão e cancelamento: Nós nos reservamos o direito de suspender ou cancelar, a qualquer momento e sem aviso prévio, o seu acesso ao FUNKTOON em caso de descumprimento de qualquer condição prevista no Acordo ou na legislação aplicável ou, ainda, em caso de ordem judicial ou requisição de autoridade competente, inatividade da conta por um período razoável de tempo ou caso fortuito ou força maior. Se a sua conta for suspensa ou cancelada, você perderá a capacidade de apresentar solicitações de pagamento até que a violação seja regularizada. Você reconhece e concorda que você não será indenizado se a sua conta de Usuário for suspensa ou cancelada nessas hipóteses.\r\n\r\n7.2 Compromisso: Você aceita nos defender, indenizar e proteger contra quaisquer reclamações, danos, custos, responsabilidades e despesas (incluindo, mas não se limitando a honorários advocatícios) decorrentes ou relacionadas ao descumprimento dos presentes Termos de Uso, bem como, da utilização não autorizada ou violação de direitos de terceiros de qualquer conteúdo utilizado, publicado, armazenado ou transmitido através do FUNKTOON.\r\n\r\n8. Garantias, responsabilidade e indenização\r\n\r\n8.1 Garantias: Nosso Serviço é fornecido “no estado em que se encontra”, e não podemos garantir que ele será seguro e funcionará perfeitamente o tempo todo. No limite permitido pela legislação aplicável, também nos eximimos de todas as garantias, expressas ou implícitas. Nós não podemos garantir, por exemplo, que: (a) o conteúdo disponível no FUNKTOON atenderá às suas necessidades; (b) o FUNKTOON estará disponível de forma ininterrupta, tempestiva e sem erros; (c) o resultado obtido pelo uso do FUNKTOON seja exato ou confiável, além do razoavelmente esperado nas condições dispostas nestes Termos de Uso; (d) a qualidade de qualquer produto, serviço, informação ou outro material que você obtenha pelo FUNKTOON atenderá às suas expectativas; ou (e) serão implementados melhoramentos ou inovações no FUNKTOON.\r\n\r\n8.2 Reponsabilização: Nossa responsabilidade por qualquer ocorrência no FUNKTOON será limitada tanto quanto permitido por lei. Não temos como prever todos os impactos possíveis que um problema com o Serviço possa causar. O FUNKTOON, sua controladora, suas afiliadas, parceiras ou funcionários não serão, em hipótese alguma, responsabilizados por danos diretos ou indiretos que resultem de, ou que tenham relação com o acesso, uso ou a incapacidade de acessar ou utilizar o FUNKTOON, incluindo, mas não se limitando, a lucros cessantes e danos emergentes, morais e materiais, ou, ainda, danos eventuais, especiais, indiretos, exemplares, punitivos ou acidentais decorrentes de ou relativos a estes Termos de Uso, ainda que saibamos que eles são possíveis. Isso se aplica inclusive se nós excluirmos seu conteúdo, informações ou conta. Em todos os casos, nós não seremos responsáveis por qualquer perda ou dano que não seja razoavelmente previsível.\r\n\r\n8.3 Limitação de responsabilidade: Na medida permitida por lei, a nossa responsabilidade total por qualquer reivindicação sob estes Termos de Uso e as demais condições do Acordo limita-se ao valor que você nos tenha pago para usar o FUNKTOON.\r\n\r\n8.4 Não-Responsabilização: Tendo em vista as características inerentes ao ambiente da Internet, o FUNKTOON não se responsabiliza por interrupções ou suspensões de conexão, transmissões de computador incompletas ou que falhem, bem como por falha técnica de qualquer tipo, incluindo, mas não se limitando, ao mau funcionamento eletrônico de qualquer rede, hardware ou software. A indisponibilidade de acesso à internet ou ao FUNKTOON, assim como qualquer informação incorreta ou incompleta sobre o FUNKTOON e qualquer falha humana, técnica ou de qualquer outro tipo no processamento das informações do FUNKTOON não serão consideradas responsabilidade do FUNKTOON. O FUNKTOON se exime de qualquer responsabilidade proveniente de tais fatos e/ou atos.\r\n\r\n9. O que mais devo saber para usar o FUNKTOON?\r\n\r\n9.1 Outros assuntos: Nós nos reservamos o direito de decidir, a nosso exclusivo critério, em conformidade com a legislação aplicável, sobre qualquer assunto que não tenha sido esclarecido nestes Termos de Uso e você concorda que a nossa decisão é final.\r\n\r\n9.2 Lei aplicável: O uso do FUNKTOON estará sempre, em qualquer hipótese e independentemente do local de onde você o esteja acessando, sujeito à legislação brasileira e aos presentes Termos de Uso. Apesar disso, reconhecendo o alcance mundial da Internet, você concorda em cumprir toda e qualquer disposição normativa que disponha sobre a sua conduta ou sobre conteúdo aceitável, comprometendo-se a observar a legislação aplicável do país no qual estiver localizado.\r\n\r\n9.3 Foro: Você concorda que qualquer disputa ou reivindicação relacionada ao Acordo será submetida ao foro da comarca do Rio de Janeiro, renunciando a qualquer outro, por mais privilegiado que seja.\r\n\r\n9.4 Notificações: Nós lhe enviaremos qualquer aviso através de e-mail ou por outros meios, a nosso exclusivo critério. Além disso, o Serviço poderá, também, fornecer avisos por meio da exibição de destaques, caracteres especiais ou links para os Usuários.\r\n\r\n9.5 Omissão: Nenhuma omissão ou demora da nossa parte em exercer os direitos previstos nestes Termos de Uso, nas demais condições do Acordo ou na legislação aplicável, implica renúncia ao seu exercício.\r\n\r\n9.6 Alterações: Para melhorar sua experiência, nós estamos sempre atualizando o FUNKTOON. Por esse motivo, o Acordo pode ser alterado, a qualquer tempo, a fim de refletir os ajustes realizados. No entanto, sempre que ocorrer qualquer modificação, você será previamente informado pelo endereço de e-mail fornecido por você no momento do cadastro ou por um aviso em destaque no Site FUNKTOON e no Aplicativo FUNKTOON. Quando forem efetuadas alterações, a data da última atualização, na parte superior deste documento, será revista e alterada e as alterações entrarão em vigor imediatamente na data de atualização. Caso você não concorde com os novos Termos de Uso, você poderá rejeitá-los, mas, infelizmente, isso significa que você não poderá mais ter acesso e fazer uso do FUNKTOON. Se de qualquer maneira você utilizar O FUNKTOON mesmo após a alteração destes Termos de Uso, isso significa que você concorda com todas as modificações.\r\n\r\n9.7 Dúvidas: Caso você tenha alguma dúvida, comentário ou sugestão, por favor, entre em contato conosco por meio do e-mail contato@universoguara.com.br.', 2, 1, NULL, NULL, NULL, '2023-05-18 18:43:10'),
(4, 1, 'Updated Politica', 'This is an updated politica', 2, 1, 5, '2023-05-30 10:25:53', NULL, '2023-05-30 12:47:47'),
(5, 1, 'New Politica', 'This is a new politica', 3, 1, 5, NULL, NULL, '2023-05-30 13:37:45'),
(6, 3, 'New Politica', 'This is a new politica', 1, 1, 5, NULL, NULL, '2023-05-30 13:38:05'),
(7, 2, 'New Politica', 'This is a new politica', 2, 1, 5, NULL, NULL, '2023-05-30 13:38:09'),
(8, 2, 'New Politica', 'This is a new politica', 3, 1, 5, NULL, NULL, '2023-05-30 13:38:11');

-- --------------------------------------------------------

--
-- Table structure for table `Selo`
--

DROP TABLE IF EXISTS `Selo`;
CREATE TABLE IF NOT EXISTS `Selo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` mediumtext NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `publicado` tinyint(1) NOT NULL,
  `destaque` tinyint(1) NOT NULL,
  `Imagem` varchar(255) DEFAULT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `order` tinyint(4) DEFAULT NULL,
  `order_by_serie` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Selo';

--
-- Dumping data for table `Selo`
--

INSERT INTO `Selo` (`id`, `nome`, `descricao`, `ativo`, `publicado`, `destaque`, `Imagem`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `order`, `order_by_serie`) VALUES
(1, 'Updated Selo Name', 'Updated Selo Description', 0, 0, 0, 'https://newimageurl.com', NULL, NULL, NULL, '2023-05-29 13:44:01', 2, 0),
(2, 'Livre para todas as idades', '', 0, 0, 0, 'Livre_Para_Todas_as_Idades.png', 0, NULL, NULL, '2023-05-18 17:42:59', NULL, NULL),
(3, 'Molecada', 'Selo destinado a crianças e jovens. Adultos também podem curtir as histórias, mas saiba que é ótimo para ler com seus filhos e/ou sobrinhos.\n\nSelo para quem gosta de: Harry Potter; Toy Story; A Viagem de Chihiro;\n\nHistórias Guará: Bobarella!; Djou;', 1, 1, 1, 'Selo_Molecada.png', NULL, NULL, NULL, '2023-05-18 18:04:42', NULL, NULL),
(4, 'Revanche Originária', 'Histórias de vingança, ação e aventura que nos trazem de volta às nossas raízes. Esse Selo trás personagens que lutam contra todo tipo de opressão.\r\n\r\nSelo para quem gosta de: V de Vingança; Tropa de Elite; John Wick;\r\n\r\nHistórias Guará: Cidadão Incomum; Eu Sou Lume; Desviantes; Kriança Índia; Teocrasília;', 1, 1, 1, 'Selo_Revanche_Originaria.png', NULL, NULL, NULL, '2023-05-18 18:04:42', NULL, NULL),
(5, 'LGBTQI+', 'Selo para todo mundo, não importa se você é LGBTQI+ ou não. As histórias desse selo apresentam personagens, tramas ou temas relevantes para a comunidade arco-íris.\r\n\r\nSelo para quem gosta de: Heartstopper; Priscilla a Rainha do Deserto; Com amor, Simon;\r\n\r\nHistórias Guará: Tito;', 1, 1, 1, 'Selo_LGBTQIA.png', NULL, NULL, NULL, '2023-05-18 18:08:23', NULL, NULL),
(6, 'Sci-fi', 'Histórias que imaginam tecnologias revolucionárias, para o bem ou para o mal. Feito para você que gosta de se perder na linha do tempo e decorar cores de sabres de luz.\r\n\r\nSelo para quem gosta de: Star Wars; Dark; Duna;\r\n\r\nHistórias Guará: Ecos; Travessia; Duodec; Interferência; Era Uma Vez no Futuro;', 1, 1, 1, 'Selo_SciFi.jpg', NULL, NULL, NULL, '2023-05-18 18:08:23', NULL, NULL),
(7, 'Terror Sobrenatural', 'Histórias de fantasmas, extraterrestres e qualquer coisa além da nossa compreensão. Onde ciência e superstição se confundem. \r\n\r\nSelo para quem gosta de: Twilight Zone; Arquivo X; Frankenstein;​\r\n\r\nHistórias Guará: Santo; Sangue Quente; A Fortaleza; Solo;', 1, 1, 1, 'Selo_Terror_Sobrenatural.png', NULL, NULL, NULL, '2023-05-18 18:10:32', NULL, NULL),
(8, 'Espada & Feitiçaria & Paranauê', 'Selo para conhecer mundos fantásticos de magia, heróis e lendas. Lutas com dragões e mandingas andam juntas nessas histórias. \r\n\r\nSelo para quem gosta de: Game of Thrones; Senhor dos Anéis, Cidade Invisível; \r\n\r\nHistórias Guará: Preto Tipo A; Bobarella!', 1, 1, 1, 'Selo_EFP.png', NULL, NULL, NULL, '2023-05-18 18:13:55', NULL, NULL),
(9, 'Bola Quadrada', 'Esse selo é de laranja, parece de limão, mas tem gosto de tamarindo. Histórias que vão te fazer rir sem querer querendo.​\r\n\r\nSelo para quem gosta de: Chaves; Minha mãe é uma Peça; Ana, Mosquinha e Lagatixinha; \r\n\r\nHistórias Guará: Troca de Turno; Noite de Spoiler;', 1, 1, 1, 'Selo_Bola_Quadrada.png', NULL, NULL, NULL, '2023-05-18 18:16:14', NULL, NULL),
(10, 'Horror Tropical', 'Selo responsável por seus pesadelos. Histórias que mostram o lado mais visceral e perversos dos seus personagens.\r\n\r\nSelo para quem gosta de: The Walking Dead; Arma X; Hora do Pesadelo;\r\n\r\nHistórias Guará: Kriança Índia; Monstro de Serra Leoa; Justiça Bovina;', 1, 1, 1, 'Selo_Horror_Tropical.png', NULL, NULL, NULL, '2023-05-18 18:17:52', NULL, NULL),
(11, 'Novela das 6', 'Histórias que nos levam de volta a um Brasil que não existe mais. Seja na época da escravidão ou da ditadura militar, leia histórias de um passado que já superamos.​\r\n\r\nSelo para quem gosta de: Chocolate com Pimenta; Orgulho e Preconceito; O Auto da Compadecida;​\r\n\r\nHistórias Guará: Espetaculare Meneghetti;', 1, 1, 1, 'Selo_Novela_das_6.png', NULL, NULL, NULL, '2023-05-18 18:19:06', NULL, NULL),
(12, 'Pra Chorar', 'Para esse selo você vai precisar de lencinhos para secar as lágrimas. Histórias dramáticas, que emocionam e nos fazem exercitar a empatia.  \r\n\r\nSelo para quem gosta de: Forest Gump; Grey\'s Anatomy; Pílulas Azuis;​\r\n\r\nHistórias Guará: Crisálida;', 1, 1, 1, 'Selo_Pra_Chorar.png', NULL, NULL, NULL, '2023-05-18 18:20:07', NULL, NULL),
(13, 'Cuequinha & Soco', 'Se você gosta de super-heróis, super-vilões e roupas coloridas, esse selo foi feito pra você. Quadrinhos de ação com poderes, histórias de origem e muito soquinho dado por gente de cueca.\r\n\r\nSelo para quem gosta de: Vingadores; Batman; Naruto; One Punch Man.\r\n\r\nQuadrinhos da Guará: Cidadão Incomum; Tito', 1, 1, 1, 'Selo_Cuequinha_Soco.png', NULL, NULL, NULL, '2023-05-18 18:21:52', NULL, NULL),
(14, 'Palestrinha', 'Selo pra você que gosta de aprender enquanto lê gibis. Quadrinhos educativos, acadêmicos, institucionais... tudo que informa além de entreter você encontra aqui.\r\n\r\nSelo para quem gosta de: Action Philosophers!; Desaplanar; Sapiens; Logicomix.\r\n\r\nQuadrinhos da Guará: Como Usar o Picolé.', 1, 1, 1, 'Selo_Palestrinha.png', NULL, NULL, NULL, '2023-05-18 18:23:09', NULL, NULL),
(15, 'Faroeste Caboclo', 'Histórias de velho oeste não precisam ser tão velhas e nem acontecer no oeste.\r\n\r\nAqui você vai encontrar aridez, personagens solitários e um estranho senso de justiça.\r\n\r\n\r\n\r\nSelo para quem gosta de: Bacurau; O Mandaloriano; Bando de Dois; Tex.\r\n\r\n\r\n\r\nHistórias Guará: -', 1, 1, 1, 'Selo_Faroeste_Caboclo.png', NULL, NULL, NULL, '2023-05-18 18:25:11', NULL, NULL),
(16, 'Crime e Mistério', 'Selo onde você procura respostas mas só encontra perguntas. O tipo de História que você não quer largar até descobrir quem é o culpado.​\r\n\r\nSelo para quem gosta de: Blacksad; Código DaVinci; Assassinato no Expresso do Oriente;​\r\n\r\nHistórias Guará: Cidadão Incomum; Tito; Santo; Eu Sou Lume; Omertá; Pérola; 17 anos e um 38; Espetaculare Meneghetti;', 1, 1, 1, 'Selo_Crime _Mistério.png', NULL, NULL, NULL, '2023-05-18 18:26:29', NULL, NULL),
(17, 'Aquece Coração', 'Selo com romance, intrigas, declarações de amor, e às vezes triângulos amorosos. Histórias para se emocionar e torcer para que os personagens fiquem juntos no final.​\r\n\r\nSelo para quem gosta de: Como se Fosse a Primeira Vez; Crepúsculo; Diário de Uma Paixão;', 1, 1, 1, 'Selo_Aquece_Coracao.png', NULL, NULL, NULL, '2023-05-18 18:28:11', NULL, NULL),
(18, 'Distopia Latina', 'Selo destinado a viver uma realidade ainda mais bizarra do que a nossa. Mesmo sendo difícil competir com a realidade, as histórias aqui nos levam para lugares que não queremos chegar.\r\n\r\nSelo para quem gosta de: Mad Max; o Expresso do Amanhã; Jogos Vorazes;\r\n\r\nHistórias Guará: Ecos; Travessia; Desviantes; Teocrasília; Era Uma Vez no Futuro; Solo;', 1, 1, 1, 'Selo_Distopia_Latina.png', NULL, NULL, NULL, '2023-05-18 18:29:44', NULL, NULL),
(19, 'Coça-Queixo', 'Esse selo é feito pra você que gosta de fritar neurônios. Histórias que vão te deixar pensando por alguns dias, excelentes para citar casualmente numa mesa de bar.\r\n\r\nSelo para quem gosta de: Dark; Tom Gauld; Strip Panel Naked; Laerte.\r\n\r\nTítulos da Guará: -', 1, 1, 1, 'Selo_Coca_Queixo.png', NULL, NULL, NULL, '2023-05-18 18:30:57', NULL, NULL),
(20, 'Podrão', 'Histórias podreiras, que trazem o mais tosco e underground dos quadrinhos. Feito para você que gosta de rodinha punk, hamburguer gorduroso e spikes.\r\n\r\nSelo para quem gosta de: Marcatti; Robert Crumb; Zé do Caixão.\r\n\r\nHistórias Guará: -', 1, 1, 1, 'Selo_Podrao.png', NULL, NULL, NULL, '2023-05-18 18:33:02', NULL, NULL),
(21, 'Cotidianos Extraordinários', 'Selo que nos mostra o lado mais incrível das vidas de pessoas comuns. Personagens memoráveis, cativantes e que poderiam ser você.​\r\n\r\nSelo para quem gosta de: Aquele Verão; Retalhos; Seinfield;​\r\n\r\nHistórias Guará: Troca de Turno; A Guará; Noite de Spoiler; Crisálida; Segundo Tempo; Sara Animals;', 1, 1, 1, 'Selo_Cotidianos_Extraordinarios.png', NULL, NULL, NULL, '2023-05-18 18:34:02', NULL, NULL),
(22, 'Conteúdo Restrito', 'Selo destinado a publicações para adultos. Os temas abordados podem conter violência, nudez e sexo, uso de drogas, e temas que só fazem sentido para gente que paga boletos.\r\n\r\nSelo para quem gosta de: Euphoria; The Boys; Laranja Mecânica;\r\n\r\nHistórias Guará: Kriança Índia; Teocrasília; Justiça Bovina;', 1, 1, 1, 'Selo_Conteudo_Restrito.png', NULL, NULL, NULL, '2023-05-18 18:35:01', NULL, NULL),
(31, 'Selo Name', 'Selo Description', 1, 0, 1, 'Selfie-1685547599968.jpeg', 5, NULL, NULL, '2023-05-31 15:40:32', NULL, NULL),
(32, 'Selo Name', 'Selo Description', 0, 0, 1, 'Selfie-1685548223738.jpeg', 5, NULL, '2023-05-31 16:27:10', '2023-05-31 15:50:30', NULL, NULL),
(33, 'Updated Selo Name', 'Updated Selo Description', 0, 0, 0, 'Selfie-1685548640468.jpeg', 16, '2023-05-31 16:03:42', NULL, '2023-05-31 15:57:26', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_Denuncia`
--

DROP TABLE IF EXISTS `Tipo_Denuncia`;
CREATE TABLE IF NOT EXISTS `Tipo_Denuncia` (
  `id` tinyint(4) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tipos de denúcia';

--
-- Dumping data for table `Tipo_Denuncia`
--

INSERT INTO `Tipo_Denuncia` (`id`, `nome`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, 'Conteúdo ofensivo ou impróprio', NULL, NULL, NULL, '2023-05-18 17:15:32'),
(2, 'Violação de direitos autorais', NULL, NULL, NULL, '2023-05-18 17:15:32'),
(3, 'Spam ou propaganda', NULL, NULL, NULL, '2023-05-18 17:16:30'),
(4, 'Outros', NULL, NULL, NULL, '2023-05-18 17:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_Politica`
--

DROP TABLE IF EXISTS `Tipo_Politica`;
CREATE TABLE IF NOT EXISTS `Tipo_Politica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `id_usuario_operacao` int(11) DEFAULT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tipo de politicas';

--
-- Dumping data for table `Tipo_Politica`
--

INSERT INTO `Tipo_Politica` (`id`, `nome`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, 'Política de privacidade', NULL, NULL, NULL, '2023-05-18 17:21:42'),
(2, 'Termos de uso', NULL, NULL, NULL, '2023-05-18 17:21:42'),
(3, 'Termos de uso para autores', NULL, NULL, NULL, '2023-05-18 17:24:04');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_Usuario`
--

DROP TABLE IF EXISTS `Tipo_Usuario`;
CREATE TABLE IF NOT EXISTS `Tipo_Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` enum('ROOT','ADMIN','USUARIO','ASSINANTE','AUTOR') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Tipo_Usuario`
--

INSERT INTO `Tipo_Usuario` (`id`, `nome`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, 'ROOT', 1, '2023-05-23 18:25:15', '2023-05-23 18:25:15', '2023-05-23 18:25:29'),
(2, 'ADMIN', 1, '2023-05-23 19:38:40', '2023-05-23 19:38:40', '2023-05-23 19:38:47'),
(3, 'USUARIO', 1, '2023-05-23 19:39:24', '2023-05-23 19:39:24', '2023-05-23 19:40:48'),
(4, 'ASSINANTE', 1, '2023-05-23 19:40:56', '2023-05-23 19:40:56', '2023-05-23 19:41:07'),
(5, 'AUTOR', 1, '2023-05-25 13:41:52', '2023-05-25 13:41:52', '2023-05-25 13:41:59');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_Vitrine_Conteudo`
--

DROP TABLE IF EXISTS `Tipo_Vitrine_Conteudo`;
CREATE TABLE IF NOT EXISTS `Tipo_Vitrine_Conteudo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Tipo_Vitrine_Conteudo`
--

INSERT INTO `Tipo_Vitrine_Conteudo` (`id`, `nome`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(1, 'session', 1, NULL, NULL, '2023-07-11 14:46:28'),
(2, 'banner', 1, NULL, NULL, '2023-07-11 14:46:41');

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
CREATE TABLE IF NOT EXISTS `Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` mediumtext NOT NULL DEFAULT 'Sobre',
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `fotoPath` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_validade_assinatura` date DEFAULT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `cpf` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `e-mail` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Usuários';

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`id`, `nome`, `descricao`, `email`, `senha`, `fotoPath`, `ativo`, `data_validade_assinatura`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `cpf`) VALUES
(5, 'Funktoon admin', 'New Era', 'testando@gmail.com', '$2b$10$8f1Xg.X1eP2AbBE8v6.AEeKRw7959dBoX8.eoJBLaQa6SyPTOQz26', '5-ProfilePic.jpeg', 1, '2024-12-31', 1, '2023-12-31 23:59:59', '2023-12-31 23:59:59', '2023-12-31 23:59:59', NULL),
(15, 'Funkton', 'New Era 2', 'bioninho1@agoravai.com', '$2b$10$kT/r5NizzPhJJu0.OAjYVuICdyPTXyn32FOApQzTJkQmHOdMzbz46', '15-ProfilePic.jpeg', 1, NULL, 1, NULL, NULL, '2023-05-23 20:39:41', NULL),
(16, 'Funktoon admin', 'New era', 'bioninh1o1@agoravai.com', '$2b$10$mJ5PXJku26vgihuNtdSSUeHoi5wMNS4rRkMyKuZU005r/ud3Ydxqi', '16-ProfilePic.jpeg', 1, NULL, 1, NULL, NULL, '2023-05-24 17:16:44', NULL),
(20, 'Marcelo Faria', 'New Era Teste', 'marcelovaughan@gmail.com', '$2a$09$KQg4oj/S0wdX.oLQMpgBmutihoPrd6fOFsdn6qwWFeq8Noq7bi6p6', NULL, 1, NULL, 15, NULL, NULL, '2023-06-03 11:03:35', NULL),
(21, 'Funktoon admin', 'New era', 'bioninh1o1432@agoravai.com', '$2b$10$knZB98igKxxxFQ3DUIIumO5i1f4KrIFz3MtviHlvT53nSVdNat9RS', NULL, 1, NULL, 1, NULL, NULL, '2023-06-05 17:18:48', NULL),
(22, 'Donovan Benton', 'Sobre', 'vuneqavi@mailinator.com', '$2b$10$P1m5e/1bMmE5Ro3nr1gQs.KO3vQug/2W2C/0XKbmkqz/Vm2mcONga', NULL, 1, NULL, 1, NULL, NULL, '2023-06-05 17:37:40', NULL),
(23, 'Oscar Castro', 'Sobre', 'qobokyre@mailinator.com', '$2b$10$fbKiaTU9PqEObCPYen2UN.wxx7MvCWltOPv.TaTXJnG11hrm5tHTK', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 16:56:43', NULL),
(25, 'Danielle Maldonado', 'Sobre', 'kaduw@mailinator.com', '$2b$10$UnU.9rrZup9eSRZ1ix9b..lE1omkC7/7A4nc4GkGfp8ERxAn79oIC', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:40:23', NULL),
(26, 'Lani Vaughan', 'Sobre', 'wekebewihy@mailinator.com', '$2b$10$z8g7q1BJeuXOHAHrs7Jze.cOwGdr6jsrK4dFm8moQD5TGtvJdoN7e', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:41:30', NULL),
(27, 'Christian Solomon', 'Sobre', 'jyjawi@mailinator.com', '$2b$10$xgwXcoMV7IrobJjK99FWQuUbTvxtEgZ8wb7SCWJ8SOs5ZVY4hDcFq', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:41:45', NULL),
(28, 'Hannah Preston', 'Sobre', 'dadys@mailinator.com', '$2b$10$iivVSqEUv0YoY.R/YYCzx.C1T3hWgCu6MUvkBK.w5eqBbELOs4e9S', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:41:58', NULL),
(29, 'Germaine Holland', 'Sobre', 'berawy@mailinator.com', '$2b$10$yDXWYhDEbHTrHO9t/SeSWOOcP2D.htSwSmTJzWQbnx3rWQONksolm', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:47:41', NULL),
(30, 'Reese Benton', 'Sobre', 'mebiwe@mailinator.com', '$2b$10$ivcHnLlPV2Zt7HtLQAS4MeA46tKN/btqUWWmzJl/gZMdDA8.Akpxa', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 17:55:59', NULL),
(31, 'Isabelle Leblanc', 'Sobre', 'guqumetos@mailinator.com', '$2b$10$qG1kpEwslLA5kN9opbtcsui3gdoqsJgJA8uqkJDBot7yHygsVYNLi', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 18:00:03', NULL),
(32, 'Nathaniel Reynolds', 'Sobre', 'dybazusede@mailinator.com', '$2b$10$rY5qstDn01KU7DHnhjGl9usbmzHt3vfIG5hxjL1beB0kIoh5KIXNG', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 18:17:01', NULL),
(39, 'September Lynn', 'Sobre', 'cebavuruti@mailinator.com', '$2b$10$n0f1LXbhxr6f5E09CT2nP.mckN9ddKy7u8QgeGQBGXkpm43dDM0Gq', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 18:38:11', NULL),
(55, 'joao l b p holanda', 'Sobre', 'joao.holanda@yoingles.com', '$2b$10$WzrsY03giqm4Lgi9dHtVWe3t8ipFRYiMcPKG4k1NCNxkKCdDMBFRm', NULL, 1, NULL, 1, NULL, NULL, '2023-06-07 19:59:05', NULL),
(71, 'Joao Bione', 'Sobre', 'joao.holanda@soulasalle.com.br', '$2b$10$G/B/WFc1kJmIO8YI6tAMjelw.AxPSTd0kkG7RFqo4OTe7v9SkHAxq', NULL, 1, NULL, 1, NULL, NULL, '2023-06-14 16:57:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Usuario__Tipo_Usuario`
--

DROP TABLE IF EXISTS `Usuario__Tipo_Usuario`;
CREATE TABLE IF NOT EXISTS `Usuario__Tipo_Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Relação Usuario (n) - Tipo_Usuario (n)';

--
-- Dumping data for table `Usuario__Tipo_Usuario`
--

INSERT INTO `Usuario__Tipo_Usuario` (`id`, `id_usuario`, `id_tipo_usuario`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`) VALUES
(8, 15, 3, 1, NULL, NULL, '2023-05-23 20:39:44'),
(9, 16, 2, 1, NULL, NULL, '2023-05-24 17:16:44'),
(10, 5, 2, 1, '2023-05-25 14:00:33', '2023-05-25 14:00:33', '2023-05-25 14:01:02'),
(11, 20, 5, 1, NULL, NULL, '2023-06-03 11:03:35'),
(12, 21, 3, 1, NULL, NULL, '2023-06-05 17:18:48'),
(13, 22, 3, 1, NULL, NULL, '2023-06-05 17:37:43'),
(14, 23, 3, 1, NULL, NULL, '2023-06-07 16:56:43'),
(15, 25, 3, 1, NULL, NULL, '2023-06-07 17:40:23'),
(16, 26, 3, 1, NULL, NULL, '2023-06-07 17:41:30'),
(17, 27, 3, 1, NULL, NULL, '2023-06-07 17:41:45'),
(18, 28, 3, 1, NULL, NULL, '2023-06-07 17:41:59'),
(19, 29, 3, 1, NULL, NULL, '2023-06-07 17:47:41'),
(20, 30, 3, 1, NULL, NULL, '2023-06-07 17:55:59'),
(21, 31, 3, 1, NULL, NULL, '2023-06-07 18:00:03'),
(22, 32, 3, 1, NULL, NULL, '2023-06-07 18:17:01'),
(23, 39, 3, 1, NULL, NULL, '2023-06-07 18:38:11'),
(24, 55, 3, 1, NULL, NULL, '2023-06-07 19:59:06'),
(25, 71, 3, 1, NULL, NULL, '2023-06-14 16:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `Vitrine_Conteudo`
--

DROP TABLE IF EXISTS `Vitrine_Conteudo`;
CREATE TABLE IF NOT EXISTS `Vitrine_Conteudo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `ordem` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `id_usuario_operacao` int(11) NOT NULL,
  `data_alteracao` datetime DEFAULT NULL,
  `data_exclusao` datetime DEFAULT NULL,
  `data_inclusao` datetime NOT NULL DEFAULT current_timestamp(),
  `id_tipo_vitrine_conteudo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Vitrine_Conteudo_ibfk_1` (`id_tipo_vitrine_conteudo`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vitrine de conteúdos';

--
-- Dumping data for table `Vitrine_Conteudo`
--

INSERT INTO `Vitrine_Conteudo` (`id`, `nome`, `ordem`, `ativo`, `id_usuario_operacao`, `data_alteracao`, `data_exclusao`, `data_inclusao`, `id_tipo_vitrine_conteudo`) VALUES
(9, 'INDEPENDENTES', 5, 1, 20, NULL, NULL, '2023-07-17 19:00:31', 1),
(10, 'PREMIUM', 1, 1, 20, NULL, NULL, '2023-07-17 19:09:48', 1),
(11, 'ORIGINAIS', 1, 1, 20, '2023-07-18 01:28:31', NULL, '2023-07-17 19:10:08', 1),
(12, 'PICOLÉ INDICA', 2, 1, 20, NULL, NULL, '2023-07-17 19:10:24', 1),
(13, 'INKO', 6, 1, 20, NULL, NULL, '2023-07-17 19:11:14', 1),
(14, 'SELEÇÕES', 7, 1, 20, NULL, NULL, '2023-07-17 19:11:32', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Colecao__Conteudo`
--
ALTER TABLE `Colecao__Conteudo`
  ADD CONSTRAINT `Colecao__Conteudo_ibfk_1` FOREIGN KEY (`id_colecao`) REFERENCES `Colecao` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Colecao__Conteudo_ibfk_2` FOREIGN KEY (`id_conteudo`) REFERENCES `Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Comentario`
--
ALTER TABLE `Comentario`
  ADD CONSTRAINT `Comentario_ibfk_1` FOREIGN KEY (`id_episodio`) REFERENCES `Episodio` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Comentario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Conteudo__Selo`
--
ALTER TABLE `Conteudo__Selo`
  ADD CONSTRAINT `Conteudo__Selo_ibfk_1` FOREIGN KEY (`id_conteudo`) REFERENCES `Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Conteudo__Vitrine_Conteudo`
--
ALTER TABLE `Conteudo__Vitrine_Conteudo`
  ADD CONSTRAINT `Conteudo__Vitrine_Conteudo_ibfk_1` FOREIGN KEY (`id_conteudo`) REFERENCES `Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Conteudo__Vitrine_Conteudo_ibfk_2` FOREIGN KEY (`id_vitrine_conteudo`) REFERENCES `Vitrine_Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Denuncia`
--
ALTER TABLE `Denuncia`
  ADD CONSTRAINT `Denuncia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Denuncia_ibfk_2` FOREIGN KEY (`id_tipo_denuncia`) REFERENCES `Tipo_Denuncia` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Episodio`
--
ALTER TABLE `Episodio`
  ADD CONSTRAINT `Episodio_ibfk_1` FOREIGN KEY (`id_conteudo`) REFERENCES `Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Episodio_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Episodio__Imagem`
--
ALTER TABLE `Episodio__Imagem`
  ADD CONSTRAINT `Episodio__Imagem_ibfk_1` FOREIGN KEY (`episodio_id`) REFERENCES `Episodio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Favorito`
--
ALTER TABLE `Favorito`
  ADD CONSTRAINT `Favorito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorito_ibfk_2` FOREIGN KEY (`id_episodio`) REFERENCES `Episodio` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Usuario__Tipo_Usuario`
--
ALTER TABLE `Usuario__Tipo_Usuario`
  ADD CONSTRAINT `Usuario__Tipo_Usuario_ibfk_1` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `Tipo_Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Usuario__Tipo_Usuario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Vitrine_Conteudo`
--
ALTER TABLE `Vitrine_Conteudo`
  ADD CONSTRAINT `Vitrine_Conteudo_ibfk_1` FOREIGN KEY (`id_tipo_vitrine_conteudo`) REFERENCES `Tipo_Vitrine_Conteudo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;
