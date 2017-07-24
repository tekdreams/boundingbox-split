const createSmallBox = require(__dirname + '/boxTools').createSmallBox,
boxError = require(__dirname + '/utils').boxError;

const validBoxParameters = boxParameters => {
	let validBox = true
	if (boxParameters && boxParameters.centerLat && boxParameters.centerLng && boxParameters.maxLat 
		&& boxParameters.minLat && boxParameters.maxLng && boxParameters.minLng) {
		for (let key in boxParameters) {
			boxParameters[key] = Number(boxParameters[key]);
			if (isNaN(boxParameters[key]))
				validBox = false	
		}
	} else
		validBox = false
	return validBox
}

const boundingBoxCutting = (boxParameters, cuttingTotal) => {
	return new Promise((resolve, reject) => {
		if (validBoxParameters(boxParameters) && cuttingTotal && !isNaN(cuttingTotal) && cuttingTotal >= 0) {
			cuttingTotal = Number(cuttingTotal);
			createSmallBox(boxParameters, cuttingTotal)
				.then(boxes => resolve(boxes))
		} else
			reject(boxError('Wrong or missing arguments'))
	})
}

exports.boundingBoxCutting = boundingBoxCutting;