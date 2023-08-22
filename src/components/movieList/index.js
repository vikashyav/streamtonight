import ListItem from "./list-item";

function MovieList2({ results, title, season_number, handleEpisodeChange }) {
    return (
        <div className="mt-4 mx-auto ">
            <h2 className="lg:text-2xl sm:text-4xl md:text-5xl font-semibold m-5">{title}</h2>
            <div className=" flex flex-row m-3 overflow-y-hidden">
                {results.map((result) => (
                    <ListItem key={result.id} result={result} handleEpisodeChange={handleEpisodeChange} season_number={season_number} />
                ))}
            </div>
        </div>
    );
}

export default MovieList2;
