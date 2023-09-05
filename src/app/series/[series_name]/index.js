'use client'
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../../components/Header";
// import Hero from "../../components/Hero";
// import { PlusIcon, XIcon } from "@heroicons/react/solid";
// import ShowsCollection from "../../../../components/show-collection/";
import ShowsCollection from "@/components/sshow-collection";
import ErrorPage from "../../404";
import MovieSeo from "../../../components/SEO/movie-seo";
import MovieList2 from "../../../components/movieList";

import ReactPlayer from "react-player/lazy";
import constant from "@/helper/constant";
import cx from "../../../../utils/class-names";

function Show({ result, recommendedShow, tvSeasonDetails, season_number }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  // const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [streamPlayer, setStreamPlayer] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [seriesEpisode, setSeriesEpisode] = useState(1);
  // ?type=series&imdb=tt6468322&season=4&episode=8 season_number
  const stream_link = `${constant.STREAM_SERVER.GD_STREAM_BASE_URL}?type=series&imdb=${result?.external_ids?.imdb_id}&season=${season_number||1}&episode=${seriesEpisode}&tmdb=${result.id}`;

  const index = result?.videos?.results?.findIndex(
    (element) => element.type === "Trailer"
  );
  if (result.success === false) {
    return (<ErrorPage />);
  }

  const filterStillPath = (episodes) => {
    return episodes.map((episode) =>
      episode.episodes.filter((episode) => episode.still_path !== null)
    );
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleEpisodeChange = (episode_number) => {
    setSeriesEpisode(episode_number);
  }

  const episodeDetails = tvSeasonDetails?.find((item) => item.season_number == season_number || 1)
  return (
    <>
      <div className="relative">
        <MovieSeo movie={result} />
        {
          streamPlayer ?
            <div className="h-full w-full flex justify-center items-center lg:h-[75vh] md:h-[70vh] sm:h-[300px]">
              <iframe
                onLoad={handleIframeLoad}
                src={stream_link}
                // frameborder="0"  iframeLoading && "hidden"
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
            </div> :
            <section
              className="relative"
            >
              <div className="relative min-h-[calc(100vh-72px)] " >
                <Image
                  src={
                    `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                    `${BASE_URL}${result.poster_path}`
                  }
                  layout="fill"
                  objectFit="cover"
                />
              </div>
                <div className={`bg-gradient-to-t from-black to-transparent  absolute 
                bottom-0 pb-8 inset-x-0 p-4 space-y-6 z-50`}
                // md:inset-y-auto md:bottom-0 md:inset-x-12
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                    {result.title || result.name}
                  </h1>
                  <div className="flex items-center space-x-3 md:space-x-5">
                    <button
                      className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                      onClick={() => setStreamPlayer(true)}
                    >
                      <img
                        src="/images/play-icon-black.svg"
                        alt=""
                        className="h-6 md:h-8"
                      />
                      <span className="uppercase font-medium tracking-wide">Play</span>
                    </button>

                    <button
                      className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                      onClick={() => setShowPlayer(true)}
                    >
                      <img
                        src="/images/play-icon-white.svg"
                        alt=""
                        className="h-6 md:h-8"
                      />
                      <span className="uppercase font-medium tracking-wide">
                        Trailer
                      </span>
                    </button>

                    <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                      {/* <PlusIcon className="h-6" /> */}
                    </div>

                    <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                      <img src="/images/group-icon.svg" alt="" />
                    </div>
                  </div>

                  <p className="text-xs md:text-sm">
                    {result.release_date || result.first_air_date} •{" "}
                    {result.number_of_seasons}{" "}
                    {result.number_of_seasons === 1 ? "Season" : "Seasons"} •{" "}
                    {result.genres.map((genre) => genre.name + " ")}{" "}
                  </p>
                  <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
                </div>
              {/* Bg Overlay */}
              {showPlayer && (
                <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
              )}

              <div
                className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "opacity-0"
                  }`}
              >
                <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
                  <span className="font-semibold">Play Trailer</span>
                  <div
                    className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                    onClick={() => setShowPlayer(false)}
                  >
                    {/* <XIcon className="h-5" /> */}
                  </div>
                </div>
                <div className="relative pt-[56.25%]">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${result?.videos?.results[index]?.key}`}
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                    controls={true}
                    playing={showPlayer}
                  />
                </div>
              </div>
            </section>   
        }
        {
          episodeDetails &&
          <div id="episodes" className="mb-4 my-lg-2">
            <MovieList2
              key={index}
              results={episodeDetails?.episodes}
              title={`${episodeDetails?.name} `}
              handleEpisodeChange={handleEpisodeChange}
              season_number={episodeDetails?.season_number}
            />
          </div>
        }
        <div>
          {result.seasons && <ShowsCollection results={result.seasons} title="Seasons" series_id={result.id} series_name={result.title || result.original_name} />}
        </div>
      </div>
      {recommendedShow && <ShowsCollection results={recommendedShow} title="Recommended Shows" />}
    </>
  );
}
export default Show;