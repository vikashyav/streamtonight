import MovieThumbnail from "./movie-collection/MovieThumbnail";
import Pagination from "./server-pagination";

export default function SmoviesCollection({ results, title, pagenate, cast }) {
    const movieList = results?.results || [];
  return (
      <div className="max-w-[1400px] mx-auto ">
          <h2 className="font-semibold m-5">{title}</h2>
          <div
              className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
          >
              {movieList.length > 0 && movieList.map((result) => (
                  <MovieThumbnail key={result.id} result={result} cast={cast}/>
              ))}
          </div>
          {
              pagenate &&
              <Pagination total_pages={results.total_pages} currentPage={results.page} page_routes={results.page_routes ||'movie'} />
          }
      </div>
  )
}
