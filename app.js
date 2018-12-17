const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const boom = require('boom');
app.set('PORT', PORT);

app.get('/', (req, res) => {
  let originalValue = req.query.originalValue;
  let months = req.query.months;
  let miles = req.query.miles;
  let owners = req.query.owners;
  let collisions = req.query.collisions;
  res.setHeader('Content-Type', 'application/json');

  // calucate depreciation based on age

  if (months == 120 || !months > 120) {
    throw boom.badRequest('months cannot be greater than or equal to 120');
    // res.render('500');
  }

  if (miles == 150000) {
    throw boom.badRequest('miles cannot be ');
  }

  let ageDepreciation = months ? originalValue - months * 0.005 * originalValue : res.status(404);

  // caluclate based on miles
  let milesDepreciation = miles
    ? ageDepreciation - (miles / 1000) * 0.02 * ageDepreciation
    : res.status(404);

  // previous owners - if greater than 2 than do this before collisions
  if (owners > 2) {
    let ownersDepreciation = milesDepreciation - 0.25 * milesDepreciation;

    let collisionDepreciation =
      collisions < 5 ? ownersDepreciation - collisions * 0.2 * ownersDepreciation : false;

    res.send(JSON.stringify({ finalValue: collisionDepreciation }));
  } else {
    let collisionDepreciation =
      collisions < 5 ? milesDepreciation - collisions * 0.2 * milesDepreciation : false;

    let ownersAppreciation = collisionDepreciation + 0.1 * collisionDepreciation;

    res.send(JSON.stringify({ finalValue: ownersAppreciation }));
  }
});

app.listen(app.get('PORT'), function() {
  console.log(
    'Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.'
  );
});
