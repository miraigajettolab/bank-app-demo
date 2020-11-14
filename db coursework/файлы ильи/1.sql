use Bank

--1 номера телефонов клиентов, которые не совершали транзакции в определенный период времени
SELECT ClientId, TelephoneNumber, FullName
FROM Clients
WHERE ClientId NOT IN (
SELECT DISTINCT ClientId
FROM (
SELECT  BankAccounts.ClientId, Transactions.Timestamp, Transactions.TransferAccountId, Clients.TelephoneNumber
FROM Transactions
JOIN BankAccounts ON BankAccounts.BankAccountId = Transactions.TransferAccountId
JOIN Clients ON BankAccounts.ClientId = Clients.ClientId
WHERE Transactions.Timestamp >= '2020-01-01' and Transactions.Timestamp <= '2020-12-01'
) AS tmp)

--2 номера телефонов клиентов с днем рождения в определенный день
SELECT Clients.FullName, Clients.TelephoneNumber FROM Clients
WHERE DAY(Clients.BirthDate) = 12
    AND MONTH(Clients.BirthDate) = 12

--3 информация о транзакциях превышающих 600000 рублей (есть закон такой)
SELECT Transactions.TransactionId, Transactions.Total,Transactions.Currency, Transactions.Timestamp FROM Transactions
WHERE Transactions.Total > 600000 and Transactions.Currency = 'RUB'


--4 Топ работников авторизировавших наибольшее число транзакций
SELECT TOP(10) Transactions.AuthorisedWorkerId,  Workers.FullName, Count(*) AS 'Count' FROM Transactions
JOIN Workers ON Transactions.AuthorisedWorkerId = Workers.WorkerId
WHERE Transactions.Timestamp >= '2020-10-01' and Transactions.Timestamp <= '2020-11-01'
GROUP BY AuthorisedWorkerId, FullName

--5 Сколько всего банк начислил процентов по кредитам на данный момент
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) AS 'Sum' FROM BankAccounts
WHERE BankAccounts.IsDebit = 'False' and Currency = 'RUB'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'False' and Currency = 'USD'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'False' and Currency = 'EUR'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'False' and Currency = 'JPY'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'False' and Currency = 'CNY'
GROUP BY BankAccounts.Currency

--6 сколько всего банк начислил процентов по вкладам на данный момент
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) AS 'Sum'  FROM BankAccounts
WHERE BankAccounts.IsDebit = 'True' and Currency = 'RUB'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'True' and Currency = 'USD'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'True' and Currency = 'EUR'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'True' and Currency = 'JPY'
GROUP BY BankAccounts.Currency
UNION
SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) FROM BankAccounts
WHERE BankAccounts.IsDebit = 'True' and Currency = 'CNY'
GROUP BY BankAccounts.Currency

--7 Условия услуг в соответствии с количеством открытых с этими условиями счетов
SELECT tmp.Count, tmp.ServiceId, Services.Interest, Services.IsDebit, Services.Months, Services.RequiredIncome, Services.Currency
FROM (
SELECT BankAccounts.ServiceId , COUNT(*) as 'Count'
FROM BankAccounts
GROUP BY BankAccounts.ServiceId
) AS tmp 
JOIN Services ON Services.ServiceId = tmp.ServiceId
ORDER BY tmp.Count DESC

--8 Общий оборот транзакций с указанной валютой за указанный период времени
SELECT Transactions.Currency, SUM(Transactions.Total) AS 'Sum' FROM Transactions
WHERE Transactions.Currency = 'RUB' AND Transactions.Status = 1 AND 
Transactions.Timestamp >= '2020-11-01' AND Transactions.Timestamp <= '2020-12-01'
GROUP BY Transactions.Currency

--9 Количество Зарегестрированных клиентов и авторизированных транзакций конкретным оператором
SELECT  'Registered Clients' AS 'Kind Of Work', COUNT(*) AS 'Count' FROM Clients
WHERE Clients.AccountCreatorId = 1 --WorkerID
GROUP BY Clients.AccountCreatorId
UNION 
SELECT 'Authorised Transactions', COUNT(*) FROM Transactions
JOIN Workers ON Transactions.AuthorisedWorkerId = Workers.WorkerId
WHERE AuthorisedWorkerId = 1 --WorkerID
GROUP BY AuthorisedWorkerId

--10 ID сервисов доступных клиенту учитывая его ежемесячный заработок
SELECT Services.ServiceId, Services.IsDebit, Services.RequiredIncome FROM Services
WHERE Services.RequiredIncome <= 
(SELECT Clients.IncomePerMonth FROM Clients WHERE ClientId = 8) --ClientID

--11 Вывести клиентов отсортированных по накоплениям в указанной валюте
SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.Total) as 'Sum' from BankAccounts
JOIN Clients on BankAccounts.ClientId = Clients.ClientId
WHERE BankAccounts.IsDebit = 'True' and BankAccounts.Currency = 'RUB'
GROUP BY Clients.FullName, Clients.ClientID
ORDER BY 'Sum' DESC

--12 Вывести клиентов отсортированных по долгам в указанной валюте
SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.Total) as 'Sum' from BankAccounts
JOIN Clients on BankAccounts.ClientId = Clients.ClientId
WHERE BankAccounts.IsDebit = 'False' and BankAccounts.Currency = 'RUB'
GROUP BY Clients.FullName, Clients.ClientID
ORDER BY 'Sum' DESC

--13 Вывести клиентов отсортированных по полученным процентным выплатам по вкладам
SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.AccumulatedInterest) as 'Sum' from BankAccounts
JOIN Clients on BankAccounts.ClientId = Clients.ClientId
WHERE BankAccounts.IsDebit = 'True' and BankAccounts.Currency = 'RUB'
GROUP BY Clients.FullName, Clients.ClientID
ORDER BY 'Sum' DESC

--14 Вывести клиентов отсортированных по отданных банку процентных выплатах  
SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.AccumulatedInterest) as 'Sum' from BankAccounts
JOIN Clients on BankAccounts.ClientId = Clients.ClientId
WHERE BankAccounts.IsDebit = 'False' and BankAccounts.Currency = 'RUB'
GROUP BY Clients.FullName, Clients.ClientID
ORDER BY 'Sum' DESC