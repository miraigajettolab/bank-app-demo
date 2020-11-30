var express = require('express'); 
var app = express();
const { Connection, Request } = require("tedious");
var crypto = require('crypto');

// Create connection to database
const config = {
    authentication: {
      options: {
        userName: "miraigajettolab", 
        password: "dk.fguhw43b7@t-8p3g4t\\`v08" // Don't forget to escape characters that need it
      },
      type: "default"
    },
    server: "DESKTOP-3LJNSD6",//"miraigajettolab.database.windows.net", 
    options: {
      port: 32434, //local stuff
      database: 'BankTest',
      instancename: 'SQLEXPRESS', //local stuff
      encrypt: true,
      trustServerCertificate: true, //local stuff
      rowCollectionOnDone: true
    }
};
const salt = "cc4d9cf3d979a055caf6092bf2a8c76e" // Used to change token without changing Username or Password, this is public information
const authHash = crypto.createHash('sha256').update(config.authentication.options.userName+salt+config.authentication.options.password).digest('hex');

const connection = new Connection(config);

// Attempt to connect
connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Successful login")
    }
  });

// Start server
var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log(`app listening at http://${host}:${port}`)
});

//to get just errors
function AdminQueryNoRes(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide an admin token as 'Auth-Token' header to use this method. The token is generated as sha256(UserName + salt + Password), you can get salt at /get-salt"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (req.header('Auth-Token') != authHash) {
    err = "Authentication failed"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    sqlQuery, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      } else {
        res.end(`{"res":"success"}`) // Final response
      }
    }
  );
  connection.execSql(request);
}

function AdminQuery(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide an admin token as 'Auth-Token' header to use this method. The token is generated as sha256(UserName + salt + Password), you can get salt at /get-salt"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (req.header('Auth-Token') != authHash) {
    err = "Authentication failed"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    sqlQuery, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      }
    }
  );
  request.on('doneInProc', function (rowCount, more, rows) { // This event is called after the request if completed
      // There's too much metadata so we filter some of it out
      let filtered = "["
      rows.forEach(row => {
          filtered += "{"
          row.forEach(col => {
              filtered += `"${col.metadata.colName}":"${col.value}",`
          })
          filtered = filtered.slice(0, -1) // Removing trailing comma
          filtered += "},"
      })
      filtered = filtered.slice(0, -1) // Removing trailing comma
      filtered += "]"

      res.end(`{"count": ${JSON.stringify(rowCount)}, "data": ${rowCount == 0 ? "[]" : filtered}}`) // Final response
  });
  connection.execSql(request);
}

function WorkerQueryNoRes(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide a token as 'Auth-Token' header to use this method"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    `IF EXISTS(SELECT * FROM Auth WHERE PasswordHash = '${req.header('Auth-Token')}' AND EXISTS(SELECT * FROM Workers WHERE Auth.AuthId = Workers.AuthId))
    BEGIN
      ${sqlQuery}
    END
    ELSE
    BEGIN
      (SELECT 'AUTH_ERROR')
    END`, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      } else {	
        res.end(`{"res":"success"}`) // Final response
      }
    }
  );
  connection.execSql(request);
}


function WorkerQuery(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide a token as 'Auth-Token' header to use this method"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    `IF EXISTS(SELECT * FROM Auth WHERE PasswordHash = '${req.header('Auth-Token')}' AND EXISTS(SELECT * FROM Workers WHERE Auth.AuthId = Workers.AuthId))
    BEGIN
      ${sqlQuery}
    END
    ELSE
    BEGIN
      (SELECT 'AUTH_ERROR')
    END`, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      }
    }
  );
  request.on('doneInProc', function (rowCount, more, rows) { // This event is called after the request if completed
      // There's too much metadata so we filter some of it out
      let filtered = "["
      rows.forEach(row => {
          filtered += "{"
          row.forEach(col => {
              filtered += `"${col.metadata.colName}":"${col.value}",`
          })
          filtered = filtered.slice(0, -1) // Removing trailing comma
          filtered += "},"
      })
      filtered = filtered.slice(0, -1) // Removing trailing comma
      filtered += "]"
      if (rowCount != undefined) {
        res.end(`{"count": ${JSON.stringify(rowCount)}, "data": ${rowCount == 0 ? "[]" : filtered}}`) // Final response
      }
  });
  connection.execSql(request);
}

function ClientQueryNoRes(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide a token as 'Auth-Token' header to use this method"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    `IF EXISTS(SELECT * FROM Auth WHERE PasswordHash = '${req.header('Auth-Token')}' AND EXISTS(SELECT * FROM Clients WHERE Auth.AuthId = Clients.AuthId))
    BEGIN
      ${sqlQuery}
    END
    ELSE
    BEGIN
      (SELECT 'AUTH_ERROR')
    END`, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      } else {	
        res.end(`{"res":"success"}`) // Final response
      }
    }
  );
  connection.execSql(request);
}

function ClientQuery(sqlQuery, req, res) {
  if (!req.header('Auth-Token')) {
    err = "You have to provide a token as 'Auth-Token' header to use this method"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    `IF EXISTS(SELECT * FROM Auth WHERE PasswordHash = '${req.header('Auth-Token')}' AND EXISTS(SELECT * FROM Clients WHERE Auth.AuthId = Clients.AuthId))
    BEGIN
      ${sqlQuery}
    END
    ELSE
    BEGIN
      (SELECT 'AUTH_ERROR')
    END`, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      }
    }
  );
  request.on('doneInProc', function (rowCount, more, rows) { // This event is called after the request if completed
      // There's too much metadata so we filter some of it out
      let filtered = "["
      rows.forEach(row => {
          filtered += "{"
          row.forEach(col => {
              filtered += `"${col.metadata.colName}":"${col.value}",`
          })
          filtered = filtered.slice(0, -1) // Removing trailing comma
          filtered += "},"
      })
      filtered = filtered.slice(0, -1) // Removing trailing comma
      filtered += "]"
      if (rowCount != undefined && filtered[0] !== "]") {
        res.end(`{"count": ${JSON.stringify(rowCount)}, "data": ${rowCount == 0 ? "[]" : filtered}}`) // Final response
      }
  });
  connection.execSql(request);
}

function FreeQuery(sqlQuery, req, res) {
  if (!sqlQuery) {
    err = "You have to provide a query"
    console.error("ERR:" + err);
    res.end(`{"error":"${err}"}`)
  }
  const request = new Request(
    sqlQuery, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        res.end(`{"error":${JSON.stringify(err.message)}}`)
      }
    }
  );
  request.on('doneInProc', function (rowCount, more, rows) { // This event is called after the request if completed
      // There's too much metadata so we filter some of it out
      let filtered = "["
      rows.forEach(row => {
          filtered += "{"
          row.forEach(col => {
              filtered += `"${col.metadata.colName}":"${col.value}",`
          })
          filtered = filtered.slice(0, -1) // Removing trailing comma
          filtered += "},"
      })
      filtered = filtered.slice(0, -1) // Removing trailing comma
      filtered += "]"

      res.end(`{"count": ${JSON.stringify(rowCount)}, "data": ${rowCount == 0 ? "[]" : filtered}}`) // Final response
  });
  connection.execSql(request);
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/* GET result of some SQL query */
app.get('/query', function (req, res) {
  let query = `${req.query.query}` // SQL query
  AdminQuery(query, req, res)
});

app.get('/')

app.get('/complex/1', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) ClientId, TelephoneNumber, FullName
  FROM Clients
  WHERE ClientId NOT IN (
  SELECT DISTINCT ClientId
  FROM (
  SELECT  BankAccounts.ClientId, Transactions.Timestamp, Transactions.TransferAccountId, Clients.TelephoneNumber
  FROM Transactions
  JOIN BankAccounts ON BankAccounts.BankAccountId = Transactions.TransferAccountId
  JOIN Clients ON BankAccounts.ClientId = Clients.ClientId
  WHERE Transactions.Timestamp >= '${req.query.timestampStart}' and Transactions.Timestamp <= '${req.query.timestampEnd}'
  ) AS tmp)` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/2', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) Clients.ClientId, Clients.FullName, Clients.TelephoneNumber FROM Clients
  WHERE DAY(Clients.BirthDate) = '${req.query.day}'
  AND MONTH(Clients.BirthDate) = '${req.query.month}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/3', function (req, res) { //RESTRICTEDS
  let query = `SELECT TOP(${req.query.count}) Transactions.TransactionId, Transactions.Total,Transactions.Currency, Transactions.Timestamp, Transactions.Status FROM Transactions
  WHERE Transactions.Total > 600000 and Transactions.Currency = 'RUB' and
  Transactions.Timestamp >= '${req.query.timestampStart}' and Transactions.Timestamp <= '${req.query.timestampEnd}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/4', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) Transactions.AuthorisedWorkerId,  Workers.FullName, Count(*) AS 'Count' FROM Transactions
  JOIN Workers ON Transactions.AuthorisedWorkerId = Workers.WorkerId
  WHERE Transactions.Timestamp >= '${req.query.timestampStart}' and Transactions.Timestamp <= '${req.query.timestampEnd}'
  GROUP BY AuthorisedWorkerId, FullName
  ORDER BY 'Count' desc` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/5', function (req, res) {
  let query = `SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) AS 'Sum' FROM BankAccounts
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
  GROUP BY BankAccounts.Currency` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/6', function (req, res) {
  let query = `SELECT BankAccounts.Currency, SUM(BankAccounts.AccumulatedInterest) AS 'Sum'  FROM BankAccounts
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
  GROUP BY BankAccounts.Currency` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/7', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) tmp.Count, tmp.ServiceId, Services.Interest, Services.IsDebit, Services.Months, Services.RequiredIncome, Services.Currency
  FROM (
  SELECT BankAccounts.ServiceId , COUNT(*) as 'Count'
  FROM BankAccounts
  GROUP BY BankAccounts.ServiceId
  ) AS tmp 
  JOIN Services ON Services.ServiceId = tmp.ServiceId
  ORDER BY tmp.Count DESC` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/8', function (req, res) {
  let query = `SELECT Transactions.Currency, SUM(Transactions.Total) AS 'Sum' FROM Transactions
  WHERE Transactions.Currency = '${req.query.currency}' AND Transactions.Status = 1 AND 
  Transactions.Timestamp >= '${req.query.timestampStart}' AND Transactions.Timestamp <= '${req.query.timestampEnd}'
  GROUP BY Transactions.Currency` // SQL query
  AdminQuery(query, req, res)
});

//9 and 10 are for operator and client

app.get('/complex/11', function (req, res) {
  let query = `SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.Total) as 'Sum' from BankAccounts
  JOIN Clients on BankAccounts.ClientId = Clients.ClientId
  WHERE BankAccounts.IsDebit = 'True' and BankAccounts.Currency = '${req.query.currency}'
  GROUP BY Clients.FullName, Clients.ClientID
  ORDER BY 'Sum' DESC` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/12', function (req, res) {
  let query = `SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.Total) as 'Sum' from BankAccounts
  JOIN Clients on BankAccounts.ClientId = Clients.ClientId
  WHERE BankAccounts.IsDebit = 'False' and BankAccounts.Currency = '${req.query.currency}'
  GROUP BY Clients.FullName, Clients.ClientID
  ORDER BY 'Sum' DESC` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/13', function (req, res) {
  let query = `SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.AccumulatedInterest) as 'Sum' from BankAccounts
  JOIN Clients on BankAccounts.ClientId = Clients.ClientId
  WHERE BankAccounts.IsDebit = 'True' and BankAccounts.Currency = '${req.query.currency}'
  GROUP BY Clients.FullName, Clients.ClientID
  ORDER BY 'Sum' DESC` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/14', function (req, res) {
  let query = `SELECT Clients.FullName, Clients.ClientID, SUM(BankAccounts.AccumulatedInterest) as 'Sum' from BankAccounts
  JOIN Clients on BankAccounts.ClientId = Clients.ClientId
  WHERE BankAccounts.IsDebit = 'False' and BankAccounts.Currency = '${req.query.currency}'
  GROUP BY Clients.FullName, Clients.ClientID
  ORDER BY 'Sum' DESC` // SQL query
  AdminQuery(query, req, res)
});

app.get('/add-worker', function (req, res) {
  let query = `EXEC Add_Worker '${req.query.PassportNumber}', N'${req.query.FullName}', '${req.query.BirthDate}', '${req.query.TaxId}', '${req.query.Login}', '${req.query.Password}';` // SQL query
  if(!req.query.PassportNumber || !Number.isInteger(+req.query.PassportNumber) || req.query.PassportNumber.length != 10 ||  req.query.PassportNumber < 1 || req.query.PassportNumber[0] == '0'){
    res.end(`{"error":"Введите корректный номер паспорта (10 цифр)"}`)
  }
  else if(!req.query.FullName){
    res.end(`{"error":"Введите ФИО"}`)
  }
  else if(!req.query.TaxId || !Number.isInteger(+req.query.TaxId) || req.query.TaxId.length != 12 || req.query.TaxId[0] == '0'){
    res.end(`{"error":"Введите корректный ИНН (12 цифр)"}`)
  }
  else if(!req.query.Login || req.query.Login.length < 6 || req.query.Login.length > 80){
    res.end(`{"error":"Введите корректный логин (6-80 символов)"}`)
  }
  else if(!req.query.Password || req.query.Password.length < 10 || req.query.Password.length > 80){
    res.end(`{"error":"Введите корректный пароль (10-80 символов)"}`)
  }
  else {
    //res.end(`{"all":"right"}`)
    AdminQueryNoRes(query, req, res)
  }
});

app.get('/find-worker', function (req, res) {
  let query = `SELECT * FROM Workers where WorkerId = '${req.query.WorkerId}' or FullName = N'${req.query.FullName}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/alter-worker', function (req, res) {
  let query = `UPDATE Workers
  SET PassportNumber = '${req.query.PassportNumber}', FullName = N'${req.query.FullName}', BirthDate='${req.query.BirthDate}', TaxId = '${req.query.TaxId}', CriminalRecords = ${req.query.CriminalRecords}
  WHERE WorkerId = '${req.query.WorkerId}'` // SQL query
  if(!req.query.WorkerId || !Number.isInteger(+req.query.WorkerId) || req.query.WorkerId < 1){
    res.end('{"error":"Введите корректный Worker Id"}')
  }
  else if(!req.query.PassportNumber || !Number.isInteger(+req.query.PassportNumber) || req.query.PassportNumber.length != 10 || req.query.PassportNumber < 1 || req.query.PassportNumber[0] == '0'){
    res.end(`{"error":"Введите корректный номер паспорта (10 цифр)"}`)
  }
  else if(!req.query.FullName){
    res.end(`{"error":"Введите ФИО"}`)
  }
  else if(!req.query.TaxId || !Number.isInteger(+req.query.TaxId) || req.query.TaxId.length != 12 || req.query.TaxId[0] == '0'){
    res.end(`{"error":"Введите корректный ИНН (12 цифр)"}`)
  } 
  else {
    AdminQueryNoRes(query, req, res)
  }
});
app.get('/alter-worker-auth', function (req, res) {
  let query = `Update Auth
  set Login = '${req.query.Login}', PasswordHash = '${req.query.PasswordHash.toUpperCase()}'
  from Workers as wk 
  where wk.AuthId = Auth.AuthId and wk.WorkerId = '${req.query.WorkerId}'
  `
  if(!req.query.WorkerId || !Number.isInteger(+req.query.WorkerId) || req.query.WorkerId < 1){
    res.end('{"error":"Введите корректный Worker Id"}')
  }
  else if(!req.query.Login || req.query.Login.length < 6 || req.query.Login.length > 80){
    res.end(`{"error":"Введите корректный логин (6-80 символов)"}`)
  }
  else if(!req.query.PasswordHash || req.query.PasswordHash.length != 64){
    res.end(`{"error":"Хеш пароля не удовлетворяет выходу алгоритма sha256"}`)
  } 
  else {
    AdminQueryNoRes(query, req, res)
  }
});

app.get('/delete-worker', function (req, res) {
  let query = `UPDATE Workers
  SET PassportNumber = 'DELETED', FullName = 'DELETED', BirthDate='1970-01-01', TaxId = 'DELETED', CriminalRecords = NULL, AuthId = NULL
  WHERE WorkerId = '${req.query.WorkerId}'` // SQL query
  AdminQueryNoRes(query, req, res)
});

app.get('/find-service', function (req, res) {
  let query = `SELECT * FROM ServicesData where ServiceId = '${req.query.ServiceId}' or Currency = '${req.query.Currency}'` // SQL query
  FreeQuery(query, req, res)
});

app.get('/add-service', function (req, res) {
  let query = `INSERT [dbo].[Services] ([Months], [Interest], [IsDebit], [LoanOverdueTerms], [EarlyWithdrawalTerms], [Currency], [RequiredIncome], [Description], [IsDisabled]) 
  VALUES ('${req.query.Months}', '${req.query.Interest}', '${req.query.IsDebit}', N'${req.query.LoanOverdueTerms}', N'${req.query.EarlyWithdrawalTerms}', '${req.query.Currency}', '${req.query.RequiredIncome}', N'${req.query.Description}', 0)` // SQL query
  if(!req.query.Months || !Number.isInteger(+req.query.Months) || req.query.Months < 1){
    res.end(`{"error":"Введите корректное количество месяцев (натуральное число)"}`)
  }
  else if(!req.query.Interest || isNaN(parseFloat(req.query.Interest)) || !isFinite(req.query.Interest) || parseFloat(req.query.Interest) < 0){
    res.end(`{"error":"Введите корректную процентную ставку (неотрицательное вещественное число)"}`)
  }
  else if(!req.query.RequiredIncome || (isNaN(parseFloat(req.query.RequiredIncome)) && isFinite(req.query.RequiredIncome)) || parseFloat(req.query.RequiredIncome) < 0){
    res.end(`{"error":"Введите корректное количество необходимых доходов (неотрицательное вещественное число)"}`)
  }
  else {
    AdminQueryNoRes(query, req, res)
  }
});

app.get('/enable-service', function (req, res) {
  let query = `UPDATE Services
  SET IsDisabled = 0
  WHERE ServiceId = '${req.query.ServiceId}'` // SQL query
  AdminQueryNoRes(query, req, res)
});

app.get('/disable-service', function (req, res) {
  let query = `UPDATE Services
  SET IsDisabled = 1
  WHERE ServiceId = '${req.query.ServiceId}'` // SQL query
  AdminQueryNoRes(query, req, res)
});


app.get('/find-client', function (req, res) {
  let query = `SELECT * FROM Clients where ClientId = '${req.query.ClientId}' or FullName = N'${req.query.FullName}' or PassportNumber = '${req.query.PassportNumber}'` // SQL query
  WorkerQuery(query, req, res)
});

app.get('/add-client', function (req, res) {
  let query = `
  DECLARE @WorkerId AS INT
  SET @WorkerId = (SELECT WorkerId FROM Workers WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
  EXEC Add_Client '${req.query.PassportNumber}', N'${req.query.FullName}', '${req.query.BirthDate}', @WorkerId , ${req.query.TaxId.length > 0 ? "'" + req.query.TaxId + "'" : "NULL"}, ${req.query.TelephoneNumber.length > 0 ? "'" + req.query.TelephoneNumber + "'" : "NULL"}, ${req.query.IncomePerMonth.length > 0 ? "'" + req.query.IncomePerMonth + "'" : "NULL"};` // SQL query
  if(!req.query.PassportNumber || !Number.isInteger(+req.query.PassportNumber) || req.query.PassportNumber.length != 10 ||  req.query.PassportNumber < 1 || req.query.PassportNumber[0] == '0'){
    res.end(`{"error":"Введите корректный номер паспорта (10 цифр)"}`)
  }
  else if(!req.query.FullName){
    res.end(`{"error":"Введите ФИО"}`)
  }
  else if(req.query.TaxId.length > 0 && (!Number.isInteger(+req.query.TaxId) || req.query.TaxId.length != 12 || req.query.TaxId[0] == '0')){
    res.end(`{"error":"Введите корректный ИНН (12 цифр)"}`)
  }
  else if(req.query.IncomePerMonth.length > 0 && ((isNaN(parseFloat(req.query.IncomePerMonth)) && isFinite(req.query.IncomePerMonth)) || parseFloat(req.query.IncomePerMonth) < 0)){
    res.end(`{"error":"Введите корректное количество доходов (неотрицательное вещественное число)"}`)
  }
  else {
    //console.log(query)
    WorkerQueryNoRes(query, req, res)
  }
});

app.get('/alter-client', function (req, res) {
  let query = `UPDATE Clients
  SET PassportNumber = '${req.query.PassportNumber}', FullName = N'${req.query.FullName}', BirthDate='${req.query.BirthDate}', 
  TaxId = ${req.query.TaxId.length > 0 && req.query.TaxId !== undefined && req.query.TaxId.toUpperCase() !== "NULL" ? "'" + req.query.TaxId + "'" : "NULL"}, 
  TelephoneNumber = ${req.query.TelephoneNumber.length > 0 && req.query.TelephoneNumber !== undefined && req.query.TelephoneNumber.toUpperCase() !== "NULL" ? "'" + req.query.TelephoneNumber + "'" : "NULL"}, 
  IncomePerMonth = ${req.query.IncomePerMonth.length > 0 && req.query.IncomePerMonth !== undefined && req.query.IncomePerMonth.toUpperCase() !== "NULL" ? "'" + req.query.IncomePerMonth + "'" : "NULL"}
  WHERE ClientId = '${req.query.ClientId}'` // SQL query
  if(!req.query.ClientId || !Number.isInteger(+req.query.ClientId) || req.query.ClientId < 1){
    res.end('{"error":"Введите корректный Client Id"}')
  }
  else if(!req.query.PassportNumber || !Number.isInteger(+req.query.PassportNumber) || req.query.PassportNumber.length != 10 ||  req.query.PassportNumber < 1 || req.query.PassportNumber[0] == '0'){
    res.end(`{"error":"Введите корректный номер паспорта (10 цифр)"}`)
  }
  else if(!req.query.FullName){
    res.end(`{"error":"Введите ФИО"}`)
  }
  else if(req.query.TaxId.length > 0 && req.query.TaxId.toUpperCase() !== "NULL"  && (!Number.isInteger(+req.query.TaxId) || req.query.TaxId.length != 12 || req.query.TaxId[0] == '0')){
    res.end(`{"error":"Введите корректный ИНН (12 цифр)"}`)
  }
  else if(req.query.IncomePerMonth.length > 0 && req.query.IncomePerMonth.toUpperCase() !== "NULL"  && ((isNaN(parseFloat(req.query.IncomePerMonth)) && isFinite(req.query.IncomePerMonth)) || parseFloat(req.query.IncomePerMonth) < 0)){
    res.end(`{"error":"Введите корректное количество доходов (неотрицательное вещественное число)"}`)
  }
  else {
    //console.log(query)
    WorkerQueryNoRes(query, req, res)
  }
});

/*
app.get('/add-client-auth', function (req, res) { //NOTE that this doesn't set password, just a login
  let query = `Declare @AuthId as int
  Declare @Promise as varchar(64)
  Set @Promise = (SELECT CONVERT(varchar(64),LEFT(REPLACE(NEWID(),'-',''),64)))
  insert into Auth(Login,PasswordHash) Values ('${req.query.Login}', @Promise); --because of a circular dependency 
  set @AuthId = SCOPE_IDENTITY()
  UPDATE Clients
  SET AuthId = @AuthId
  WHERE ClientId = '${req.query.ClientId}'`
  if(!req.query.ClientId || !Number.isInteger(+req.query.ClientId) || req.query.ClientId < 1){
    res.end('{"error":"Введите корректный Client Id"}')
  }
  else if(!req.query.Login || req.query.Login.length < 6 || req.query.Login.length > 80){
    res.end(`{"error":"Введите корректный логин (6-80 символов)"}`)
  }
  else {
    WorkerQueryNoRes(query, req, res)
  }
});
*/

app.get('/alter-client-auth', function (req, res) {
  let query = `Update Auth
  set Login = '${req.query.Login}', PasswordHash = '${req.query.PasswordHash.toUpperCase()}'
  from Clients as cl 
  where cl.AuthId = Auth.AuthId and cl.ClientId = '${req.query.ClientId}'
  `
  if(!req.query.ClientId || !Number.isInteger(+req.query.ClientId) || req.query.ClientId < 1){
    res.end('{"error":"Введите корректный Client Id"}')
  }
  else if(!req.query.Login || req.query.Login.length < 6 || req.query.Login.length > 80){
    res.end(`{"error":"Введите корректный логин (6-80 символов)"}`)
  }
  else if(!req.query.PasswordHash || req.query.PasswordHash.length != 64){
    res.end(`{"error":"Хеш пароля не удовлетворяет выходу алгоритма sha256"}`)
  } 
  else {
    WorkerQueryNoRes(query, req, res)
  }
});

app.get('/delete-client', function (req, res) {
  let query = `UPDATE Clients
  SET PassportNumber = 'DELETED', FullName = 'DELETED', BirthDate='1970-01-01', TaxId = NULL, TelephoneNumber = NULL, IncomePerMonth = NULL, AuthId = NULL
  WHERE ClientId = '${req.query.ClientId}'` // SQL query
  WorkerQueryNoRes(query, req, res)
});

app.get('/find-bank-account', function (req, res) {
  let query = `SELECT * FROM BankAccounts where ClientId = '${req.query.ClientId}'` // SQL query
  WorkerQuery(query, req, res)
});

app.get('/add-bank-account', function (req, res) {
  let query = `
  DECLARE @WorkerId AS INT
  SET @WorkerId = (SELECT WorkerId FROM Workers WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
  EXEC Add_BankAccount '${req.query.ServiceId}', '${req.query.Total}', '${req.query.ClientId}', @WorkerId;` // SQL query
  if(req.query.ServiceId.length === 0){
    res.end(`{"error":"Предоставьте Id услуги"}`)
  }
  else if(req.query.Total.length === 0 || (isNaN(parseFloat(req.query.Total)) && isFinite(req.query.Total)) || parseFloat(req.query.Total) < 0){
    res.end(`{"error":"Введите корректную сумму (неотрицательное вещественное число)"}`)
  }
  else if(req.query.ClientId.length === 0){
    res.end(`{"error":"Предоставьте Id клиента"}`)
  }
  else {
    //console.log(query)
    WorkerQueryNoRes(query, req, res)
  }
});

app.get('/enable-bank-account', function (req, res) {
  let query = `UPDATE BankAccounts
  SET IsClosed = 0
  WHERE BankAccountId = '${req.query.BankAccountId}'` // SQL query
  WorkerQueryNoRes(query, req, res)
});

app.get('/disable-bank-account', function (req, res) {
  let query = `UPDATE BankAccounts
  SET IsClosed = 1
  WHERE BankAccountId = '${req.query.BankAccountId}'` // SQL query
  WorkerQueryNoRes(query, req, res)
});

app.get('/add-transaction', function (req, res) {
  let query = `
  DECLARE @WorkerId AS INT
  SET @WorkerId = (SELECT WorkerId FROM Workers WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
  INSERT INTO Transactions(SourceAccountId, TransferAccountId, Total, Currency, Timestamp, AuthorisedWorkerId, Status)
  VALUES (${req.query.SourceAccountId.length > 0 && req.query.SourceAccountId !== undefined && req.query.SourceAccountId.toUpperCase() !== "NULL" ? "'" + req.query.SourceAccountId + "'" : "NULL"},${req.query.TransferAccountId.length > 0 && req.query.TransferAccountId !== undefined && req.query.TransferAccountId.toUpperCase() !== "NULL" ? "'" + req.query.TransferAccountId + "'" : "NULL"}, '${req.query.Total}', '${req.query.Currency}', CURRENT_TIMESTAMP, @WorkerId, '0');` // SQL query
  
  if(req.query.SourceAccountId.length > 0 && req.query.SourceAccountId.toUpperCase() !== "NULL"  && (!Number.isInteger(+req.query.SourceAccountId) || parseInt(req.query.SourceAccountId) <= 0)){
    res.end(`{"error":"Предоставьте корректный номер счета с которого будут списаны средства"}`)
  }
  else if(req.query.TransferAccountId.length > 0 && req.query.TransferAccountId.toUpperCase() !== "NULL"  && (!Number.isInteger(+req.query.TransferAccountId) || parseInt(req.query.TransferAccountId) <= 0)){
    res.end(`{"error":"Предоставьте корректный номер счета на который поступят средства"}`)
  }
  else if(req.query.SourceAccountId.length === 0 && req.query.TransferAccountId.length === 0){
    res.end(`{"error":"Необходимо указать хотя бы один номер счета!"}`)
  }
  else if(req.query.Total.length === 0 || (isNaN(parseFloat(req.query.Total)) && isFinite(req.query.Total)) || parseFloat(req.query.Total) < 0){
    res.end(`{"error":"Введите корректную сумму (неотрицательное вещественное число)"}`)
  }
  else {
    //console.log(query)
    WorkerQueryNoRes(query, req, res)
  }
});

/*
app.get('/complex/', function (req, res) {
  let query = `` // SQL query
  AdminQuery(query, req, res)
});
*/

app.get('/view-client-data', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) * FROM ClientData WHERE ClientId = '${req.query.ClientId}'` // SQL query
  if(req.query.IsWorker === "true") {
    WorkerQuery(query, req, res)
  }
  else if (req.query.IsWorker === "false") {
    query = `DECLARE @ClientId AS INT
    SET @ClientId = (SELECT ClientId FROM Clients WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
    SELECT TOP(${req.query.count}) * FROM ClientData WHERE ClientId = @ClientId`
    ClientQuery(query, req, res)
  }
  else {
    res.end(`{"error":"Ты кто такой вообще?"}`)
  }
});

app.get('/view-accounts-data', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) * FROM AccountsData WHERE ClientId = '${req.query.ClientId}'` // SQL query
  if(req.query.IsWorker === "true") {
    WorkerQuery(query, req, res)
  }
  else if (req.query.IsWorker === "false") {
    query = `DECLARE @ClientId AS INT
    SET @ClientId = (SELECT ClientId FROM Clients WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
    SELECT TOP(${req.query.count}) * FROM AccountsData WHERE ClientId = @ClientId`
    ClientQuery(query, req, res)
  }
  else {
    res.end(`{"error":"Ты кто такой вообще?"}`)
  }
});

app.get('/view-client-transactions-data', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) * FROM ClientTransactionsData WHERE ClientId = '${req.query.ClientId}'` // SQL query
  if(req.query.IsWorker === "true") {
    WorkerQuery(query, req, res)
  }
  else if (req.query.IsWorker === "false") {
    query = `DECLARE @ClientId AS INT
    SET @ClientId = (SELECT ClientId FROM Clients WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
    SELECT TOP(${req.query.count}) * FROM ClientTransactionsData WHERE ClientId = @ClientId`
    ClientQuery(query, req, res)
  }
  else {
    res.end(`{"error":"Ты кто такой вообще?"}`)
  }
});

app.get('/add-transaction-client', function (req, res) {
  let query = `DECLARE @ClientId AS INT
  SET @ClientId = (SELECT ClientId FROM Clients WHERE AuthId = (SELECT AuthId FROM Auth Where PasswordHash = '${req.header('Auth-Token')}'))
  IF ((SELECT ClientId FROM BankAccounts WHERE BankAccountId = '${req.query.SourceAccountId}') = @ClientId)
  BEGIN
    INSERT INTO Transactions(SourceAccountId, TransferAccountId, Total, Currency, Timestamp, Status)
    VALUES ('${req.query.SourceAccountId}','${req.query.TransferAccountId}', '${req.query.Total}', '${req.query.Currency}', CURRENT_TIMESTAMP, '0');
  END
  ELSE
  BEGIN
    RAISERROR('Необходимо указать свой счет как счет списания!',15,1);
  END` // SQL query
  if(req.query.SourceAccountId.length === 0 || !Number.isInteger(+req.query.SourceAccountId) || parseInt(req.query.SourceAccountId) <= 0){
    res.end(`{"error":"Предоставьте корректный номер счета с которого будут списаны средства"}`)
  }
  else if(req.query.TransferAccountId.length === 0 || !Number.isInteger(+req.query.TransferAccountId) || parseInt(req.query.TransferAccountId) <= 0){
    res.end(`{"error":"Предоставьте корректный номер счета на который поступят средства"}`)
  }
  else if(req.query.Total.length === 0 || (isNaN(parseFloat(req.query.Total)) && isFinite(req.query.Total)) || parseFloat(req.query.Total) < 0){
    res.end(`{"error":"Введите корректную сумму (неотрицательное вещественное число)"}`)
  }
  else {
    //console.log(query)
    ClientQueryNoRes(query, req, res)
  }
});

app.get('/view-transactions-data', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) * FROM TransactionsData
	WHERE [Timestamp] >= '${req.query.timestampStart}' AND [Timestamp] <= '${req.query.timestampEnd}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/view-services', function (req, res) {
  let query = `SELECT TOP(${req.query.count}) * FROM ServicesData WHERE IsDisabled = '0'` // SQL query
  FreeQuery(query, req, res)
});

app.get('/exchange', function (req, res) {
  let query = `SELECT * FROM [dbo].[Exchange]` // SQL query
  FreeQuery(query, req, res)
});

app.get('/services', function (req, res) {
  let query = `SELECT * FROM [dbo].[Services]` // SQL query
  FreeQuery(query, req, res)
});

app.get('/check-login', function(req, res){
  let query = `SELECT AuthId FROM [dbo].[Auth] WHERE Login = '${req.query.login}' and ${req.query.isClient == 'true' ? "EXISTS(SELECT AuthId FROM Clients WHERE Clients.AuthId = Auth.AuthId)" : "EXISTS(SELECT AuthId FROM Workers WHERE Workers.AuthId = Auth.AuthId)"}`
  FreeQuery(query, req, res)
})

app.get('/check-auth', function(req, res){
  let query = `SELECT AuthId FROM [dbo].[Auth] WHERE Login = '${req.query.login}' and PasswordHash = '${req.query.token}'`
  FreeQuery(query, req, res)
})

/* GET result of some SQL query */
app.get('/get-salt', function (req, res) {
    res.end(`{"salt": ${JSON.stringify(salt)}}`) // This salt is used to generate token
});

