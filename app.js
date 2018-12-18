const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const calc = require('./calc.js');

app.set('PORT', PORT);

app.get('/', (req, res) => {
  let originalValue = req.query.originalValue;
  let months = req.query.months;
  let miles = req.query.miles;
  let owners = req.query.owners;
  let collisions = req.query.collisions;

  let ageDepreciation = calc.getAgeDep(originalValue, months);
  let milesDepreciation = calc.getMilesDep(ageDepreciation, miles);

  // previous owners - if greater than 2 than do this before collisions
  if (owners > 2) {
    let ownersDepreciation = milesDepreciation - 0.25 * milesDepreciation;
    let collisionDepreciation = calc.getCollisionsDep(ownersDepreciation, collisions);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ finalValue: collisionDepreciation }));
  } else {
    let collisionDepreciation = calc.getCollisionsDep(milesDepreciation, collisions);
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
