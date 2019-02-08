require('dotenv').config()

const express = require('express');
const app = express();
const base = require('airtable').base('appDkEQ2u8xDILzEx');

app.listen(3000, function () {
  console.log('Example app listening on port 3000! This is cool');
});

app.get('/', function (req, res) {
  console.log('lEWIS');
  getBeers(function (message) {
    res.send(`<h2>Hello World!</h2> ${message}`);
  });
});

const getBeers = (callback) => {
  let message = '';
  base('Table 1').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 4,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
          console.log('Retrieved', record.get('Name'));
          message += '<li>' + record.get('Name') + '</li>';
      });

      message = '<ul>' + message + '</ul>';

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return err; }
      console.log(message);
      callback(message);
  });
};


