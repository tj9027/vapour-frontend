export const firstSocketLogin = (_id, socket) => () => {
  socket.emit("login-user", _id);
};

export const joinRoomById = (name, roomId, _id, socket, callback) => () => {
  socket.emit("join", name, roomId, _id, callback);
};

export const socketLogout = (_id, socket) => () => {
  socket.emit("logout-user", _id, () => {});
};
export const changeConnection = socket => () => {
  socket.emit("changeConnection");
};

export const disconnectSocket = socket => () => {
  socket.emit("disconnect");
  socket.off();
};

export const socketPostMessage = (messageContent, callback, socket) => () => {
  socket.emit("message", messageContent, callback);
};
