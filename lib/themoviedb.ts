import axios from "axios";

const infoAPI = {
  url: "https://api.themoviedb.org",
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  lang: "es-ES",
};

export function getImageURL(posterPath: string) {
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
  return "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg";
}

export async function getPopularMovies(page: number = 1) {
  try {
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/popular?api_key=${infoAPI.apiKey}&language=${infoAPI.lang}&page=${page}`,
    );

    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getNowPlaying() {
  try {
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/now_playing?api_key=${infoAPI.apiKey}&language=${infoAPI.lang}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getTopRatedMovies() {
  try {
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/top_rated?api_key=${infoAPI.apiKey}&language=${infoAPI.lang}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUpcomingMovies() {
  try {
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/upcoming?api_key=${infoAPI.apiKey}&language=${infoAPI.lang}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMovieDetails(id: number) {
  try {
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}?api_key=${infoAPI.apiKey}&language=${infoAPI.lang}`,
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
