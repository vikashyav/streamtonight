import slugify from "../../../utils/slugify";
import Link from 'next/navigation';
import constant from "@/helper/constant";

function MovieThumbnail({ result }) {
  const THUMBNAIL_URL = `${constant.TMDB.IMAGE_BASE_URL}/${constant.THUMBNAIL_SIZE}${result.poster_path}`;
  // const router = useRouter(); // TMDB_IMAGE_SIZE[300]
  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };
  // `${(result?.title || result?.original_title)} constant.MOVIE_PAGE.SEO_TITLE`
  const movieOrSeries = checkTvOrMovieFromTitle(result.original_title, result.name);
  let slugifyUrl = `/${slugify(`${(result?.title || result?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL}`)}-${result.id}`;
  if (movieOrSeries==="movie") {
    slugifyUrl = `/${slugify(`${(result?.title || result?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL}`)}-${result.id}`;
  } else {
    slugifyUrl = `/${movieOrSeries}/${slugify(`${(result?.title || result?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL}`)}-${result.id}`;
  }
  return (
    <a
      as={slugifyUrl}
      // href={{
      //   pathname: '/movie/[movie_name]/[movie_id]',
      //   query: {
      //     movie_name: slugify(result?.title || (result?.original_title || result?.original_name)),
      //     movie_id: result.id
      //   },
      // }}
      replace passHref legacyBehavior
     href={slugifyUrl}
    >
      <div
        id="movie-thumbnail"
        className="flex flex-col max-w-[220px] bg-[#282c34] text-[white] cursor-pointer m-[5px] p-[5px] rounded-[10px] hover:bg-[white] hover:text-[black]"
      >
        <div
          className="link no-underline text-inherit"
          to={`/movie/${result.id}`}
        >
          <img
            // postImg
            // tailwind:w-[180px] min-h-[260px]
            className="w-full h-full my-auto min-h-[260px]  object-cover rounded-[7px] hover:scale-105"
            src={THUMBNAIL_URL}
            alt={result.title + ", day2movies"}
            title={result.title || result.original_name + " day2movies"}
            loading="lazy"
          />
        </div>
        <div className="postInfo flex flex-col mt-auto">
          <span className="postTitle text-base overflow-hidden text-ellipsis my-[3px]">
            {result.title || result.original_name}
          </span>
          <div className="movieDetails bg-black/2">
            <p className="movieDate">{result.release_date}</p>
            <p className="type">{result.vote_average}</p>
            {/* <p className="hidden">{result.overview}</p> */}
          </div>
        </div>
      </div>
    </a>
  );
}

export default MovieThumbnail;
