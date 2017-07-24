const boundingBoxCutting = require(__dirname + '/BoxCutting').boundingBoxCutting;

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
      return boundingBoxCutting(boxParameters, 2)
      .then(boxes => console.log(boxes))
      .catch(error => console.log(error))
    });
  });