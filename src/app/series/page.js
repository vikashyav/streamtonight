import { getTrendingAllByWeek } from "@/api/movie";
import Home from "..";
import { getPopularShow } from "@/api/tv-series";
import tmdbPayload from "@/helper/tmdb-payload";
export async function getData(context) {
    // const session = await getSession(context);
    const page = context.searchParams?.page
    const payload = {
        certification_country: tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD.certification_country,
    }
    if (page<500) {
        payload.page = page;
    }
    const [
        trendingNow,
        popularShows,
    ] = await Promise.all([
        getTrendingAllByWeek(),
        getPopularShow(payload),
    ]);
    popularShows.apiCallMethod = "getPopularShow";
    popularShows.defaultApiPayload = payload;


    return {
        props: {
            trendingNow: trendingNow,
            popularShows
        },
        revalidate: 100,
    };
}


export default async function(context){
    const data = await getData(context);
    return <Home {...data?.props}/>;
};
