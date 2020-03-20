const sendMessage = async (url, newMessage, recipientId, senderId, senderName) => {

  const message = { message: newMessage, time: Date.now() };
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, recipientId, senderId, senderName })
  });
  return response.json();
};

const getPlayerMessages = async (ENDPOINT, sender, recipient) => {
  const response = await fetch(
    //from parameter determined the person who has LOGGED IN, to detetmines to whom the messages will be sent
    ENDPOINT + `users/find/?from=${sender._id}&to=${recipient._id}`
  )
    .then(res => res.json())
    .catch(err => err);
  return response;
};

export { getPlayerMessages, sendMessage };
