fetch('http://localhost:2022/chats/MessageNMinimal/fromUser/EPlXFjsvOcQA3bg30XkCnHPwYXg2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    loadedChatMsg: {},
  }),
})
    .then((ress) => {
      return ress.json();
    })
    .then((res) => {
      console.log(JSON.stringify(res));
    })
    .catch((err) => {
      console.log(err);
    });
