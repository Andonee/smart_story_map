export const getBoundingBox = data => {
	var bounds = {},
		coords,
		latitude,
		longitude

	for (var i = 0; i < data.length; i++) {
		coords = data

		for (var j = 0; j < coords.length; j++) {
			longitude = coords[j][0]
			latitude = coords[j][1]
			bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude
			bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude
			bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude
			bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude
		}
	}

	return bounds
}
