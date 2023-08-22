import React from 'react'
import Head from "next/head";

function MovieSeo({ movie}) {
  return (
      <Head>
          <title>{`${movie.title || movie.original_name} - day2movies`}</title>
          <meta name="msvalidate.01" content="4329EF281E3B1FCF5290B8C366AC2E31" />
          <meta http-equiv="content-language" content="en-in"></meta>
          <meta
              name="description"
              content={`${movie.title || movie.original_name}, ${movie.overview}`}
          />
          <meta
              property="og:title"
              content={`${movie.title || movie.original_name} day2movies - watch movies & series online for free`}
              key="title"
          />
          <meta
              property="og:description"
              content={`${movie.title || movie.original_name}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
              property="twitter:url"
              content={`https://day2movies.com/${movie.id}`}
          />
          <meta
              property="twitter:title"
              content={`${movie.title || movie.original_name} day2movies - watch movies & series online for free`}
          />
          <meta
              property="twitter:description"
              content={`${movie.title || movie.original_name}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="twitter:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />

          <meta property="og:type" content="website" />
          <meta
              property="og:url"
              content={`https://day2movies.com/${movie.id}`}
          />
          <meta
              property="og:title"
              content={`${movie.title || movie.original_name} day2movies - watch movies & series online for free`}
          />
          <meta
              property="og:description"
              content={`${movie.title || movie.original_name}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="628" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

export default MovieSeo