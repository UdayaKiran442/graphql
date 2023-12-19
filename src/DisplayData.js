import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`;

const QUERY_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
    }
  }
`;

const DisplayData = () => {
  const { data } = useQuery(QUERY_ALL_USERS);
  const { data: movies } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = useState();
  const [fetchData, { data: searchedMoviesData }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (movies) {
      console.log(movies);
    }
    if (searchedMoviesData) {
      console.log(searchedMoviesData);
    }
  }, [data, movies, searchedMoviesData]);
  return (
    <div>
      DisplayData
      <input
        placeholder="Superbad"
        onChange={(e) => {
          setMovieSearched(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchData({
            variables: {
              name: movieSearched,
            },
          });
        }}
      >
        Fetch Data
      </button>
    </div>
  );
};

export default DisplayData;
