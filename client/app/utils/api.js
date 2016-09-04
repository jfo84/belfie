const FB_PHOTO_WIDTH = 200;
const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

var api = {
  // getFriends(userId) {
  //   var url = `https://belfie.herokuapp.com/api/v1/friends`;
  //   return fetch(url,
  //     method: 'POST',
  //     headers: jsonHeaders,
  //     body: JSON.stringify({
  //       // Hard-coded for now, need to get the Unique Identifier
  //       user_id: '1',
  //     }),
  //   ).then((res) => res.json());
  // },
  getProfileImage(user) {
    var url = `https://graph.facebook.com/v2.7/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;
    return fetch(url).then((res) => res.json());
  },
  getProfileInfo(user) {
    var url = `https://graph.facebook.com/v2.7/${user.userId}?fields=name,email&access_token=${user.token}`;
    return fetch(url).then((res) => res.json());
  },
};

module.exports = api;
