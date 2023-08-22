// import { getSession, useSession } from "next-auth/client";
// import Head from "next/head";
import Slider from "../components/Slider";
import SeoContentForHome from "../components/seo-content";
import MoviePageSeoContent from "../components/movie-seo-content";
import MoviesCollection from "../components/movie-collection"; //remove it for infinte pagination
// import ShowsCollection from "../components/show-collection"; //remove it for infinte pagination
// import MoviesCollection from "@/components/smovies-collection"; 
import ShowsCollection from "@/components/sshow-collection";

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
  trendingNow,
  pageRoutes
}) {

  return (
    <div>
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        {(trendingNow || popularMovies) && <Slider results={trendingNow?.results || popularMovies?.results} />}
        {(trendingNow && pageRoutes === "/") &&
          <MoviesCollection
            results={trendingNow}
            type={'trendingNow'}
          title="Trending Now"
          pagenate
          />}
        {popularMovies && <MoviesCollection results={popularMovies} title="Popular Movies" pagenate />}
        {popularShows && <ShowsCollection showDataLists={popularShows} popularShows={popularShows} title="Popular Shows" pagenate />}
        {top_ratedMovies && <MoviesCollection results={top_ratedMovies} title="Top Rated Movies" />}
        {top_ratedShows && <ShowsCollection showDataLists={top_ratedShows} title="Top Rated Shows" />}
      </main>
      <div id='footer-detail-section'>
        {pageRoutes === "/" ? <SeoContentForHome /> : <MoviePageSeoContent />}
      </div>      
    </div>
  );
}

//getServerSideProps getStaticProps
export async function getStaticProps(context) {
  // const session = await getSession(context);

  const [
    trendingShowRes,
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=abb29bea88e171807e8533520836bfce`),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-IN&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
  ]);
  const [trendingNow, popularMovies, popularShows, top_ratedMovies, top_ratedShows,] =
    await Promise.all([
      trendingShowRes.json(),
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
      // context.json(),
    ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
      pageRoutes: "/",
    },
    revalidate: 100,
  };
}
