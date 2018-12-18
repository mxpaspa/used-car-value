module.exports = {
  getAgeDep: (originalValue, months) => {
    if (months < 120) {
      return originalValue - months * 0.005 * originalValue;
    } else {
      throw new Error('months can not be greater than or equal to 120');
    }
  },

  getMilesDep: (ageDepreciation, miles) => {
    if (miles < 150000) {
      return ageDepreciation - (miles / 1000) * 0.02 * ageDepreciation;
    } else {
      throw new Error('miles can not be greater than or equal to 150,000');
    }
  },

  getCollisionsDep: (depreciation, collisions) => {
    if (collisions < 5) {
      return depreciation - collisions * 0.2 * depreciation;
    } else {
      throw new Error('collisions can not be greater than or equal to 5');
    }
  }
};
