import Show from ".";
import constant from "@/helper/constant";
import * as tmdbSeriesApi from "@/api/tv-series";

export async function getData(context) {
  const { series_id } = context.params;
  const apiKey = constant.TMDB.API_KEY;

  const generateEndpoint = (id, seasons) => {
    return seasons.map(
      (season) =>
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );
  };

  const getTvSeasonDetails = async (id, seasons) => {
    const generatedEndpoint = await generateEndpoint(id, seasons);
    const requestTvSeasonDetails = await generatedEndpoint.map((endpoint) =>
      fetch(endpoint)
    );
    const responseTvSeasonDetails = await Promise.all(requestTvSeasonDetails);
    const responseTvSeasonDetailsJson = await Promise.all(
      responseTvSeasonDetails.map((response) => response.json())
    );
    return responseTvSeasonDetailsJson;
  };

  let request;
  let tvSeasonDetails;
  // &append_to_response=external_ids
    await fetch(
      `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}&language=en-US&append_to_response=external_ids`
    ).then((response) => response.json()).then(async (responseTvDetails) => {
      request = responseTvDetails;
      // request.videos.re
      return await getTvSeasonDetails(
        responseTvDetails.id,
        responseTvDetails.seasons
      )
    }).then((res) => {
      tvSeasonDetails = res;
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
  ).then((res) => res.json());
  return {
    props: {
      result: request,
      recommendedShow: response.results || null,
      tvSeasonDetails
    },
  };
}


export async function generateMetadata(context) {
  // read route params
  const id = context.params.series_id;
  const seriesDetails = await tmdbSeriesApi.getTvSeriesById({ series_id: id, append_to_response: "videos" })
  // fetch data
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = `https://image.tmdb.org/t/p/w780${seriesDetails.poster_path}` || []

  return {
    title: `${seriesDetails.name || seriesDetails.original_name} - Stream To Night`,
    description: `${seriesDetails.title || seriesDetails.original_name}, ${seriesDetails.overview}`,
    openGraph: {
      title: `${seriesDetails.name || seriesDetails.original_name} Stream To Night - watch movies & series online for free`,
      description: `${seriesDetails.name || seriesDetails.original_name}, ${seriesDetails.overview}`,
      url: `https://streamtonight.online/${seriesDetails.id}`,
      siteName: 'streamtonight',
      images: previousImages,
      locale: 'en_US',
      type: 'website',
    },
  }
}


export default async function (context) {
  const data = await getData(context).then((res) => res);
  data.props.season_number=context.searchParams?.season_number
  return <Show  {...data?.props}/>
};