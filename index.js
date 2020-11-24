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

/* GET result of some SQL query */
app.get('/query', function (req, res) {
  let query = `SELECT TOP (${req.query.count}) * FROM [dbo].[${req.query.table}]` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/1', function (req, res) {
  let query = `SELECT ClientId, TelephoneNumber, FullName
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
  let query = `SELECT Clients.FullName, Clients.TelephoneNumber FROM Clients
  WHERE DAY(Clients.BirthDate) = ${req.query.day}
  AND MONTH(Clients.BirthDate) = ${req.query.month}` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/3', function (req, res) {
  let query = `SELECT Transactions.TransactionId, Transactions.Total,Transactions.Currency, Transactions.Timestamp, Transactions.Status FROM Transactions
  WHERE Transactions.Total > 600000 and Transactions.Currency = 'RUB'` // SQL query
  AdminQuery(query, req, res)
});

app.get('/complex/4', function (req, res) {
  let query = `SELECT TOP(10) Transactions.AuthorisedWorkerId,  Workers.FullName, Count(*) AS 'Count' FROM Transactions
  JOIN Workers ON Transactions.AuthorisedWorkerId = Workers.WorkerId
  WHERE Transactions.Timestamp >= '${req.query.timestampStart}' and Transactions.Timestamp <= '${req.query.timestampEnd}'
  GROUP BY AuthorisedWorkerId, FullName` // SQL query
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
  let query = `SELECT TOP (1000) * FROM [dbo].[Exchange]` // SQL query
  FreeQuery(query, req, res)
});

app.get('/services', function (req, res) {
  let query = `SELECT TOP (1000) * FROM [dbo].[Services]` // SQL query
  FreeQuery(query, req, res)
});

/* GET result of some SQL query */
app.get('/get-salt', function (req, res) {
    res.end(`{"salt": ${JSON.stringify(salt)}}`) // This salt is used to generate token
});

