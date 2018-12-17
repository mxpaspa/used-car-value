# used-car

A Node/Express server that calculates the value of a used car based off:
 * originalValue: The original purchase price of the car. Must not contain comma seperated numbers
 * months: the age of the car in months, must be whole integers
 * miles: the number of miles on the car. Must not contain comma seperated numbers
 * owners: the number of onwers on the car. Either greater than 2 or 0.
 * collisions: the number of collisions the car has had

## Usage

#### 1. Start the server:

```
node app.js
```
#### 2. Navigate to localhost:5000: 

#### 3. Enter a query:

```
http://localhost:5000/?originalValue=50000&months=12&miles=10000&owners=3&collisions=2
```

#### 4. The server will return the final value via a JSON object.
```
{"finalValue":16920}
```
