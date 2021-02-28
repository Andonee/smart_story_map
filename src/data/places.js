export const objects = [
	{
		gliwice: {
			type: 'FeatureCollection',
			name: 'gliwice',
			crs: {
				type: 'name',
				properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
			},
			features: [
				{
					type: 'Feature',
					properties: {
						id: '1',
						title: 'Ratusz',
						photo1:
							'https://www.24gliwice.pl/wiadomosci/wp-content/uploads/2018/11/1-ratusz-rynek-3-001-810x456.jpg',
						photo2: 'https://www.mapofpoland.pl/zdjecia-13880/Ratusz.jpg',
						photo3:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, nibh at lobortis tincidunt, sem nisl aliquam est, vel viverra lacus est at lorem. Morbi ut tempor dui, ut dictum nibh. Donec bibendum metus sed est luctus, lacinia commodo sapien lacinia. Donec posuere magna mi, eget elementum magna faucibus in. Sed accumsan libero nec diam fringilla finibus. ',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, nibh at lobortis tincidunt, sem nisl aliquam est, vel viverra lacus est at lorem. Morbi ut tempor dui, ut dictum nibh. Donec bibendum metus sed est luctus, lacinia commodo sapien lacinia. Donec posuere magna mi, eget elementum magna faucibus in. Sed accumsan libero nec diam fringilla finibus.',
						video:
							'https://www.youtube.com/watch?v=fGMX2N4FIaE&ab_channel=POLANDONAIR',
						audio: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3',
					},
					geometry: {
						type: 'Point',
						coordinates: [18.665623578058387, 50.293988016266397],
					},
				},
				{
					type: 'Feature',
					properties: {
						id: '2',
						title: 'Smart Geomatic',
						photo1:
							'https://www.smartgeomatic.pl/static/thumbnail/og/facebook/188.jpg',
						photo2:
							'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/149387863_2291503657661211_7225914888950520124_o.jpg?_nc_cat=107&ccb=3&_nc_sid=730e14&_nc_ohc=7fzUBgOtslsAX9YQP83&_nc_ht=scontent-waw1-1.xx&oh=8d80b60fc7b1e79346329546b9f8331e&oe=605F5F03',
						photo3: null,
						description:
							'Cras varius pellentesque velit et efficitur. Phasellus a odio iaculis, tincidunt augue vel, tristique enim. Sed pharetra dignissim dolor nec dignissim. Mauris ullamcorper nulla eget tellus imperdiet condimentum. Nam euismod purus interdum, auctor tortor eget, accumsan libero. Nunc accumsan, tellus ac auctor blandit, arcu nisl sodales justo, sit amet porttitor massa turpis vel purus. Nam vel consectetur nibh, imperdiet vulputate diam. Aliquam non urna venenatis, condimentum sem non, tempor elit.\n\n',
						video:
							'https://www.youtube.com/watch?v=p5saqi9OSdY&ab_channel=smartgeomatic',
						audio: null,
					},
					geometry: {
						type: 'Point',
						coordinates: [18.683886783512406, 50.291664105449449],
					},
				},
				{
					type: 'Feature',
					properties: {
						id: '3',
						title: 'Jakiś dłuższy tytuł w ramach el testu',
						photo1:
							'https://static.polityka.pl/_resource/res/path/a6/90/a69051e4-68fd-46c8-aab4-24bad2bdcd84',
						photo2: null,
						photo3: null,
						description: null,
						video: null,
						audio: null,
					},
					geometry: {
						type: 'Point',
						coordinates: [18.672603773216665, 50.269503789751894],
					},
				},
				{
					type: 'Feature',
					properties: {
						id: '4',
						title: 'Poligon',
						photo1:
							'https://cms.qz.com/wp-content/uploads/2014/12/storm-troopers.jpg?quality=75&strip=all&w=1600&h=900&crop=1',
						photo2: null,
						photo3: null,
						description:
							'Integer sem libero, varius vel rhoncus a, ornare et tortor. Curabitur a nisi ac nisl tincidunt imperdiet. Mauris porttitor ultrices elementum. Donec vitae nulla nibh. Integer lectus ligula, auctor vitae odio sit amet, pellentesque consequat libero. Proin id pharetra enim',
						video: null,
						audio: null,
					},
					geometry: {
						type: 'Point',
						coordinates: [18.618518730544295, 50.270944879853943],
					},
				},
				{
					type: 'Feature',
					properties: {
						id: '5',
						title: 'Cokolwiek tu jest',
						photo1: null,
						photo2: null,
						photo3: null,
						description:
							'In in rutrum arcu. Proin quis nulla nunc. Suspendisse aliquam fringilla tincidunt. Nunc nec tincidunt quam, sed tincidunt nibh. Nunc efficitur urna vitae ullamcorper volutpat. ',
						video: null,
						audio: null,
					},
					geometry: {
						type: 'Point',
						coordinates: [18.625702105092152, 50.285587903216808],
					},
				},
				{
					type: 'Feature',
					properties: {
						id: '6',
						title: 'Samo zdjęcie',
						photo1:
							'https://assets.puzzlefactory.pl/puzzle/300/056/original.jpg',
						photo2: null,
						photo3: null,
						description: null,
						video: null,
						audio: null,
					},
					geometry: {
						type: 'Point',
						coordinates: [18.654907503801319, 50.278618787910695],
					},
				},
			],
		},
	},
]