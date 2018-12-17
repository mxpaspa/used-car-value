const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('PORT', PORT);

app.get('/', (req, res) => {
  let originalValue = req.query.originalValue;
  let months = req.query.months;
  let miles = req.query.miles;
  let owners = req.query.owners;
  let collisions = req.query.collisions;

  // calucate depreciation based on age
  let ageDepreciation = months !== 120 ? originalValue - months * 0.005 * originalValue : false;

  // caluclate based on miles
  let milesDepreciation =
    miles !== 150000 ? ageDepreciation - (miles / 1000) * 0.02 * ageDepreciation : false;

  // previous owners - if greater than 2 than do this before collisions
  if (owners > 2) {
    let ownersDepreciation = milesDepreciation - 0.25 * milesDepreciation;

    let collisionDepreciation =
      collisions < 5 ? ownersDepreciation - collisions * 0.2 * ownersDepreciation : false;

    res.json(collisionDepreciation);
  } else {
    let collisionDepreciation =
      collisions < 5 ? milesDepreciation - collisions * 0.2 * milesDepreciation : false;

    let ownersAppreciation = collisionDepreciation + 0.1 * collisionDepreciation;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ finalValue: ownersAppreciation }));
  }
});

app.listen(app.get('PORT'), function() {
  console.log(
    'Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.'
  );
});
