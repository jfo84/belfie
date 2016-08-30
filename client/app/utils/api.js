var api = {
  getFriends(userId) {
    var url = `https://belfie.herokuapp.com/api/v1/friends`;
    return fetch(url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: '1',
      })
    ).then((res) => res.json());
  },
};
