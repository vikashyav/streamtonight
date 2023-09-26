import requestTmdbApi from "../helper/api-helper";
import Const from "../helper/constant";

export const getDiscoverMovies = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.DISCOVER_MOVIE}`, {
    method: "GET",
    params: data,
});

export const getTopRatedMovies = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.topRated}`, {
    method: "GET",
    params: data,
});

export const getPopularMovies = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.popularMovies}`, {
    method: "GET",
    params: data,
});

export const getTrendingAllByWeek = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.tendingAllByWeek}`, {
    method: "GET",
    params: data,
});

export const getMovieById = ({ movie_id, ...data }) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.MOVIE}/${movie_id}`, {
    method: "GET",
    params: data,
});

export const getMovieRecommendationsById = ({ movie_id, ...data }) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.MOVIE}/${movie_id}/recommendations`, {
    method: "GET",
    params: data,
});

export const getMovieCast = (data) => {
    const { movie_id, ...payload } = data;
    // https://api.themoviedb.org/3/movie/346698/credits
    return requestTmdbApi(`movie/${movie_id}/credits`, {
        method: "GET",
        params: payload,
    })
}

export const getMovieSearchResult = (data) => {
    return requestTmdbApi("search/movie", {
        method: "GET",
        params: data,
    })
}

export const getMovieSearchByCastId = (data) => {
    const {cast_id}=data;
    return requestTmdbApi(`person/${cast_id}/movie_credits`, {
        method: "GET",
        params: data,
    })
}

export const getMovieSearchByCastName = (data) => {
    const {cast_id}=data;
    return requestTmdbApi(`search/person`, {
        method: "GET",
        params: data,
    })
}