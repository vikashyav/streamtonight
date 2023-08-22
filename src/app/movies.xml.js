// import { Post } from "../models/Post";
import Constant from "../utils/constant";
import tmdbPayload from "../helper/tmdb-payload";
import * as tmdbMovieApiList from "../api/movie";
import slugify from "../utils/slugify";
  
const generateSiteMap = (data) => {
  try {
    const checkTvOrMovieFromTitle = (original_title, original_name) => {
      if (original_title) {
        return "movie";
      } else if (original_name) {
        return "series";
      }
    };

    const posts = [];
    for (const item of data) {      
      if (item.original_title || item.original_name) {
        const slugifyTitle = slugify(item?.title || (item?.original_title || item?.original_name));
        item.sitemap_text = `${Constant.DAY2MOVIE_URL}/${checkTvOrMovieFromTitle(item?.original_title, item?.original_name)}/${slugifyTitle}/${item?.id}` || `${Constant.DAY2MOVIE_URL}`;
        posts.push(item)
      }
    }
    let dynamicUrlForSiteMap = ``;

    if (posts.length > 0) {
      posts.map(item => {
        dynamicUrlForSiteMap = dynamicUrlForSiteMap + 
        `<url>
         <loc>
         ${item?.sitemap_text}
         </loc>
       </url>`;
      })
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" >
    <url>
    <loc>${Constant.DAY2MOVIE_URL}</loc>
      <loc>${Constant.DAY2MOVIE_URL}/bollywood</loc>
      <loc>${Constant.DAY2MOVIE_URL}/series</loc>
      <loc>${Constant.DAY2MOVIE_URL}/movies</loc>
    </url>
    ${dynamicUrlForSiteMap}
  </urlset>
  `;

  } catch (error) {
    console.log("error", error);
  }
};

function SiteMap() { }

export const getServerSideProps = async ({ res }) => {

  const [Movies1=[], MovieList2=[], MovieList3 = [], top_ratedMovies=[], trendingNow=[], popularMovies=[]] =
    await Promise.all([
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 1 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 2 }),
      tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 3 }),
      tmdbMovieApiList.getTopRatedMovies({ page: 1 }),
      tmdbMovieApiList.getTrendingAllByWeek({ page: 1 }),
      tmdbMovieApiList.getPopularMovies({ page: 1 })
    ]);
  const data = [
    ...trendingNow.results,
    ...Movies1.results,
    ...MovieList2.results,
    ...MovieList3.results,
    ...popularMovies.results,
    ...top_ratedMovies.results,
  ]
  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
  // res.stre(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;