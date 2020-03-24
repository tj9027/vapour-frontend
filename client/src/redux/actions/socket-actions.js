export const firstSocketLogin = (_id, socket, callback) => async () => {
  socket.emit('login', _id, callback);
};

export const joinRoomById = (name, roomId, _id, socket, callback) => () => {
  socket.emit('join', name, roomId, _id, callback);
};

export const socketLogout = (_id, socket) => () => {
  socket.emit('login', _id, () => {});
};
export const changeConnection = socket => () => {
  socket.emit('changeConnection');
};

export const disconnectSocket = socket => () => {
  socket.emit('disconnect');
  socket.off();
};

export const socketPostMessage = (
  messageContent,
  callback,
  socket
) => () => {
  socket.emit(
    'message',
    messageContent,
    callback
  );
};
