export default [
	{
		username: 'player 1',
		id: 1,
		status: true,
		chats: { 3: 'uniqueID1', 2: 'uniqueID2' },

		// chats: {
		// 	'uniqueIdMap': {
		// 		_chathistory: [{}, {}],
		// 		room: "roomID",
		// 		get: get(_chathistory);
		// 	}
		// }
	},
	{
		username: 'player 2',
		id: 2,
		status: true,
		chats: { 3: 'uniqueID3', 1: 'uniqueID2' }

	},
	{
		username: 'player 3',
		id: 3,
		status: true,
		chats: { 1: 'uniqueID1', 2: 'uniqueID3' }

	}, {
		username: 'player 4',
		id: 4,
		status: false
	}

]