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
  res.setHeader('Content-Type', 'application/json');

  let ageDepreciation =
    months < 120
      ? originalValue - months * 0.005 * originalValue
      : res.send({
          message: 'months can not be equal to or greater than 120'
        });

  let milesDepreciation =
    miles < 150000
      ? ageDepreciation - (miles / 1000) * 0.02 * ageDepreciation
      : res.send({
          message: 'miles can not be equal to or greater than 150000'
        });

  // previous owners - if greater than 2 than do this before collisions
  if (owners > 2) {
    let ownersDepreciation = milesDepreciation - 0.25 * milesDepreciation;

    let collisionDepreciation =
      collisions < 5
        ? ownersDepreciation - collisions * 0.2 * ownersDepreciation
        : res.send({
            message: 'collisions cannot be greater than or equal to 5'
          });

    res.send(JSON.stringify({ finalValue: collisionDepreciation }));
  } else {
    let collisionDepreciation =
      collisions < 5
        ? milesDepreciation - collisions * 0.2 * milesDepreciation
        : res.send({
            message: 'collisions cannot be greater than or equal to 5'
          });

    let ownersAppreciation = collisionDepreciation + 0.1 * collisionDepreciation;

    res.send(JSON.stringify({ finalValue: ownersAppreciation }));
  }
});

app.listen(app.get('PORT'), function() {
  console.log(
    'Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.'
  );
});
