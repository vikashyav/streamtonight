'use client'
import { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";
import cx from "../../../utils/class-names";
import moment from "moment";
// import ReactPlayer from "react-player/lazy";
import Const from "../../helper/constant";

const MovieSummary = ({ result, movieCast }) => {
  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );
  const isUpcoming = moment(result.release_date).isAfter(moment());
  const BASE_URL = `${Const.TMDB.IMAGE_BASE_URL}/original/`;
  const VIDEO_BASE_URL = isUpcoming
    ? `${Const.STREAM_SERVER.YOUTUBE_BASE_URL}?v=${result.videos?.results[index]?.key}`
    : `${Const.STREAM_SERVER.GD_STREAM_BASE_URL}?imdb=${result.imdb_id}&?tmdb=${result.id}`;
  const [showPlayer, setShowPlayer] = useState(false);
  // const [posterLink, setposterLink] = useState(
  //   `${BASE_URL}${result.poster_path}`
  // );
  const [iframeLoading, setIframeLoading] = useState(true);

  // let showPlayer=false;
  let posterLink=`${BASE_URL}${result.backdrop_path || result.poster_path}` ||
  `${BASE_URL}${result.poster_path}`;
  // let iframeLoading = true;

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  // useEffect(() => {
  //   // scroll.scrollToTop({ smooth: true });
  //   setShowPlayer(false);
  //   setposterLink(
  //     `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
  //       `${BASE_URL}${result.poster_path}`
  //   );
  // }, [result]);

  const thumbnailImageStyle = { backgroundImage: `url(${posterLink})` };
  return (
    <>
      <div className="flex w-full h-full">
        <section className="w-screen lg:h-[75vh] md:h-[70vh] sm:h-[300px]">
          {showPlayer ? (
            <div className="h-full w-full flex justify-center items-center">
              {isUpcoming ? (
                // <></>
                <ReactPlayer
                  url={VIDEO_BASE_URL}
                  controls={true}
                  // playing={showPlayer}
                  width="100%"
                  height="100%"
                />
              ) : (
                <>
                  <iframe
                    onLoad={handleIframeLoad}
                    src={VIDEO_BASE_URL}
                    // frameborder="0"
                    className={cx(`w-full h-full`, iframeLoading && "hidden")}
                    allowfullscreen="allowfullscreen"
                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                  />
                  <div
                    class={cx(
                      `loader animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75 h-12 w-12`,
                      iframeLoading ? "flex" : "hidden"
                    )}
                  />
                </>
              )}
            </div>
          ) : (
            <div
              // tail sm:h-[300px] md:h-[350px] tab-xs:h-[350px] lg:h-[75vh]
              className={`releative bg-center bg-no-repeat bg-cover flex flex-row h-full`}
              style={thumbnailImageStyle}
            >
              {/* <img src={posterLink}
                className="w-full hover:opacity-75 hover:bg-[#0F0F0F] object-cover"
              /> */}
              <div
                className="w-full h-full cursor-pointer flex justify-center items-center "
                onClick={() => setShowPlayer(true)}
              >
                <div className=" bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] p-3 rounded-full">
                  <img
                    src="/images/play-icon-white.svg"
                    alt={Const.ATTRIBUTES.IMG}
                    className="h-6 md:h-8"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <MovieInfo movie={result} movieCast={movieCast} />
    </>
  );
};

export default MovieSummary;
