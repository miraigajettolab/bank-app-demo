USE [master]
GO
/****** Object:  Database [BankTest]    Script Date: 2020/11/18 19:58:22 ******/
CREATE DATABASE [BankTest]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BankTest', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\BankTest.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BankTest_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\BankTest_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [BankTest] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BankTest].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BankTest] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BankTest] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BankTest] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BankTest] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BankTest] SET ARITHABORT OFF 
GO
ALTER DATABASE [BankTest] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BankTest] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BankTest] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BankTest] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BankTest] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BankTest] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BankTest] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BankTest] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BankTest] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BankTest] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BankTest] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BankTest] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BankTest] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BankTest] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BankTest] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BankTest] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BankTest] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BankTest] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BankTest] SET  MULTI_USER 
GO
ALTER DATABASE [BankTest] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BankTest] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BankTest] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BankTest] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BankTest] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BankTest] SET QUERY_STORE = OFF
GO
USE [BankTest]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[PassportNumber] [varchar](10) NOT NULL,
	[FullName] [varchar](200) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[TaxId] [varchar](12) NULL,
	[TelephoneNumber] [varchar](11) NULL,
	[AuthId] [int] NULL,
	[ClientId] [int] IDENTITY(1,1) NOT NULL,
	[IncomePerMonth] [money] NULL,
	[AccountCreatorId] [int] NOT NULL,
 CONSTRAINT [PK_Clients_1] PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ClientData]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ClientData] as 
SELECT * FROM Clients
GO
/****** Object:  Table [dbo].[BankTestAccounts]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankTestAccounts](
	[BankTestAccountId] [int] IDENTITY(1,1) NOT NULL,
	[IsDebit] [bit] NOT NULL,
	[ServiceId] [int] NOT NULL,
	[Total] [money] NOT NULL,
	[DateOfCreation] [date] NOT NULL,
	[Currency] [varchar](3) NOT NULL,
	[ClientId] [int] NOT NULL,
	[AccumulatedInterest] [money] NULL,
 CONSTRAINT [PK_BankTestAccounts] PRIMARY KEY CLUSTERED 
(
	[BankTestAccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[AccountsData]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[AccountsData] as 
SELECT ClientId, IsDebit, ServiceId, Total, DateOfCreation, Currency, AccumulatedInterest FROM BankTestAccounts
WHERE ClientId = 2 --ClientID
GO
/****** Object:  Table [dbo].[Services]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Services](
	[ServiceId] [int] IDENTITY(1,1) NOT NULL,
	[Months] [int] NOT NULL,
	[Interest] [float] NOT NULL,
	[IsDebit] [bit] NOT NULL,
	[LoanOverdueTerms] [varchar](max) NULL,
	[EarlyWithdrawalTerms] [varchar](max) NULL,
	[Currency] [varchar](3) NOT NULL,
	[RequiredIncome] [money] NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[ServicesData]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--3. Условия кредитов и вкладов
CREATE VIEW [dbo].[ServicesData] as 
SELECT * FROM Services
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[TransactionId] [int] IDENTITY(1,1) NOT NULL,
	[SourceAccountId] [int] NULL,
	[TransferAccountId] [int] NOT NULL,
	[Total] [money] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Currency] [varchar](3) NOT NULL,
	[AuthorisedWorkerId] [int] NULL,
	[Status] [smallint] NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ClientTransactionsData]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--4. Транзакции клиента
CREATE VIEW [dbo].[ClientTransactionsData] as 
SELECT ClientId, TransactionId, SourceAccountId, TransferAccountId, Transactions.Total, Timestamp, Transactions.Currency, AuthorisedWorkerId, Status FROM Transactions
JOIN BankTestAccounts ON Transactions.TransferAccountId = BankTestAccounts.BankTestAccountId
WHERE BankTestAccounts.ClientId = 2 --ClientID
GO
/****** Object:  View [dbo].[TransactionsData]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--5. Транзакции за указанный период времени
CREATE VIEW [dbo].[TransactionsData] as 
SELECT * FROM Transactions
where Timestamp >= '2020-11-01' AND Timestamp <= '2020-12-01'
GO
/****** Object:  Table [dbo].[Auth]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auth](
	[AuthId] [int] IDENTITY(1,1) NOT NULL,
	[Login] [varchar](80) NOT NULL,
	[PasswordHash] [varchar](64) NOT NULL,
 CONSTRAINT [PK_Auth] PRIMARY KEY CLUSTERED 
(
	[AuthId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Workers]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workers](
	[PassportNumber] [varchar](10) NOT NULL,
	[FullName] [varchar](200) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[TaxId] [varchar](12) NOT NULL,
	[CriminalRecords] [varbinary](max) NULL,
	[WorkerId] [int] IDENTITY(1,1) NOT NULL,
	[AuthId] [int] NOT NULL,
 CONSTRAINT [PK_Workers] PRIMARY KEY CLUSTERED 
(
	[WorkerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[BankTestAccounts]  WITH CHECK ADD  CONSTRAINT [FK_BankTestAccounts_Clients] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Clients] ([ClientId])
GO
ALTER TABLE [dbo].[BankTestAccounts] CHECK CONSTRAINT [FK_BankTestAccounts_Clients]
GO
ALTER TABLE [dbo].[BankTestAccounts]  WITH CHECK ADD  CONSTRAINT [FK_BankTestAccounts_Services] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Services] ([ServiceId])
GO
ALTER TABLE [dbo].[BankTestAccounts] CHECK CONSTRAINT [FK_BankTestAccounts_Services]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Auth] FOREIGN KEY([AuthId])
REFERENCES [dbo].[Auth] ([AuthId])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Auth]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Workers] FOREIGN KEY([AccountCreatorId])
REFERENCES [dbo].[Workers] ([WorkerId])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Clients_Workers]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_BankTestAccounts] FOREIGN KEY([SourceAccountId])
REFERENCES [dbo].[BankTestAccounts] ([BankTestAccountId])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_BankTestAccounts]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_BankTestAccounts1] FOREIGN KEY([TransferAccountId])
REFERENCES [dbo].[BankTestAccounts] ([BankTestAccountId])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_BankTestAccounts1]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Workers] FOREIGN KEY([AuthorisedWorkerId])
REFERENCES [dbo].[Workers] ([WorkerId])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Workers]
GO
ALTER TABLE [dbo].[Workers]  WITH CHECK ADD  CONSTRAINT [FK_Workers_Auth] FOREIGN KEY([AuthId])
REFERENCES [dbo].[Auth] ([AuthId])
GO
ALTER TABLE [dbo].[Workers] CHECK CONSTRAINT [FK_Workers_Auth]
GO
/****** Object:  StoredProcedure [dbo].[Add_Client]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Add_Client](@PassportNumber AS VARCHAR(10), @FullName AS VARCHAR(200), @BirthDate AS DATE,
@AccountCreatorId AS INT)
AS
	IF EXISTS(SELECT PassportNumber FROM Clients where PassportNumber = @PassportNumber)
	BEGIN
		RAISERROR('ERROR: PassportNumber already exists for some client, please check the data',15,1);
		RETURN;
	END;
	ELSE
	BEGIN
		INSERT INTO Clients(PassportNumber,FullName,BirthDate, AccountCreatorId)
		VALUES (@PassportNumber, @FullName, @BirthDate, @AccountCreatorId);
	END;
GO
/****** Object:  StoredProcedure [dbo].[Add_Worker]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--完了
CREATE PROCEDURE [dbo].[Add_Worker](@PassportNumber AS VARCHAR(10), @FullName AS VARCHAR(200), @BirthDate AS DATE, @TaxId as varchar(12),
@Login as varchar(80), @Password as varchar(80))
AS
	--In case of an error, rollback will be issued automatically.
	set xact_abort on
	begin transaction
	
	IF EXISTS(SELECT PassportNumber FROM Workers where PassportNumber = @PassportNumber)
	BEGIN
		RAISERROR('ERROR: PassportNumber already exists for some worker, please check the data',15,1);
		RETURN;
	END;
	ELSE IF EXISTS(SELECT TaxId FROM Workers where TaxId = @TaxId)
	BEGIN
		RAISERROR('ERROR: TaxId already exists for some worker, please check the data',15,1);
		RETURN;
	END;
	ELSE
	BEGIN
		Declare @AuthId as int
		Declare @WorkerId as int
		insert into Auth(Login,PasswordHash) Values (@Login, 'promise'); --because of a circular dependency 
		set @AuthId = SCOPE_IDENTITY()
		INSERT INTO Workers(PassportNumber,FullName,BirthDate,TaxId, AuthId) VALUES (@PassportNumber, @FullName, @BirthDate, @TaxId, @AuthId);
		set @WorkerId = SCOPE_IDENTITY()
		--we still need to store real password's hash
		Update Auth set PasswordHash = CONVERT(varchar(64), HASHBYTES('SHA2_256', @Password + '' + CONVERT(varchar(10), @AuthId)),2) --salted hash
		from Workers as wk 
		where wk.AuthId = Auth.AuthId and wk.WorkerId = @WorkerId
		--the real password's hash is stored, promise is fulfilled, circular dependency is resolved. And everyone lived happily ever after...
	END;
	commit
GO
/****** Object:  StoredProcedure [dbo].[Change_Auth_Client]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Change_Auth_Client](@ClientId as int, @Login as varchar(80), @Password as varchar(80))
as
Update Auth
set Login = @Login, PasswordHash = CONVERT(varchar(64), HASHBYTES('SHA2_256', @Password + '' + CONVERT(varchar(10), @ClientId)),2)
from Clients as cl 
where cl.AuthId = Auth.AuthId and cl.ClientId = @ClientId
GO
/****** Object:  Trigger [dbo].[Auth_Login_Unique_Check]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Auth_Login_Unique_Check]
ON [dbo].[Auth]
AFTER INSERT, UPDATE
AS
BEGIN
	IF EXISTS(SELECT Login FROM Auth GROUP BY Login HAVING COUNT(*) > 1)
	BEGIN
		RAISERROR('ERROR: Login already exists for some worker or client, please check the data',16,1);
		--getting the problematic login
		declare @ProblematicLogin as varchar(80)
		set @ProblematicLogin = (SELECT TOP(1) Login FROM Auth GROUP BY Login HAVING COUNT(*) > 1)
		--getting the first auth id with this login
		declare @OriginalAuthId as int
		set @OriginalAuthId = (Select Top(1) AuthId from Auth where Login = (SELECT Login FROM Auth GROUP BY Login HAVING COUNT(*) > 1) Order By AuthId asc)
		--deleting the others
		DELETE FROM Auth WHERE Login = @ProblematicLogin and AuthId != @OriginalAuthId;
		RAISERROR('ATTENTION: New Auth row has been deleted',15,1);
	END;
END;
GO
ALTER TABLE [dbo].[Auth] ENABLE TRIGGER [Auth_Login_Unique_Check]
GO
/****** Object:  Trigger [dbo].[Account_Transfer]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--完了
CREATE TRIGGER [dbo].[Account_Transfer]
ON [dbo].[Transactions]
for insert
AS
BEGIN
	--In case of an error, rollback will be issued automatically.
	set xact_abort on
	begin transaction
		Update BankTestAccounts set BankTestAccounts.Total += (select Total from inserted)
		where BankTestAccounts.BankTestAccountId = (select TransferAccountId  from inserted)
		Update BankTestAccounts set BankTestAccounts.Total -= (select Total from inserted)
		where BankTestAccounts.BankTestAccountId = (select SourceAccountId  from inserted)
		Update Transactions set Transactions.Status = 1
		where Transactions.TransactionId = (select TransactionId from inserted)
	commit
END;
GO
ALTER TABLE [dbo].[Transactions] ENABLE TRIGGER [Account_Transfer]
GO
/****** Object:  Trigger [dbo].[Reject_Suspicious]    Script Date: 2020/11/18 19:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Reject_Suspicious]
ON [dbo].[Transactions]
after update
AS
BEGIN
	IF EXISTS(SELECT Total FROM Transactions where Total > 600000 and AuthorisedWorkerId is null and Status = 1)
	BEGIN
		RAISERROR('WARNING: SUSCICIOUS TRANSACTION HAS BEEN IDENTIFIED',15,1);
	--In case of an error, rollback will be issued automatically.
	set xact_abort on
	begin transaction
		Update BankTestAccounts set BankTestAccounts.Total -= (select Total from inserted)
		where BankTestAccounts.BankTestAccountId = (select TransferAccountId  from inserted)
		Update BankTestAccounts set BankTestAccounts.Total += (select Total from inserted)
		where BankTestAccounts.BankTestAccountId = (select SourceAccountId  from inserted)
		Update Transactions set Transactions.Status = -1
		where Transactions.TransactionId = (select TransactionId from inserted)
	commit
	RAISERROR('ATTENTION: SUSCICIOUS TRANSACTION HAS BEEN REVERSED',15,1);
	END;
END;
GO
ALTER TABLE [dbo].[Transactions] ENABLE TRIGGER [Reject_Suspicious]
GO
USE [master]
GO
ALTER DATABASE [BankTest] SET  READ_WRITE 
GO
