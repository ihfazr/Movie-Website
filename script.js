const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  let datatag = document.getElementById("datatag");
  datatag.innerHTML = "";
  let selectedMovie = document.getElementById("Select Menu");
  const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "57d676ce947993ee4ca284e602601ec8",
      query: selectedMovie.value,
    }
  });

  if (movieData.data.results.length < 1) {
    return;
  }

  let movie = movieData.data.results[0];
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
    params: {
      api_key: "57d676ce947993ee4ca284e602601ec8",
      append_to_response: "videos",
    }
  });

  const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
  const line1 = document.createElement("h1");
  const line2 = document.createElement('h1');
  const line3 = document.createElement('h1');
  const line4 = document.createElement('h1');
  const line5 = document.createElement('h1');
  const line6 = document.createElement('h1');
  const line7 = document.createElement('h1');
  const line8 = document.createElement('h1');
  const poster = document.createElement('img');
  const vid = document.createElement('iframe');

  line1.innerHTML = `Name: ${extraData.data.original_title}`;
  line2.innerHTML = `Release Date: ${movie.release_date}`;
  line3.innerHTML = `Adult: ${movie.adult}`;
  line4.innerHTML = `Movie Popularity: ${movie.popularity}`;
  line5.innerHTML = `Language: ${movie.original_language}`;
  line6.innerHTML = `Vote Count: ${movie.vote_count}`;
  line7.innerHTML = `Vote Average: ${movie.vote_average}`;
  line8.innerHTML = `Overview: ${movie.overview}`;
  poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  vid.src = `https://www.youtube.com/embed/${trailer}`;
  
  datatag.append(line1);
  datatag.append(line2);
  datatag.append(poster);
  datatag.append(line3);
  datatag.append(line4);
  datatag.append(line5);
  datatag.append(line6);
  datatag.append(line7);
  datatag.append(line8);
  datatag.append(vid);
};