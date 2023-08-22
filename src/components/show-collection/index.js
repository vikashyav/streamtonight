'use client'
import React, { useEffect, useState } from "react";
import ShowThumbnail from "./ShowThumbnail";
import PaginatedContent from "../scroll-to-bottom";
import * as showApi from "@/api/tv-series";
import ThumbnailSelecton from "../movie-collection/thumbnail-selecton";

function ShowsCollection({ showDataLists, title, series_id, series_name, pagenate, ...restProps }) {
  const [showlist, setshowlist] = useState(showDataLists.results || []);
  const [currentPage, setPage] = useState(1);
  let [loading, setLoading] = useState(false);
  const [totalPgae, setTotalPage] = useState(showDataLists?.total_pages);

  const fetchData = async ({ page }) => {
    setLoading(true);
    try {
      const payload = { page, ...showDataLists?.defaultApiPayload };
      let apiCall = showApi?.[showDataLists?.apiCallMethod] || showApi.getPopularShow;
      const newData = await apiCall(payload);
      setshowlist((prevData) => [...prevData, ...newData?.results]);
      setPage(newData.page);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage && currentPage != 1 && currentPage <= totalPgae && currentPage < 500) {
      fetchData({ page: currentPage });
    }
  }, [currentPage]);

const Collection=()=> (
    <div className="max-w-[1400px] mx-auto "
    >
      <h2 className="font-semibold m-5">{title}</h2>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
      >
        {showlist.length > 0 && showlist.map((result) => (
          <ShowThumbnail key={result.id} result={result} isSeriesSeason={title} series_id={series_id} series_name={series_name} />
        ))}
      {
        loading &&
        <>
          <ThumbnailSelecton />
          <ThumbnailSelecton />
          <ThumbnailSelecton />
          <ThumbnailSelecton />
        </>
      }
      </div>
    </div>
  );

  return (
    <>
      {pagenate ?
        <PaginatedContent loading={loading} setPage={setPage} >
          <Collection />
        </PaginatedContent> :
        <Collection />}
    </>
  );
}

export default ShowsCollection;
