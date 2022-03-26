const API_KEY = "bd520ef6eb381c7a598bd5a2dcecb1df";

const BASE_URL = "https://api.themoviedb.org/3";

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    //queryKey 라는  Array 의 2번째 아이템을 query 라는 변수로 받아옴
    const [_, query] = queryKey; // fetcher 는 query 에서 정보를 자동적으로 받음 정보안의 queryKey 로 searchbar 텍스트 접근가능
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    ).then((res) => res.json());
  },

  detail: ({ queryKey }) => {
    //queryKey 라는  Array 의 2번째 아이템을 query 라는 변수로 받아옴
    const [_, id] = queryKey; // fetcher 는 query 에서 정보를 자동적으로 받음 정보안의 queryKey 로 searchbar 텍스트 접근가능
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    //queryKey 라는  Array 의 2번째 아이템을 query 라는 변수로 받아옴
    const [_, query] = queryKey; // fetcher 는 query 에서 정보를 자동적으로 받음 정보안의 queryKey 로 searchbar 텍스트 접근가능
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    //queryKey 라는  Array 의 2번째 아이템을 query 라는 변수로 받아옴
    const [_, id] = queryKey; // fetcher 는 query 에서 정보를 자동적으로 받음 정보안의 queryKey 로 searchbar 텍스트 접근가능
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
