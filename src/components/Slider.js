'use client'
// import { useState, useEffect } from "react";
import CAROUSEL from "./carousel"
import "../../public/css/slider.css"
import "../../public/css/slick.min.css";
function Slider(result) {
  // const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const poster = result?.results;
  const post = poster?.slice(0, 5);

  return (
    <>
    <CAROUSEL resource={result} />
    </>
  );
}

export default Slider;
