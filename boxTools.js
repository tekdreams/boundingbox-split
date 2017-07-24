const _ = require('underscore')

const getBoundingBox = (boundingCenter, center, upperLeft, upperRight, lowerLeft, lowerRight) => {
	/* CREATE NEW BOUNDING BOX FROM CENTER FOR THE NEXT COMPARTIMENT*/
	let  boundingBox = new Array (), boxParam = {}, mainPosition = null;
	if (boundingCenter.position == 'upperLeft')
		mainPosition = upperLeft;
	else if (boundingCenter.position == 'upperRight')
		mainPosition = upperRight;
	else if (boundingCenter.position == 'lowerLeft')
		mainPosition = lowerLeft;
	else if (boundingCenter.position == 'lowerRight')
		mainPosition = lowerRight;
	mainPosition.lat = mainPosition.maxLat ? mainPosition.maxLat : mainPosition.minLat;
	mainPosition.lng = mainPosition.maxLng ? mainPosition.maxLng : mainPosition.minLng;
	boxParam.maxLat = center.centerLat > mainPosition.lat ? center.centerLat : mainPosition.lat;
	boxParam.minLat = center.centerLat < mainPosition.lat ? center.centerLat : mainPosition.lat;
	boxParam.maxLng = center.centerLng > mainPosition.lng ? center.centerLng : mainPosition.lng;
	boxParam.minLng = center.centerLng < mainPosition.lng ? center.centerLng : mainPosition.lng;
	boxParam.centerLat = boundingCenter.lat;
	boxParam.centerLng = boundingCenter.lng;
	return boxParam;
}

const getNewBoxes = params => {
	return new Promise((resolve, reject) => {
	/* GET THE 4 CENTERS OF THE NEW BOX */
		let newCoordinates = new Array ();
		/* Box Builder */
			const upperLeft = { maxLat: params.maxLat , minLng: params.minLng },
			upperRight = { maxLat: params.maxLat , maxLng: params.maxLng },
			lowerLeft = { minLat: params.minLat , minLng: params.minLng },
			lowerRight = { minLat: params.minLat , maxLng: params.maxLng },
			center = { centerLat: params.centerLat , centerLng: params.centerLng };
 			/* Box Builder */
		let boxCenter = {};
		boxCenter = { lat: (upperLeft.maxLat + center.centerLat) / 2, 
							lng: (upperLeft.minLng + center.centerLng) / 2, position: 'upperLeft' };
		newCoordinates.push(boxCenter);
		boxCenter = {};
		boxCenter = { lat: (upperRight.maxLat + center.centerLat) / 2, 
							lng: (upperRight.maxLng + center.centerLng) / 2, position: 'upperRight' };
		newCoordinates.push(boxCenter);
		boxCenter = {};
		boxCenter = { lat: (lowerLeft.minLat + center.centerLat) / 2, 
							lng: (lowerLeft.minLng + center.centerLng) / 2, position: 'lowerLeft' };
		newCoordinates.push(boxCenter);
		boxCenter = {};
		boxCenter = { lat: (lowerRight.minLat + center.centerLat) / 2, 
							lng: (lowerRight.maxLng + center.centerLng) / 2, position: 'lowerRight' };
		newCoordinates.push(boxCenter);
		return Promise.all(_.map(newCoordinates, function(boundingCenter) {
			return getBoundingBox(boundingCenter, center, upperLeft, upperRight, lowerLeft, lowerRight)
		}))
		.then(lilBox => resolve(lilBox))
	})
}

const boxMaker = tmpParams => {
	return new Promise((resolve, reject) => {
		const paramsPromises = Promise.all(_.map(tmpParams, function (params) { return getNewBoxes(params) }))
		.then(lilBox => {
			lilBox = _.flatten(lilBox)
			resolve(lilBox)
		})
	})
}

exports.createSmallBox = (boxParameters, boxCutting) => {
	return new Promise((resolve, reject) => {
		let tmpParams = new Array ();
		tmpParams.push(boxParameters);
		let getBoxArray = tmpParams => {
			boxMaker(tmpParams)
			.then(lilBox => {
				--boxCutting;
				if (boxCutting == 0)
					resolve(lilBox)
				else
					getBoxArray(lilBox);	
			})		
		}
		getBoxArray(tmpParams);
	})
}
