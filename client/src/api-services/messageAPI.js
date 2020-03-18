const sendMessage = async (url, newMessage, recipientId, senderId) => {
  const message = { message: newMessage, time: Date.now() };
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, recipientId, senderId })
  });
  return response.json();
};

const postNewThread = async (url, recipientId, senderId) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipientId, senderId })
  });
  return response.json();
};

const getPlayerMessages = async (ENDPOINT, user, secondUser) => {
  const response = await fetch(
    //from parameter determined the person who has LOGGED IN, to detetmines to whom the messages will be sent
    ENDPOINT + `users/find/?from=${user._id}&to=${secondUser._id}`
  )
    .then(res => res.json())
    .catch(err => err);
  return response;
};

export { getPlayerMessages, sendMessage, postNewThread };
