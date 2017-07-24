const bbox = require('./BoxCutting.js');

console.log()
const boxParameters = {
  centerLat : '2.352221900000177',
  centerLng : 48.856614,
  maxLat : '48.815573',
  minLat : 48.9021449,
  maxLng : 2.22519299999999,
  minLng : 2.4699207999999544
}

  describe('Test BoxCutting', function() {
    it('should call boundingBoxCutting endpoint', () => {
      return bbox.boundingBoxCutting(boxParameters, 2)
      .then(boxes => console.log(boxes))
      .catch(error => console.log(error))
    });
  });