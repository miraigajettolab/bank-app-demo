var express = require('express'); 
var app = express();
const { Connection, Request } = require("tedious");

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

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

/* GET result of some SQL query */
app.get('/', function (req, res) {
    const request = new Request(
      `SELECT TOP (10) * FROM [dbo].[Auth]`, // SQL query
      (err) => {
        if (err) {
          console.error("ERR:" + err.message);
          res.end(JSON.stringify(err))
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
});


