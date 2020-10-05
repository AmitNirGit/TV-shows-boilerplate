import React, { useState, useEffect } from "react";
import Show from "./Show";
import "./Home.css";
import bg from "../video/popcorn.mp4";

function Home() {
  const [shows, setShows] = useState([]);
  const [searchValue, seatSearchValue] = useState("");

  const fetchTop = () => {
    fetch("https://www.episodate.com/api/most-popular")
      .then((res) => res.json())
      .then((data) => {
        setShows(data.tv_shows);
      });
  };
  const searchHandler = (e) => {
    seatSearchValue(e.target.value);
  };
  const handleSubmit = () => {
    if (!searchValue) {
      fetchTop();
    } else {
      fetch(`https://www.episodate.com/api/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          setShows(data.tv_shows);
        });
    }
  };

  useEffect(() => {
    fetchTop();
  }, []);

  return (
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>

      <input type='text' id='search-bar' onChange={searchHandler} />
      <button id='submit-btn' onClick={handleSubmit}>
        submit
      </button>

      <div className='top-shows'>
        {shows.map((show) => (
          <Show show={show} key={show.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
