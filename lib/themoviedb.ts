import axios from "axios";
import { env } from "../env/env";
// import { Platform } from "react-native";
// import * as Localization from "expo-localization";
import { storage } from "./storage";

const infoAPI = {
  url: env.url,
  apiKey: env.apikey,
};

export function getImageURL(posterPath: string) {
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
  return "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg";
}

export function getVideoYTURL(key: string) {
  if (key) {
    return `https://www.youtube.com/watch?v=${key}`;
  }
  return null;
}

export async function getNowPlaying(page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/now_playing?api_key=${infoAPI.apiKey}&language=${lang}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPopularMovies(page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/popular?api_key=${infoAPI.apiKey}&language=${lang}&page=${page}`,
    );

    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getTopRatedMovies(page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/top_rated?api_key=${infoAPI.apiKey}&language=${lang}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUpcomingMovies(page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/upcoming?api_key=${infoAPI.apiKey}&language=${lang}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMovieDetails(id: number) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}?api_key=${infoAPI.apiKey}&language=${lang}`,
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getSimilarMovies(id: number) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}/similar?api_key=${infoAPI.apiKey}&language=${lang}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMoviesGenres(id: number, page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/discover/movie?api_key=${infoAPI.apiKey}&language=${lang}&with_genres=${id}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMovieVideos(id: number) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}/videos?api_key=${infoAPI.apiKey}&language=${lang}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMovieReviews(id: number, page: number = 1) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}/reviews?api_key=${infoAPI.apiKey}&language=${lang}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getSearchMovie(query: string, page: number = 1) {
  try {
    const app: any = storage.getState();
    const { isAdult, lang } = app.ui;
    if (page < 1) page = 1;
    const resp = await axios.get(
      `${infoAPI.url}/3/search/movie?api_key=${infoAPI.apiKey}&language=${lang}&include_adult=${isAdult}&query=${query}&page=${page}`,
    );
    return resp.data.results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMovieCast(id: number) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/movie/${id}/credits?api_key=${infoAPI.apiKey}&language=${lang}`,
    );
    return resp.data.cast;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCastDetails(id: number) {
  try {
    const app: any = storage.getState();
    const { lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/person/${id}?api_key=${infoAPI.apiKey}&language=${lang}`,
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getMoviesFromCast(id: number) {
  try {
    const app: any = storage.getState();
    const { isAdult, lang } = app.ui;
    const resp = await axios.get(
      `${infoAPI.url}/3/person/${id}/movie_credits?api_key=${infoAPI.apiKey}&language=${lang}&include_adult=${isAdult}`,
    );
    return resp.data.cast;
  } catch (error) {
    console.log(error);
    return false;
  }
}
