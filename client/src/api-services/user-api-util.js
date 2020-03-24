const uploadProfile = async (id, image) => {
  await fetch(`http://localhost:4000/users/addProfile`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id,
      image,
    })
  })
    .catch(err => err);
};
module.exports = uploadProfile;
