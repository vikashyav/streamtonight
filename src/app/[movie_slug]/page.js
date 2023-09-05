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

  const [ trendingNow = [], Movies1 = [], MovieList2 = [], MovieList3 = [], top_ratedMovies = [], popularMovies = []] =
    await Promise.all([
      tmdbMovieApiList.getTrendingAllByWeek({ page: 1 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 1 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 2 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 3 }),
      // tmdbMovieApiList.getTopRatedMovies({ page: 1 }),
      // tmdbMovieApiList.getPopularMovies({ page: 1 })
    ]);
  const data = [
    ...trendingNow?.results,
    ...Movies1?.results,
    ...MovieList2?.results,
    ...MovieList3?.results,
  ]

    //   ...MovieList3?.results,
    // ...popularMovies?.results,
    // ...top_ratedMovies?.results,

  let paths = [];
  data.forEach((item) => {
    //&& slugifyTitle!==null && slugifyTitle!== undefined && slugifyTitle!==""
    const slugifyTitle = slugify(item?.title || item?.original_title);
    if(slugifyTitle){
      const movie_id = item.id.toString();
    let slugifyUrl = slugify(`${(item?.title || item?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL}`);
    slugifyUrl= `${slugifyUrl}-${movie_id}`
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
