'use client'
import React,{useEffect, useState} from 'react'
import MoviesCollection from "../../../components/smovies-collection";
import { getMovieSearchByCastId, getMovieSearchByCastName, getMovieSearchResult } from '@/api/movie';
import { getTvSeriesSearchResult } from '@/api/tv-series';
import ShowsCollection from '@/components/sshow-collection';
import constant from '@/helper/constant';
import ThumbnailSelectons from '@/components/movie-collection/thumbnail-selecton';
// import tmdbPayload from '@/helper/tmdb-payload';
// import slugify from '../../../../utils/slugify';

function index(context) {
  const [searchResult, setsearchResult] = useState({});
  const [searchShowResult, setSearchShowResult] = useState({});
  const [searchResultByCastName, setSearchResultByCastName]= useState();
const [isloading, setLoading]= useState(true);
  
  useEffect(() => {
    const serachQuery= decodeURIComponent(context?.params?.slug);
    const { cast_id } = context?.searchParams;
    let searchMovieApi= getMovieSearchResult;
    let payload ={
      query: serachQuery,
      // certification_country: tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD.certification_country
    };
    if (cast_id) {
    console.log("serachQuery:",cast_id, context);

      payload= {
        cast_id
      };
      searchMovieApi = getMovieSearchByCastId;
    }
    
    getMovieSearchByCastName(payload).then((res)=>{
      setSearchResultByCastName(res)
    })

    searchMovieApi(payload)
    .then(async(res) => {
      const { results, cast } = res;
      if (cast) {
      setsearchResult({results: cast});
      } else {
        setsearchResult(res);        
      }
      setLoading(false)
    })

    getTvSeriesSearchResult({
      query: serachQuery,
      // certification_country: tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD.certification_country,
      language:'en-US'
    })
    .then(async(res) => {
      const { results, cast } = res;
      if (cast) {
      setSearchShowResult({results:cast});
      }else{
        setSearchShowResult(res);
      }
    })
  }, [context.params?.slug])
  

  return (
    <div>
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        {/* <Slider results={popularMovies} /> */}
        {/* <Brands /> */}
        {
          searchResultByCastName?.results?.length > 0 && 
          <MoviesCollection
          results={searchResultByCastName}
          title={`Person (cast) Search results for ${context.params.slug}`}
          cast
        />
        }
        {
          isloading &&
          <div
      className="mx-8 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
    >
          <ThumbnailSelectons />
    </div>
        }
        <MoviesCollection
          results={searchResult}
          title={`Movies Search results for ${context.params.slug}`}
        />
        <ShowsCollection
          searchShowResult={searchShowResult}
          title={`Tv-show/Series Search results for ${context.params.slug}`}
        />
        
      </main>
    </div>
  );
}

export default index