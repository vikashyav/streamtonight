// import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";

function ListItem({ result, season_number, handleEpisodeChange }) {
    // const BASE_URL = "https://image.tmdb.org/t/p/original/";
    // const router = useRouter();

    return (
        // <Link href={`/movie/${result.id}`} legacyBehavior>
            <div
                className="flex min-w-[250px] min-h-[170px] md:min-w-[250px] md:min-h-[170px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10 hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
            // min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px]
            onClick={() => handleEpisodeChange(result?.episode_number)}
            >
                <img src={`https://image.tmdb.org/t/p/w300${result.still_path}`}
                    // width={330}
                    // height={210}
                    objectFit="cover"
                    layout='fill'
                    className="rounded-lg"
                />
                <div
                    className="absolute bottom-2 inset-x-4 md:inset-x-4 background-blur "
                    // inset-y-32 space-y-6 lg:inset-y-40 md:bottom-1   z-50
                >
                    <h2 className="font-semibold">
                        {/* md:inset-y-1 */}
                    {`S${season_number}  E${result.episode_number} . ${result.air_date}`}
                    </h2>
                    <p className="hidden">{result.overview}</p>
                </div>
            </div>
        // </Link>
    );

}

export default ListItem;
