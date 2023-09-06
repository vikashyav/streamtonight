import * as tmdbMovieApiList from "@/api/movie";
import tmdbPayload from "@/helper/tmdb-payload";
import slugify from "@/../utils/slugify";
import constant from "@/helper/constant";
// import MOVIE_CONTENT from "@/helper/movie-content";

async function getData(){
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

       let movieUrls = [];
       data.forEach((item) => {
         const slugifyTitle = slugify(item?.title || item?.original_title);
         const movie_id = item.id.toString();
         const slugifyUrl = slugify(`${(item?.title || item?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL} ${movie_id}`);
         // slugifyUrl= `${slugifyUrl}-${movie_id}`
         const movieSlugExist= movieUrls.find((list)=>list?.params?.movie_slug === slugifyUrl);
         if(slugifyTitle && !movieSlugExist){
             movieUrls = [...movieUrls,
             {
                 url: `${constant.DAY2MOVIE_URL}/${slugifyUrl}`,
                 lastModified: item?.release_date || new Date(),
             }
                 //  { params: { movie_slug: slugifyUrl}, }
             ]
         }
         // params: { movie_name: "transformers:-rise-of-the-beasts", movie_id: { movie_id: "667538" } },
       });
       return movieUrls;
}

export default async function sitemap() {

const dynamicUrl= await getData();
  return [
    {
        url: `${constant.DAY2MOVIE_URL}/`,
        lastModified: new Date(),
      },
    {
      url: `${constant.DAY2MOVIE_URL}/movie`,
      lastModified: new Date(),
    },
    {
        url: `${constant.DAY2MOVIE_URL}/bollywood`,
        lastModified: new Date(),
      },
      {
        url: `${constant.DAY2MOVIE_URL}/series`,
        lastModified: new Date(),
      },
    ...dynamicUrl,
  ];
}