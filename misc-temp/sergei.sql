USE [sergei]
GO
/****** Object:  StoredProcedure [dbo].[Prev_Course]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Prev_Course]
GO
/****** Object:  StoredProcedure [dbo].[Number_Groups]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Number_Groups]
GO
/****** Object:  StoredProcedure [dbo].[Next_Course_2]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Next_Course_2]
GO
/****** Object:  StoredProcedure [dbo].[Next_Course]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Next_Course]
GO
/****** Object:  StoredProcedure [dbo].[List_Students_Dir]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[List_Students_Dir]
GO
/****** Object:  StoredProcedure [dbo].[Enter_Students]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Enter_Students]
GO
/****** Object:  StoredProcedure [dbo].[Delete_Students_Complete]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Delete_Students_Complete]
GO
/****** Object:  StoredProcedure [dbo].[Count_Students_Sem]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Count_Students_Sem]
GO
/****** Object:  StoredProcedure [dbo].[Count_Students]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Count_Students]
GO
/****** Object:  StoredProcedure [dbo].[Back_Students_Complete]    Script Date: 2020/12/15 19:43:17 ******/
DROP PROCEDURE IF EXISTS [dbo].[Back_Students_Complete]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Groups]') AND type in (N'U'))
ALTER TABLE [dbo].[Groups] DROP CONSTRAINT IF EXISTS [CK__Groups__Quantity__34C8D9D1]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Directions]') AND type in (N'U'))
ALTER TABLE [dbo].[Directions] DROP CONSTRAINT IF EXISTS [CK__Direction__Quant__33D4B598]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Uplans]') AND type in (N'U'))
ALTER TABLE [dbo].[Uplans] DROP CONSTRAINT IF EXISTS [FK__Uplans__NumDisc__32E0915F]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Uplans]') AND type in (N'U'))
ALTER TABLE [dbo].[Uplans] DROP CONSTRAINT IF EXISTS [FK__Uplans__NumDir__31EC6D26]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Students]') AND type in (N'U'))
ALTER TABLE [dbo].[Students] DROP CONSTRAINT IF EXISTS [FK_Students_Groups]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Groups]') AND type in (N'U'))
ALTER TABLE [dbo].[Groups] DROP CONSTRAINT IF EXISTS [FK__Groups__NumDir__300424B4]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Balls]') AND type in (N'U'))
ALTER TABLE [dbo].[Balls] DROP CONSTRAINT IF EXISTS [FK__Balls__NumSt__34C8D9D1]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Balls]') AND type in (N'U'))
ALTER TABLE [dbo].[Balls] DROP CONSTRAINT IF EXISTS [FK__Balls__IdDisc__2E1BDC42]
GO
/****** Object:  Table [dbo].[ArchiveStudents]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[ArchiveStudents]
GO
/****** Object:  View [dbo].[Students_complete_2]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[Students_complete_2]
GO
/****** Object:  View [dbo].[Students_complete]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[Students_complete]
GO
/****** Object:  View [dbo].[Students_top_and_last]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[Students_top_and_last]
GO
/****** Object:  View [dbo].[Disciplines_with_balls]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[Disciplines_with_balls]
GO
/****** Object:  Table [dbo].[Uplans]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Uplans]
GO
/****** Object:  Table [dbo].[Disciplines]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Disciplines]
GO
/****** Object:  View [dbo].[SH_Over3]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[SH_Over3]
GO
/****** Object:  Table [dbo].[Balls]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Balls]
GO
/****** Object:  View [dbo].[Student_Data]    Script Date: 2020/12/15 19:43:17 ******/
DROP VIEW IF EXISTS [dbo].[Student_Data]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Students]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Groups]
GO
/****** Object:  Table [dbo].[Directions]    Script Date: 2020/12/15 19:43:17 ******/
DROP TABLE IF EXISTS [dbo].[Directions]
GO
USE [master]
GO
/****** Object:  Database [sergei]    Script Date: 2020/12/15 19:43:17 ******/
DROP DATABASE IF EXISTS [sergei]
GO
/****** Object:  Database [sergei]    Script Date: 2020/12/15 19:43:17 ******/
CREATE DATABASE [sergei]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'sergei', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\sergei.mdf' , SIZE = 8192KB , MAXSIZE = 102400KB , FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'sergei_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\sergei_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [sergei] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [sergei].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [sergei] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [sergei] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [sergei] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [sergei] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [sergei] SET ARITHABORT OFF 
GO
ALTER DATABASE [sergei] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [sergei] SET AUTO_SHRINK ON 
GO
ALTER DATABASE [sergei] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [sergei] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [sergei] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [sergei] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [sergei] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [sergei] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [sergei] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [sergei] SET  DISABLE_BROKER 
GO
ALTER DATABASE [sergei] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [sergei] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [sergei] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [sergei] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [sergei] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [sergei] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [sergei] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [sergei] SET RECOVERY FULL 
GO
ALTER DATABASE [sergei] SET  MULTI_USER 
GO
ALTER DATABASE [sergei] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [sergei] SET DB_CHAINING OFF 
GO
ALTER DATABASE [sergei] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [sergei] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [sergei] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [sergei] SET QUERY_STORE = OFF
GO
USE [sergei]
GO
/****** Object:  Table [dbo].[Directions]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Directions](
	[NumDir] [int] NOT NULL,
	[Title] [nvarchar](50) NULL,
	[Quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[NumDir] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[NumGr] [varchar](50) NOT NULL,
	[NumDir] [int] NULL,
	[NumSt] [int] NULL,
	[Quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[NumGr] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[NumSt] [int] IDENTITY(1,1) NOT NULL,
	[FIO] [nvarchar](50) NULL,
	[NumGr] [varchar](50) NULL,
 CONSTRAINT [PK__Students__E33EDA9ED4BFF05B] PRIMARY KEY CLUSTERED 
(
	[NumSt] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Student_Data]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Student_Data] AS
SELECT Distinct Students.FIO, Directions.Title FROM Students, Groups, Directions Where Directions.NumDir = (Select NumDir from Groups where NumGr = Students.NumGr)
GO
/****** Object:  Table [dbo].[Balls]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Balls](
	[IdBall] [int] IDENTITY(1,1) NOT NULL,
	[IdDisc] [int] NULL,
	[NumSt] [int] NULL,
	[Ball] [int] NULL,
	[DateEx] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdBall] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SH_Over3]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SH_Over3] AS
SELECT Students.FIO, AVG(ball) as 'Avg Ball'
FROM Students Join Balls ON Balls.NumSt = Students.NumSt 
WHERE LEFT(Students.FIO, 1) = N'Ш' 
GROUP BY Students.FIO 
HAVING AVG(ball) > 3
GO
/****** Object:  Table [dbo].[Disciplines]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Disciplines](
	[NumDisc] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[NumDisc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Uplans]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Uplans](
	[IdDisc] [int] IDENTITY(1,1) NOT NULL,
	[NumDir] [int] NULL,
	[NumDisc] [int] NULL,
	[Semestr] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDisc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Disciplines_with_balls]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Disciplines_with_balls] AS
SELECT Distinct Name FROM Disciplines
INNER JOIN Uplans ON Disciplines.NumDisc=Uplans.NumDisc
INNER JOIN Balls ON Uplans.IdDisc=Balls.IdDisc;
GO
/****** Object:  View [dbo].[Students_top_and_last]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Students_top_and_last] (Fio, Complete) AS 
 (SELECT A.Stud, 'NO' FROM (SELECT NumSt AS Stud  FROM Students
	EXCEPT Select Distinct NumSt AS Stud FROM Balls) AS A)
UNION
 (SELECT NumSt, 'Five' FROM Balls WHERE Ball=5);
GO
/****** Object:  View [dbo].[Students_complete]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Students_complete] (NumSt, Fio, Direction, Numer_of_balls) AS 
SELECT B.NumSt, S.Fio, U.NumDir, COUNT(Ball) as 'Count' FROM Balls B JOIN Uplans U ON B.IdDisc = U.IdDisc and U.Semestr = 1
JOIN Students S on S.NumSt = B.NumSt Group by B.NumSt, U.NumDir, S.Fio
	HAVING Count(Ball)=(SELECT COUNT( *) FROM Uplans UP WHERE U.NumDir=UP.NumDir and semestr=1)

GO
/****** Object:  View [dbo].[Students_complete_2]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Students_complete_2] AS 
	SELECT Students.NumSt FROM Students JOIN Groups ON Groups.NumGr = Students.NumGr WHERE NOT EXISTS (SELECT * FROM Uplans  
		WHERE (Semestr=CONVERT(int, LEFT(Students.NumGr,1))*2-1 OR 
		Semestr=CONVERT(int, LEFT(Students.NumGr,1))*2) AND 
		Groups.NumDir=Uplans.NumDir AND NOT EXISTS (SELECT * FROM Balls
 		WHERE Balls.IdDisc=Uplans.IdDisc and Students.NumSt=Balls.NumSt) );
GO
/****** Object:  Table [dbo].[ArchiveStudents]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArchiveStudents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Year] [int] NOT NULL,
	[NumSt] [int] NOT NULL,
	[FIO] [nvarchar](30) NOT NULL,
	[NumGr] [varchar](10) NOT NULL,
 CONSTRAINT [PK_ArchiveStudents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Balls] ON 

INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (1, 7, 1, 4, CAST(N'2014-01-10' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (2, 1, 2, 3, CAST(N'2014-01-14' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (3, 7, 6, 5, CAST(N'2014-01-10' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (4, 7, 13, 4, CAST(N'2014-01-10' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (5, 7, 15, 5, CAST(N'2014-01-10' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (6, 7, 17, 5, CAST(N'2014-01-10' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (7, 7, 14, 4, CAST(N'2014-01-12' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (8, 1, 18, 5, CAST(N'2014-01-14' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (9, 1, 19, 4, CAST(N'2014-01-14' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (10, 3, 18, 5, CAST(N'2014-01-16' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (11, 3, 18, 4, CAST(N'2014-02-23' AS Date))
INSERT [dbo].[Balls] ([IdBall], [IdDisc], [NumSt], [Ball], [DateEx]) VALUES (1011, 3, NULL, 5, CAST(N'2008-10-01' AS Date))
SET IDENTITY_INSERT [dbo].[Balls] OFF
GO
INSERT [dbo].[Directions] ([NumDir], [Title], [Quantity]) VALUES (230100, N'Информатика и вычислительная техника', 10)
INSERT [dbo].[Directions] ([NumDir], [Title], [Quantity]) VALUES (230200, N'Системы автоматического управления', 5)
INSERT [dbo].[Directions] ([NumDir], [Title], [Quantity]) VALUES (230400, N'Информационные системы и технологии', 10)
INSERT [dbo].[Directions] ([NumDir], [Title], [Quantity]) VALUES (231000, N'Программная инженерия', 10)
INSERT [dbo].[Directions] ([NumDir], [Title], [Quantity]) VALUES (231200, N'Чилл', 0)
GO
SET IDENTITY_INSERT [dbo].[Disciplines] ON 

INSERT [dbo].[Disciplines] ([NumDisc], [Name]) VALUES (1, N'Физика')
INSERT [dbo].[Disciplines] ([NumDisc], [Name]) VALUES (2, N'Математика')
INSERT [dbo].[Disciplines] ([NumDisc], [Name]) VALUES (3, N'Электроника')
INSERT [dbo].[Disciplines] ([NumDisc], [Name]) VALUES (4, N'Философия')
SET IDENTITY_INSERT [dbo].[Disciplines] OFF
GO
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'13504/1', 231000, 1, 5)
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'13504/2', 231000, 3, 5)
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'13504/3', 230100, 5, 10)
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'13504/4', 230400, 8, 10)
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'23504/1', 231000, 1, 0)
INSERT [dbo].[Groups] ([NumGr], [NumDir], [NumSt], [Quantity]) VALUES (N'63504/3', NULL, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (1, N'Иванов Иван', N'13504/1')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (2, N'Смирнов Василий', N'13504/4')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (3, N'Житников Петр', N'13504/2')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (4, N'Семенов Николай', N'13504/2')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (5, N'Веселов Андрей', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (6, N'Шуман Дмитрий', N'13504/1')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (7, N'Симонов Евгений', N'13504/2')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (8, N'Епифанова Зинаида', N'13504/4')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (9, N'Сумарокова Нина', N'13504/4')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (10, N'Широков Алексей', N'13504/4')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (11, N'Ветрова Ксения', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (12, N'Свечнова Елена', N'13504/4')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (13, N'Житомирская Екатерина', N'13504/1')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (14, N'Никодимов Семен', N'13504/2')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (15, N'Шведов Эдуард', N'13504/1')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (16, N'Светлов Сергей', N'13504/2')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (17, N'Кленова Жанна', N'13504/1')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (18, N'Пугачев Емельян', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (19, N'Нарышкин Петр', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (20, N'Романова Екатерина', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (25, N'Новая Наталья', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (26, N'Светлова Вероника', N'13504/3')
INSERT [dbo].[Students] ([NumSt], [FIO], [NumGr]) VALUES (35, N'Уходящий Павел', N'63504/3')
SET IDENTITY_INSERT [dbo].[Students] OFF
GO
SET IDENTITY_INSERT [dbo].[Uplans] ON 

INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (1, 230100, 1, 1)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (2, 230100, 1, 2)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (3, 230100, 2, 1)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (4, 230100, 2, 2)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (5, 230100, 3, 2)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (6, 230100, 4, 1)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (7, 231000, 1, 1)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (8, 231000, 2, 2)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (9, 231000, 3, 2)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (10, 230400, 1, 1)
INSERT [dbo].[Uplans] ([IdDisc], [NumDir], [NumDisc], [Semestr]) VALUES (11, 230400, 2, 2)
SET IDENTITY_INSERT [dbo].[Uplans] OFF
GO
ALTER TABLE [dbo].[Balls]  WITH CHECK ADD FOREIGN KEY([IdDisc])
REFERENCES [dbo].[Uplans] ([IdDisc])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Balls]  WITH CHECK ADD  CONSTRAINT [FK__Balls__NumSt__34C8D9D1] FOREIGN KEY([NumSt])
REFERENCES [dbo].[Students] ([NumSt])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Balls] CHECK CONSTRAINT [FK__Balls__NumSt__34C8D9D1]
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD FOREIGN KEY([NumDir])
REFERENCES [dbo].[Directions] ([NumDir])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Groups] FOREIGN KEY([NumGr])
REFERENCES [dbo].[Groups] ([NumGr])
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Groups]
GO
ALTER TABLE [dbo].[Uplans]  WITH CHECK ADD FOREIGN KEY([NumDir])
REFERENCES [dbo].[Directions] ([NumDir])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Uplans]  WITH CHECK ADD FOREIGN KEY([NumDisc])
REFERENCES [dbo].[Disciplines] ([NumDisc])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Directions]  WITH CHECK ADD CHECK  (([Quantity]>=(0) AND [Quantity]<=(20)))
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD CHECK  (([Quantity]>=(0) AND [Quantity]<=(20)))
GO
/****** Object:  StoredProcedure [dbo].[Back_Students_Complete]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Back_Students_Complete]
AS
INSERT INTO Students SELECT FIO, NumGr  FROM ArchiveStudents WHERE LEFT(NumGr,1)=6;
DELETE FROM ArchiveStudents WHERE LEFT(NumGr,1)=6;
GO
/****** Object:  StoredProcedure [dbo].[Count_Students]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Count_Students] AS
SELECT COUNT(*) FROM Students
GO
/****** Object:  StoredProcedure [dbo].[Count_Students_Sem]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--2. Пример создания процедуры c входным параметром. Создаем процедуру для подсчета студентов, сдавших хотя бы один экзамен в заданном семестре
CREATE PROCEDURE [dbo].[Count_Students_Sem] @Count_sem AS INT
AS
SELECT COUNT(Distinct NumSt) FROM Balls JOIN Uplans ON Uplans.IdDisc=Balls.IdDisc WHERE Semestr=@Count_sem;
GO
/****** Object:  StoredProcedure [dbo].[Delete_Students_Complete]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Delete_Students_Complete]
AS
INSERT INTO ArchiveStudents SELECT YEAR(GETDATE()), NumSt, FIO, NumGr  FROM Students WHERE LEFT(NumGr,1)=6;
DELETE FROM Students WHERE LEFT(NumGr,1)=6;
GO
/****** Object:  StoredProcedure [dbo].[Enter_Students]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Enter_Students] (@Fio AS NVARCHAR(30), @Group AS VARCHAR(10))  AS
INSERT INTO Students (FIO, NumGr) VALUES (@Fio, @Group);
GO
/****** Object:  StoredProcedure [dbo].[List_Students_Dir]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[List_Students_Dir] (@Dir AS INT, @Disc AS VARCHAR(30))
AS
SELECT Distinct Students.FIO FROM Groups
JOIN Students ON Groups.NumGr=Students.NumGr
JOIN Balls ON Students.NumSt=Balls.NumSt
JOIN Uplans ON Uplans.IdDisc=Balls.IdDisc
WHERE Groups.NumDir=@Dir and NumDisc=(SELECT NumDisc FROM Disciplines WHERE Name=@Disc);
GO
/****** Object:  StoredProcedure [dbo].[Next_Course]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Next_Course] (@Group AS VARCHAR(50)='13504/1')
AS
BEGIN
DECLARE @New_Group VARCHAR(50);
SET @New_Group = CONVERT(char(1),CONVERT(int, LEFT(@Group,1))+1)+ SUBSTRING(@Group,2,LEN(@Group)-1);
DECLARE @NumDir int
DECLARE @NumSt int
DECLARE @Quantity int
SET @NumDir = (Select NumDir from Groups where NumGr = @Group)
SET @NumSt = (Select NumSt from Groups where NumGr = @Group)
SET @Quantity = (Select Quantity from Groups where NumGr = @Group)
if not exists (Select * from Groups where NumGr = @New_Group)
	BEGIN
		INSERT INTO Groups (NumGr,NumDir, NumSt, Quantity) VALUES(@New_Group, @NumDir, @NumSt, @Quantity)
	END
else
	BEGIN
		UPDATE Groups SET Quantity = ((Select Quantity from Groups where NumGr = @New_Group) + @Quantity) WHERE NumGr = @New_Group
	END
UPDATE Students SET NumGr=@New_Group
 WHERE NumGr=@Group;
UPDATE Groups Set Quantity=0 WHERE NumGr=@Group;
END
GO
/****** Object:  StoredProcedure [dbo].[Next_Course_2]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Next_Course_2] 
AS
EXEC Delete_Students_Complete;
UPDATE Students SET NumGr=CONVERT(char(1),CONVERT(int, LEFT(NumGr,1))+1)+ SUBSTRING(NumGr,2,LEN(NumGr)-1)
 WHERE NumSt IN (SELECT NumSt FROM Students_complete_2);
GO
/****** Object:  StoredProcedure [dbo].[Number_Groups]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Number_Groups] (@Dir AS int, @Number AS int OUTPUT)
AS
SELECT @Number = COUNT(NumGr) FROM Groups WHERE NumDir=@Dir;
GO
/****** Object:  StoredProcedure [dbo].[Prev_Course]    Script Date: 2020/12/15 19:43:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Prev_Course] (@Group AS VARCHAR(50)='23504/1')
AS
BEGIN
DECLARE @Old_Group VARCHAR(50);
SET @Old_Group = CONVERT(char(1),CONVERT(int, LEFT(@Group,1))-1)+ SUBSTRING(@Group,2,LEN(@Group));
DECLARE @NumDir int
DECLARE @NumSt int
DECLARE @Quantity int
SET @NumDir = (Select NumDir from Groups where NumGr = @Group)
SET @NumSt = (Select NumSt from Groups where NumGr = @Group)
SET @Quantity = (Select Quantity from Groups where NumGr = @Group)
if not exists (Select * from Groups where NumGr = @Old_Group)
	BEGIN
		INSERT INTO Groups (NumGr,NumDir, NumSt, Quantity) VALUES(@Old_Group, @NumDir, @NumSt, @Quantity)
	END
else
	BEGIN
		UPDATE Groups SET Quantity = ((Select Quantity from Groups where NumGr = @Old_Group) + @Quantity) WHERE NumGr = @Old_Group
	END

UPDATE Students SET NumGr=@Old_Group
 WHERE NumGr=@Group;
UPDATE Groups Set Quantity=0 WHERE NumGr=@Group;
END
GO
USE [master]
GO
ALTER DATABASE [sergei] SET  READ_WRITE 
GO
