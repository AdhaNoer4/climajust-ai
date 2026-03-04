const locationMapping = require('./locationMapping.json');

const findAdm4ByLocation = (locationName) => {
  const key = locationName.toLowerCase();
  return locationMapping[key] || null;
};

module.exports = {
  findAdm4ByLocation
};