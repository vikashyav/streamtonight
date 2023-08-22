// import Image from "next/image";
import slugify from "../../../utils/slugify";
import Link from 'next/link';
import constant from "../../helper/constant";

function ShowThumbnail({ result, isSeriesSeason, series_id, series_name }) {
  const THUMBNAIL_URL = `${constant.TMDB.IMAGE_BASE_URL}/${constant.THUMBNAIL_SIZE}${result.poster_path}`;

  // const router = useRouter();

  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };

  let slugifyUrl = `/${checkTvOrMovieFromTitle(result.original_title, result.name)}/${slugify(series_name|| result?.name || (result?.original_title || result?.original_name))}/${series_id || result.id}`;
 
  if (isSeriesSeason ==="Seasons") {
    slugifyUrl = `${slugifyUrl}?season_number=${result?.season_number}`
  }

  return (
    <Link href={slugifyUrl}>
      <div
        id="movie-thumbnail"
        className={`flex m-1 max-w-[220px] min-h-[260px] h-[330px]  
               rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px]
        border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl
         transform hover:scale-105 transition duration-300`}
        // w-[210px] smb:w-[150px] smb:h-[250px] sm:w-[190px] sm:h-[300px]
        // onClick={() => router.push(slugifyUrl)}
        >
      <img
          src={THUMBNAIL_URL}
        // width={190}
        // height={330}
          alt={`${result.name}, ${constant.ATTRIBUTES.IMG}`}
          title={`${result.name}, ${constant.ATTRIBUTES.IMG}`}
            // objectFit="cover"
            layout="fill"
          // className="rounded-lg  aspect-[4/3]"
          className="my-auto w-full min-h-[260px] rounded-[7px] hover:scale-105"
          />
          <div
            className="absolute bottom-2  md:inset-y-auto md:bottom-2 background-blur inset-x-1 md:inset-x-2 space-y-4 z-50"

          >
            <h2 className="font-bold">
              {(result.title || result.original_name )|| `${result.name}. ${ result.episode_count} Episodes` }
              </h2>
          </div>
        </div>
    </Link>
  );
}

export default ShowThumbnail;
