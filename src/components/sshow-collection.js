import Pagination from './server-pagination';
import ShowThumbnail from './show-collection/ShowThumbnail';

export default function SshowCollection({ results, popularShows, searchShowResult, title, series_id, series_name, pagenate }) {
    const showlist = popularShows?.results || results || searchShowResult?.results || [];
  return (
      <div className="max-w-[1400px] mx-auto "
      >
          <h2 className="font-semibold m-5">{title}</h2>
          <div
              className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
          >
              {showlist.length > 0 && showlist.map((result) => (
                  <ShowThumbnail key={result.id} result={result} isSeriesSeason={title} series_id={series_id} series_name={series_name} />
              ))}
          </div>
          {pagenate && 
              <Pagination total_pages={popularShows.total_pages} currentPage={popularShows.page} page_routes={'series'} />
          }
          
      </div>
  )
}
