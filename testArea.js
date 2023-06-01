fetch('http://localhost:2022/md5enc/a', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: 'Hello',
  }),
})
    .then((ress) => {
      return ress.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
