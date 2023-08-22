import moment from "moment";

const tmdbPayload= {
     BOLLYWOOD_RECENT_YEAR_PAYLOAD :{
        certification_country: "IN",
        with_original_language: "hi",
        "release_date.gte": moment().subtract(1, 'year').startOf('year').format("YYYY-MM-DD") || "2023-01-01",
        "release_date.lte": moment().add(1, 'week').format("YYYY-MM-DD") || "2023-08-16",
    }
}

export default tmdbPayload;