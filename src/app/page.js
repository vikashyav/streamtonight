import Image from 'next/image'
import MainPage from "./index";
import { getPopularMovies, getTopRatedMovies, getTrendingAllByWeek } from '@/api/movie';
import { getPopularShow, getTopRatedShow } from '@/api/tv-series';
import tmdbPayload from '@/helper/tmdb-payload';

export async function getData(context) {
  // const session = await getSession(context);

  // BOLLYWOOD_RECENT_YEAR_PAYLOAD
  const [
    trendingNow,popularMovies,
    popularShows, top_ratedMovies,
    top_ratedShows,
  ] = await Promise.all([
    getTrendingAllByWeek({...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD}),
    // getPopularMovies(),
    // getPopularShow({...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD}),
    // getTopRatedMovies(),
    // getTopRatedShow(),
  ]);
  trendingNow.apiCallMethod = 'getTrendingAllByWeek';
  trendingNow.defaultApiPayload = tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD;
  return {
    props: {
      trendingNow: trendingNow,
      // popularMovies: popularMovies.results,
      // popularShows: popularShows?.results,
      // top_ratedMovies: top_ratedMovies?.results,
      // top_ratedShows: top_ratedShows?.results,
      pageRoutes: "/",
    },
    revalidate: 100,
  };
}


export default async function Home() {
  const data = await getData()
  return <MainPage {...data?.props}/>
}
