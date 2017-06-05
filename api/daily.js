
export function getLaunchImages() {

}

export function getNewsLatest() {
  const url = 'https://news-at.zhihu.com/api/4/news/latest';
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    return response.json()
  });
}

export function getNewsDetail(id) {
  const url = `https://news-at.zhihu.com/api/4/news/${id}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    return response.json()
  });
}