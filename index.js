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
    server: "miraigajettolab.database.windows.net", 
    options: {
      database: "BankTest", 
      encrypt: true,
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

function executeComplexQuery(query) {


}

// Start server
var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log(`app listening at http://${host}:${port}`)
});


function AdminQuery(sqlQuery, req) {
  console.log(req.headers)
  if (!req.header('Auth-Token')) {
    err = "ERR: You have to provide an admin token as 'Auth-Token' header to use this method. The token is generated as sha256(UserName + salt + Password), you can get salt at /get-salt"
    console.error(err);
    return JSON.stringify(err)
  }
  if (req.header('Auth-Token') != authHash) {
    err = "ERR: Authentication failed"
    console.error(err);
    return JSON.stringify(err)
  }
  if (!sqlQuery) {
    err = "ERR: You have to provide a query"
    console.error(err);
    return JSON.stringify(err)
  }
  const request = new Request(
    sqlQuery, // SQL query
    (err) => {
      if (err) {
        console.error("ERR:" + err.message);
        return JSON.stringify(err)
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

      res.end(`{"count": ${JSON.stringify(rowCount)}, "data": ${filtered}}`) // Final response
  });
  connection.execSql(request);
}

/* GET result of some SQL query */
app.get('/query', function (req, res) {
  let query = `SELECT TOP (${req.query.count}) * FROM [dbo].[${req.query.table}]` // SQL query
  res.end(AdminQuery(query, req))
});

/* GET result of some SQL query */
app.get('/get-salt', function (req, res) {
    res.end(`{"salt": ${JSON.stringify(salt)}}`) // This salt is used to generate token
});

