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
  let query = `EXEC Add_Worker '${req.query.PassportNumber}', '${req.query.FullName}', '${req.query.BirthDate}', '${req.query.TaxId}', '${req.query.Login}', '${req.query.Password}';` // SQL query
  if(!req.query.PassportNumber || !Number.isInteger(+req.query.PassportNumber || req.query.PassportNumber.length != 10)){
    res.end(`{"error":"Введите корректный номер паспорта"}`)
  }
  AdminQuery(query, req, res)
});

app.get('/find-worker', function (req, res) {
  let query = `SELECT * FROM Workers where WorkerId = '${req.query.WorkerId}' or FullName = '${req.query.FullName}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/alter-worker', function (req, res) {
  let query = `UPDATE Workers
  SET PassportNumber = '${req.query.PassportNumber}', FullName = '${req.query.FullName}', BirthDate='${req.query.BirthDate}', TaxId = '${req.query.TaxId}', CriminalRecords = ${req.query.CriminalRecords}, AuthId = ${req.query.AuthId}
  WHERE WorkerId = '${req.query.WorkerId}'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/delete-worker', function (req, res) {
  let query = `UPDATE Workers
  SET PassportNumber = 'DELETED', FullName = 'DELETED', BirthDate='1970-01-01', TaxId = 'DELETED', CriminalRecords = NULL, AuthId = NULL
  WHERE WorkerId = '${req.query.WorkerId}'` // SQL query
  AdminQuery(query, req, res)
});
/*
app.get('/complex/', function (req, res) {
  let query = `` // SQL query
  AdminQuery(query, req, res)
});
*/

/* GET result of some SQL query */
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

