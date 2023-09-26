// import { getSession, useSession } from "next-auth/client";
// import Image from "next/image";
import MoviesCollection from "../../components/movie-collection";
import MovieSummary from "../../components/MovieSummary";
import ErrorPage from "../404";
import * as tmdbMovieApiList from "../../api/movie";
// import MovieSeo from "../../../../components/SEO/movie-seo";
import tmdbPayload from "../../helper/tmdb-payload";
import slugify from "../../../utils/slugify";
import constant from "@/helper/constant";
import MOVIE_CONTENT from "@/helper/movie-content";
// generateStaticParams getStaticPaths
export async function getStaticPaths() {

  const [ trendingNow = {}, trendingNow2 = {}, trendingNow3 = {}, 
   Movies1 = {}, MovieList2 = {}, MovieList3 = {},
   MovieList4 = {}, MovieList5 = {}, MovieList6 = {},
   MovieList7 = {}, MovieList8 = {}, MovieList9 = {},
  ] =
    await Promise.all([
      tmdbMovieApiList.getTrendingAllByWeek({ page: 1 }),
      tmdbMovieApiList.getTrendingAllByWeek({ page: 2 }),
      tmdbMovieApiList.getTrendingAllByWeek({ page: 3 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 1 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 2 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 3 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 4 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 5 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 6 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 7 }),
      // tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 8 }),
      // tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 9 }),
    ]);
  const data = [
    ...trendingNow?.results,
    ...trendingNow2?.results,
    ...trendingNow3?.results,
    ...Movies1?.results,
    ...MovieList2?.results,
    ...MovieList3?.results,
    ...MovieList4?.results,
    ...MovieList5?.results,
    ...MovieList6?.results,
    ...MovieList7?.results,
    // ...MovieList8?.results,
    // ...MovieList9?.results,
  ]

  let paths = [];
  data.forEach((item) => {
    //&& slugifyTitle!==null && slugifyTitle!== undefined && slugifyTitle!==""
    const slugifyTitle = slugify(item?.title || item?.original_title);
    const movie_id = item.id.toString();
    const slugifyUrl = slugify(`${(item?.title || item?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL} ${movie_id}`);
    // slugifyUrl= `${slugifyUrl}-${movie_id}`
    const movieSlugExist= paths.find((list)=>list?.params?.movie_slug === slugifyUrl);
    if(slugifyTitle && !movieSlugExist){
      paths = [...paths,
        { params: { movie_slug: slugifyUrl}, }
      ]
    }
    // params: { movie_name: "transformers:-rise-of-the-beasts", movie_id: { movie_id: "667538" } },
  });
  return {
    paths,
  fallback: true
  };
}


//getServerSideProps getStaticProps
export async function getData(context) {
  // const session = await getSession(context);
  // const { id } = context.query;
  const movieSlug = context.params.movie_slug;
var words = movieSlug.split('-');
var id = words[words.length - 1];
  const request = await tmdbMovieApiList.getMovieById({ movie_id: id, append_to_response:"videos" })
  
  const movieCast = await tmdbMovieApiList.getMovieCast({ movie_id: id });

  const response = await tmdbMovieApiList.getMovieRecommendationsById({ movie_id: id });

  return {
    props: {
      // session,
      result: request,
      recommendedMovie: response,
      movieCast
    },
    // revalidate: 10,
  };
}

export async function generateMetadata(context) {
  // read route params
  // const id = context.params.movie_id;
  const movieSlug = context.params.movie_slug;
  var words = movieSlug.split('-');
  var id = words[words.length - 1];
  const movieDetail = await tmdbMovieApiList.getMovieById({ movie_id: id, append_to_response:"videos" })
  // fetch data
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = `${constant.TMDB.IMAGE_BASE_URL}/${constant.THUMBNAIL_SIZE}${movieDetail.poster_path}`|| []
 
  return {
    title: `${movieDetail?.title || movieDetail?.original_name} - day2movies | streamtonight`,
    description: `${movieDetail?.title || movieDetail?.original_name}, ${movieDetail?.overview}`,
    keywords:`${movieDetail?.title}, ${movieDetail?.title} full movie download, ${movieDetail?.title} full movie watch online, movies, web series, online streaming, Day2Movies, entertainment platform, streaming website, movie library, watch films online`,
    openGraph: {
      title: `${movieDetail?.title || movieDetail?.original_name} day2movies | streamtonight - watch movies & series online for free`,
      description: `${movieDetail?.title || movieDetail?.original_name}, ${movieDetail?.overview}`,
      url: `https://streamtonight.online/${movieDetail?.id}`,
      siteName: 'streamtonight',
      images: previousImages,
      locale: 'en_US',
      type: 'website',
    },
  }
}

async function Movie(context) {

  const data = await getData(context);
  const { result, recommendedMovie, movieCast } = data.props;
  
  if (!result) {
    return (<ErrorPage />);
  }


  if (MOVIE_CONTENT?.[result.id]) {
    result.overview= MOVIE_CONTENT[result.id]?.overview;
  }
  return (
    <>
      {/* <MovieSeo movie={result} /> */}
      <MovieSummary result={result} movieCast={movieCast?.cast} />
      {recommendedMovie.results && <MoviesCollection results={recommendedMovie} title="Recommended Movies" />}
    </>
  );
}

export default Movie;
