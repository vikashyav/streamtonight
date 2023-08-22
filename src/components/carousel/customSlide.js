import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Const from "../../helper/constant";
import slugify from "../../../utils/slugify";

export default function CustomSlide(props) {
  const { backdrop, title, overview, genres, id, original_title, original_name, ...otherprops } = props; 
  const [imgUrl, setImgUrl] = useState(`${Const.TMDB.IMAGE_BASE_URL}/w780${backdrop}`);
  const router = useRouter();
  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };
  const reformatTitle = (title) => {
    return slugify(title) ||title.replace(/ /g, "-").toLowerCase();
  };
  const getCurrentUrl = `/${checkTvOrMovieFromTitle(original_title, original_name)}/${checkTvOrMovieFromTitle(original_title, original_name) == "movie" ? reformatTitle(title) : reformatTitle(props?.name)}/${id}`;
  useEffect(() => {
    let img_size = Const.SLIDER_IMG_SIZE;
    const screen_size = window.screen.width;
    const clientBodyWidth = document.body.clientWidth;
    let IMG_URL;
    if (clientBodyWidth <= 500) {
      console.log(1);
      img_size = 'w300';
      IMG_URL = `${Const.TMDB.IMAGE_BASE_URL}/${img_size}${backdrop}`
      setImgUrl(IMG_URL);
    }
    else if (screen_size <= 700) {
      console.log(2);
      img_size = 'w500';
      IMG_URL = `${Const.TMDB.IMAGE_BASE_URL}/${img_size}${backdrop}`
      setImgUrl(IMG_URL);
      return;
    } else if (screen_size <=1200) {
      console.log(3);
      img_size = 'w780';
      IMG_URL = `${Const.TMDB.IMAGE_BASE_URL}/${img_size}${backdrop}`
      setImgUrl(IMG_URL);
      return;
    } else {
      console.log(4);
      img_size = 'w1280';
      IMG_URL = `${Const.TMDB.IMAGE_BASE_URL}/${img_size}${backdrop}`
      setImgUrl(IMG_URL);
      return;
    }
    console.log("width", imgUrl, clientBodyWidth);
  }, [])

  return (
    <div {...otherprops}>
      <div className="mx-1 mx-lg-1 mx-xl-2 cursor-pointer carousel-container"
        onClick={() => router.push(getCurrentUrl)}
      >
        <div className="carousel-description">
          <h2>{title}</h2>
          {/* <h6>{genres.slice(0, 3).join(" . ")}</h6> */}
          <p>{overview}</p>
        </div>
        <div className="carousel-overlay"></div>
        <div className="carousel-img">
          <img
            src={imgUrl}
            title={title||"day2movies"}
            alt={Const.ATTRIBUTES.IMG}
            className="d-inline"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
