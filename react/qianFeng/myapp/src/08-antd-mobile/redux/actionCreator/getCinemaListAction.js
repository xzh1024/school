import axios from 'axios';

// redux-thunk
// function getCinemaListAction() {
//   return (dispatch) => {
//     axios({
//       method: 'get',
//       url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
//       headers: {
//         'X-Client-Info':
//           '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
//         'X-Host': 'mall.film-ticket.cinema.list',
//       },
//     })
//       .then((res) => {
//         console.log(res.data.data.cinemas);

//         dispatch({
//           type: 'change-list',
//           payload: res.data.data.cinemas,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

// redux-promise
// function getCinemaListAction() {
//   return axios({
//     method: 'get',
//     url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
//     headers: {
//       'X-Client-Info':
//         '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.cinema.list',
//     },
//   })
//     .then((res) => {
//       console.log(res.data.data.cinemas);
//       return {
//         type: 'change-list',
//         payload: res.data.data.cinemas,
//       };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
async function getCinemaListAction() {
  const data = await axios({
    method: 'get',
    url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
    headers: {
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list',
    },
  })
    .then((res) => {
      return {
        type: 'change-list',
        payload: res.data.data.cinemas,
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export { getCinemaListAction };
