const getPlayers = async ENDPOINT => {
  const response = await fetch(
    //from parameter determined the person who has LOGGED IN, to detetmines to whom the messages will be sent
    ENDPOINT + `users/find-all`
  ).catch(err => err);

  return response.json();
};

export { getPlayers };
