USE [BankTest]
GO
SET IDENTITY_INSERT [dbo].[Auth] ON 

INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (1, N'worker1', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (2, N'clientJohn', N'634184E225238E9B6CA13B0A0FD3B04DEEC63AF44CF5190D90FE1CE6A1763C06')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (3, N'clientKilm', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (4, N'clientMitch', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (5, N'worker2', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (7, N'clientLeam', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (8, N'clientLuna', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (9, N'worker3', N'123456')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (43, N'TestWorkerLogin', N'E4139E04AD65D0D8997EF770F3B537670DA4E9F45FE7FC067769C6283217344E')
INSERT [dbo].[Auth] ([AuthId], [Login], [PasswordHash]) VALUES (45, N'TESTTEST', N'dfgdfgdfg')
SET IDENTITY_INSERT [dbo].[Auth] OFF
GO
SET IDENTITY_INSERT [dbo].[Workers] ON 

INSERT [dbo].[Workers] ([PassportNumber], [FullName], [BirthDate], [TaxId], [CriminalRecords], [WorkerId], [AuthId]) VALUES (N'1234567890', N'Fred Mayer', CAST(N'1974-06-14' AS Date), N'3664069397', NULL, 1, 1)
INSERT [dbo].[Workers] ([PassportNumber], [FullName], [BirthDate], [TaxId], [CriminalRecords], [WorkerId], [AuthId]) VALUES (N'1234567890', N'Lisa Moore', CAST(N'1982-03-21' AS Date), N'2343423423', NULL, 3, 5)
INSERT [dbo].[Workers] ([PassportNumber], [FullName], [BirthDate], [TaxId], [CriminalRecords], [WorkerId], [AuthId]) VALUES (N'1234567890', N'Michael Norm', CAST(N'1982-04-23' AS Date), N'2354355654', NULL, 4, 9)
INSERT [dbo].[Workers] ([PassportNumber], [FullName], [BirthDate], [TaxId], [CriminalRecords], [WorkerId], [AuthId]) VALUES (N'6835793678', N'TEST WORKER', CAST(N'1989-03-07' AS Date), N'385937684589', NULL, 13, 43)
INSERT [dbo].[Workers] ([PassportNumber], [FullName], [BirthDate], [TaxId], [CriminalRecords], [WorkerId], [AuthId]) VALUES (N'3543543534', N'sfdsdf', CAST(N'1928-03-23' AS Date), N'2354325654', NULL, 16, 43)
SET IDENTITY_INSERT [dbo].[Workers] OFF
GO
SET IDENTITY_INSERT [dbo].[Clients] ON 

INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1234567890', N'John Smith', CAST(N'2000-12-12' AS Date), N'7727563778', N'89001234567', 2, 2, 100000.0000, 1)
INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1234567891', N'Kilm Noon', CAST(N'1988-02-14' AS Date), N'3453453453', N'89011234567', 3, 4, 60000.0000, 1)
INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1234567892', N'Mitch Black', CAST(N'1990-02-23' AS Date), N'4355342342', N'89021234567', 4, 5, 120000.0000, 3)
INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1234567893', N'Leam Joom', CAST(N'1999-02-02' AS Date), N'4354362342', N'89031234567', 7, 6, 15000.0000, 1)
INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1234567894', N'Luna Brook', CAST(N'1970-12-30' AS Date), N'2323231232', N'89042342342', 8, 8, 80000.0000, 4)
INSERT [dbo].[Clients] ([PassportNumber], [FullName], [BirthDate], [TaxId], [TelephoneNumber], [AuthId], [ClientId], [IncomePerMonth], [AccountCreatorId]) VALUES (N'1345674598', N'Marcus Aurelius', CAST(N'1967-10-02' AS Date), NULL, NULL, NULL, 30, NULL, 4)
SET IDENTITY_INSERT [dbo].[Clients] OFF
GO
SET IDENTITY_INSERT [dbo].[Services] ON 

INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome]) VALUES (2, 12, 10, 1, NULL, NULL, N'RUB', 0.0000)
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome]) VALUES (3, 60, 15, 0, NULL, NULL, N'RUB', 80000.0000)
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome]) VALUES (8, 60, 0, 1, NULL, NULL, N'RUB', 0.0000)
INSERT [dbo].[Services] ([ServiceId], [Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome]) VALUES (9, 12, 2, 1, NULL, NULL, N'USD', 0.0000)
SET IDENTITY_INSERT [dbo].[Services] OFF
GO
SET IDENTITY_INSERT [dbo].[BankTestAccounts] ON 

INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (2, 1, 2, 3025000.0000, CAST(N'2020-10-01' AS Date), N'RUB', 2, 25000.0000)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (10, 0, 3, 924531.2500, CAST(N'2020-09-01' AS Date), N'RUB', 2, 24531.2500)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (18, 1, 2, 40000.0000, CAST(N'2020-11-01' AS Date), N'RUB', 4, 0.0100)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (20, 1, 8, 20000.0000, CAST(N'2020-11-02' AS Date), N'RUB', 4, 0.0000)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (23, 1, 9, 5008.3400, CAST(N'2020-10-03' AS Date), N'USD', 5, 8.3400)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (27, 1, 2, 19000.0000, CAST(N'2020-11-01' AS Date), N'RUB', 5, 0.0000)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (29, 1, 2, 102100.0000, CAST(N'2020-10-06' AS Date), N'RUB', 2, 1000.0000)
INSERT [dbo].[BankTestAccounts] ([BankTestAccountId], [IsDebit], [ServiceId], [Total], [DateOfCreation], [Currency], [ClientId], [AccumulatedInterest]) VALUES (31, 1, 9, 10100.0000, CAST(N'2020-10-07' AS Date), N'USD', 2, 100.0000)
SET IDENTITY_INSERT [dbo].[BankTestAccounts] OFF
GO
SET IDENTITY_INSERT [dbo].[Transactions] ON 

INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (5, NULL, 2, 3000000.0000, CAST(N'2020-10-01T00:00:00.000' AS DateTime), N'RUB', 1, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (8, NULL, 10, 50000.0000, CAST(N'2020-10-02T00:00:00.000' AS DateTime), N'RUB', 1, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (9, NULL, 10, 50000.0000, CAST(N'2020-11-02T00:00:00.000' AS DateTime), N'RUB', 1, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (12, NULL, 18, 60000.0000, CAST(N'2020-11-01T00:00:00.000' AS DateTime), N'RUB', 1, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (14, 18, 20, 20000.0000, CAST(N'2020-11-02T00:00:00.000' AS DateTime), N'RUB', NULL, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (16, NULL, 23, 5000.0000, CAST(N'2020-10-03T00:00:00.000' AS DateTime), N'USD', 3, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (18, NULL, 27, 20000.0000, CAST(N'2020-11-01T00:00:00.000' AS DateTime), N'RUB', 3, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (19, NULL, 27, 1000000000.0000, CAST(N'2020-11-01T00:00:00.000' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (21, NULL, 29, 100000.0000, CAST(N'2020-10-06T00:00:00.000' AS DateTime), N'RUB', 1, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (22, NULL, 31, 10000.0000, CAST(N'2020-10-07T00:00:00.000' AS DateTime), N'USD', 3, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (33, NULL, 29, 100.0000, CAST(N'2020-11-16T07:56:01.730' AS DateTime), N'RUB', NULL, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (34, 27, 29, 100.0000, CAST(N'2020-11-16T07:56:22.070' AS DateTime), N'RUB', NULL, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (35, 27, 29, 100.0000, CAST(N'2020-11-16T08:02:23.243' AS DateTime), N'RUB', NULL, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (37, NULL, 29, 999999.0000, CAST(N'2020-11-16T08:15:53.663' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (38, NULL, 29, -999999.0000, CAST(N'2020-11-16T08:16:23.180' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (39, 27, 29, 999999.0000, CAST(N'2020-11-16T08:18:19.867' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (40, NULL, 29, 999999.0000, CAST(N'2020-11-16T08:39:42.690' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (41, 27, 29, 999999.0000, CAST(N'2020-11-16T08:39:42.700' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (42, 27, 29, 800.0000, CAST(N'2020-11-16T15:40:49.313' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (43, 27, 29, 800.0000, CAST(N'2020-11-16T15:41:14.097' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (44, 27, 29, 800.0000, CAST(N'2020-11-16T15:41:42.267' AS DateTime), N'RUB', NULL, -1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (45, 27, 29, 800.0000, CAST(N'2020-11-16T15:42:08.290' AS DateTime), N'RUB', NULL, 1)
INSERT [dbo].[Transactions] ([TransactionId], [SourceAccountId], [TransferAccountId], [Total], [Timestamp], [Currency], [AuthorisedWorkerId], [Status]) VALUES (46, 27, 29, 1000000000.0000, CAST(N'2020-11-16T15:43:20.320' AS DateTime), N'RUB', NULL, -1)
SET IDENTITY_INSERT [dbo].[Transactions] OFF
GO
