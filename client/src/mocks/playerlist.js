export default [
  {
    _id: '5e6f783c5e78a053cb9071d1',
    name: 'Bruce',
    status: '1',
    email: 'bruce@test.com',
    password: '$2a$10$IXxGTnjfjQfUhqLt1c1Xt.POeLHhODKjqGNoa0ZmYlkpaFOWzIVeK',
    messages: {
      '5e6f785e5e78a053cb9071d2': {
        messageHistory: [
          {
            $oid: '5e708fa7ae3cae0017eafde0'
          }
        ],
        roomId: '179cb035d5df20c0c1dd62217c1fbfab'
      }
    },
    date: {
      $date: {
        $numberLong: '1584363580501'
      }
    }
  },
  {
    _id: '5e6f785e5e78a053cb9071d2',
    name: 'Pawel',
    status: '1',
    email: 'pawel@test.com',
    password: '$2a$10$Cxg9MYuSDK6cbfEdyInoreZIQfKdcHQ/ZqlUrO2xOH2RDjdNFmstG',
    messages: {
      '5e6f783c5e78a053cb9071d1': {
        messageHistory: [
          {
            $oid: '5e708fa7ae3cae0017eafde0'
          }
        ],
        roomId: '179cb035d5df20c0c1dd62217c1fbfab'
      }
    },
    date: {
      $date: {
        $numberLong: '1584363614592'
      }
    }
  },
  {	_id: '5e70912aae3cae0017eafde1',
  	status: '1',
    name: 'Mike',
    email: 'mike@test.com',
    password: '$2a$10$aAyCgZcJOOZKZS4ufc6Vyu/k1H6D.SCZBovU1qssg29.xTLu.iyKW',
    messages: {},
    date: {
      $date: {
        $numberLong: '1584435498454'
      }
    }
  }
];
