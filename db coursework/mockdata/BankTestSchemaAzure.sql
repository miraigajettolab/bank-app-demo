/****** Object:  Database [BankTest]    Script Date: 2020/11/19 21:58:13 ******/
CREATE DATABASE [BankTest]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_Gen5_2', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
/****** !!!!!!!!!!!! YOU HAVE TO RUN THE CODE ABOVE FIRST ON THE MASTER DATABASE !!!!!!!!!!!! ******/
ALTER DATABASE [BankTest] SET COMPATIBILITY_LEVEL = 150
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
ALTER DATABASE [BankTest] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BankTest] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BankTest] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BankTest] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BankTest] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BankTest] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BankTest] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BankTest] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BankTest] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [BankTest] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BankTest] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BankTest] SET  MULTI_USER 
GO
ALTER DATABASE [BankTest] SET ENCRYPTION ON
GO
ALTER DATABASE [BankTest] SET QUERY_STORE = ON
GO
ALTER DATABASE [BankTest] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
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
/******CREATE UNIQUE CONSTRAINTS******/
CREATE UNIQUE INDEX UC_Clients_PassportNumber
  ON Clients(PassportNumber)
GO
CREATE UNIQUE INDEX UC_Clients_TaxId
  ON Clients(TaxId)
  WHERE TaxId IS NOT NULL
GO
CREATE UNIQUE INDEX UC_Clients_TelephoneNumber
  ON Clients(TelephoneNumber)
  WHERE TelephoneNumber IS NOT NULL
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
	[Description] [varchar](max) NOT NULL,
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
/****** ADD BASIC SERVICES DATA ******/
SET IDENTITY_INSERT [dbo].[Services] ON 
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (1, 12, 8.4, 1, NULL, NULL, N'RUB', 0.0000, N'High Interest Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (2, 60, 0.01, 1, NULL, NULL, N'RUB', 0.0000, N'Long Term Flexible Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (3, 12, 1.5, 1, NULL, NULL, N'JPY', 0.0000, N'High Interest Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (4, 60, 0.01, 1, NULL, NULL, N'JPY', 0.0000, N'Long Term Flexible Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (5, 12, 2.25, 1, NULL, NULL, N'USD', 0.0000, N'High Interest Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (6, 60, 0.01, 1, NULL, NULL, N'USD', 0.0000, N'Long Term Flexible Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (7, 12, 3.1, 1, NULL, NULL, N'EUR', 0.0000, N'High Interest Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (8, 60, 0.01, 1, NULL, NULL, N'EUR', 0.0000, N'Long Term Flexible Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (9, 12, 4.12, 1, NULL, NULL, N'CNY', 0.0000, N'High Interest Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (10, 60, 0.01, 1, NULL, NULL, N'CNY', 0.0000, N'Long Term Flexible Deposit')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (11, 60, 10.2, 0, NULL, NULL, N'RUB', 80000.0000, N'Regular Loan')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (12, 240, 9.66, 0, NULL, NULL, N'RUB', 50000.0000, N'Mortgage')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (13, 60, 2.9, 0, NULL, NULL, N'JPY', 200000.0000, N'Regular Loan')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (14, 240, 2.47, 0, NULL, NULL, N'JPY', 120000.0000, N'Mortgage')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (15, 60, 5.2, 0, NULL, NULL, N'USD', 1600.0000, N'Regular Loan')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (16, 240, 2.88, 0, NULL, NULL, N'USD', 900.0000, N'Mortgage')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (17, 60, 4.5, 0, NULL, NULL, N'EUR', 1250.0000, N'Regular Loan')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (18, 240, 1.76, 0, NULL, NULL, N'EUR', 760.0000, N'Mortgage')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (19, 60, 4.35, 0, NULL, NULL, N'CNY', 8000.0000, N'Regular Loan')
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description]) VALUES (20, 240, 4.65, 0, NULL, NULL, N'CNY', 4575.0000, N'Mortgage')
SET IDENTITY_INSERT [dbo].[Services] OFF
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
/******CREATE UNIQUE CONSTRAINTS******/
CREATE UNIQUE INDEX UC_Auth_Login
  ON Auth(Login)
GO
CREATE UNIQUE INDEX UC_Auth_PasswordHash
  ON Auth(PasswordHash)
GO

/****** Object:  Table [dbo].[Exchange]    Script Date: 2020/11/19 04:20:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exchange](
	[ExchangeId] [int] IDENTITY(1,1) NOT NULL,
	[From] [varchar](3) NOT NULL,
	[To] [varchar](3) NOT NULL,
	[Rate] [money] NOT NULL,
 CONSTRAINT [PK_Exchange] PRIMARY KEY CLUSTERED 
(
	[ExchangeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** ADD CURRENCY EXCHANGE DATA ******/
SET IDENTITY_INSERT [dbo].[Exchange] ON 
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (1, N'RUB', N'JPY', 1.3700)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (2, N'RUB', N'USD', 0.0130)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (3, N'RUB', N'EUR', 0.0110)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (4, N'RUB', N'CNY', 0.0860)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (5, N'JPY', N'RUB', 0.7300)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (6, N'JPY', N'USD', 0.0096)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (7, N'JPY', N'EUR', 0.0081)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (8, N'JPY', N'CNY', 0.0063)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (9, N'USD', N'RUB', 75.9900)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (10, N'USD', N'JPY', 103.8300)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (11, N'USD', N'EUR', 0.8400)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (12, N'USD', N'CNY', 6.5600)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (13, N'EUR', N'RUB', 89.9700)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (14, N'EUR', N'JPY', 122.9300)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (15, N'EUR', N'USD', 1.1800)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (16, N'EUR', N'CNY', 7.7700)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (17, N'CNY', N'RUB', 11.5800)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (18, N'CNY', N'JPY', 15.8300)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (19, N'CNY', N'USD', 0.1500)
INSERT [dbo].[Exchange] ([ExchangeId], [From], [To], [Rate]) VALUES (20, N'CNY', N'EUR', 0.1300)
SET IDENTITY_INSERT [dbo].[Exchange] OFF
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
/******CREATE UNIQUE CONSTRAINTS******/
CREATE UNIQUE INDEX UC_Workers_PassportNumber
  ON Workers(PassportNumber)
GO
CREATE UNIQUE INDEX UC_Workers_TaxId
  ON Workers(TaxId)
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
@AccountCreatorId AS INT, @TaxId VARCHAR(12) = NULL, @TelephoneNumber VARCHAR(11) = NULL, @IncomePerMonth MONEY = NULL)
AS
	IF (@IncomePerMonth != NULL AND @IncomePerMonth < 0)
	BEGIN
		RAISERROR('ERROR: Income can not be negative',15,1);
		RETURN;
	END;
	ELSE
	BEGIN
		INSERT INTO Clients(PassportNumber,FullName,BirthDate, AccountCreatorId, TaxId, TelephoneNumber, IncomePerMonth)
		VALUES (@PassportNumber, @FullName, @BirthDate, @AccountCreatorId, @TaxId, @TelephoneNumber, @IncomePerMonth);
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

ALTER DATABASE [BankTest] SET  READ_WRITE 
GO
