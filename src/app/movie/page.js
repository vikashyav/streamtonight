import { getPopularMovies, getTopRatedMovies } from "@/api/movie";
import Home from "..";

//getServerSideProps getStaticProps
export async function getData(context) {
    // const session = await getSession(context);
    const page = context.searchParams?.page
    const payload = {};
    if (page < 500) {
        payload.page = page;
    }
    const [
        popularMovies,
    ] = await Promise.all([
        getPopularMovies(payload),
        // getTopRatedMovies(),
    ]);
    popularMovies.apiCallMethod = 'getPopularMovies';
    popularMovies.defaultApiPayload = {};
    return {
        props: {
            popularMovies: popularMovies,
        },
        revalidate: 100,
    };
}

export default async function(context){
  const data = await getData(context);

  return <Home {...data?.props}/>;
};