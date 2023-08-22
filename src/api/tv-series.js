import requestTmdbApi from "../helper/api-helper";
import Const from "../helper/constant";

export const getTvSeriesSearchResult = (data) => {
    return requestTmdbApi("search/tv", {
        method: "GET",
        params: data,
    })
}

export const getPopularShow = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.POPULAR_SHOW}`, {
    method: "GET",
    params: data,
});

export const getTopRatedShow = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.TOP_RATED_SHOW}`, {
    method: "GET",
    params: data,
});

export const getTvSeriesById = ({ series_id, ...data }) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.TV}/${series_id}`, {
    method: "GET",
    params: data,
});
