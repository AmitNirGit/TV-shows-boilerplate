import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OneShow.css";
import likedImg from "../media/liked.png";
import notLikedImg from "../media/notLiked.png";

function OneShow() {
  const { id } = useParams(); //this is the selected show id
  const [tvShow, setTvShow] = useState("");
  const [Liked, setLiked] = useState(
    JSON.parse(localStorage.getItem(id)) || false
  );

  const fetchDetails = () => {
    fetch(`https://www.episodate.com/api/show-details?q=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTvShow(data.tvShow);
      });
  };
  const likeHandler = () => {
    localStorage.setItem(id, !Liked);
    setLiked(!Liked);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (tvShow) {
    return (
      <div className='one-show-container'>
        <Link className='go-back-link' to='/'>
          <img
            className='go-back-img'
            alt='Go back'
            src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
          />
        </Link>
        <div className='like-div' onClick={likeHandler}>
          {Liked ? (
            <img className='interaction-img' src={likedImg} alt='liked'></img>
          ) : (
            <img
              className='interaction-img'
              src={notLikedImg}
              alt='not liked'></img>
          )}
        </div>
        <div className='one-show-img-and-title'>
          <h2>{tvShow.name}</h2>
          <img className='one-show-img' src={tvShow.image_path}></img>
          <div className='one-show-footer'>
            <div className='seasons'>
              {tvShow.episodes[tvShow.episodes.length - 1].season} seasons
            </div>
            <div className='genres'>
              {tvShow.genres.map((genre) => (
                <span className='genre'>{genre}</span>
              ))}
            </div>
            <div className='rating'>
              <span
                className={
                  tvShow.rating >= 8
                    ? "green"
                    : tvShow.rating < 6
                    ? "red"
                    : "yellow"
                }>
                {tvShow.rating.toString().substring(0, 3)}
              </span>
            </div>
            <div className='show-status'>
              <span className='status'>{tvShow.status}</span>
            </div>
          </div>
        </div>
        <div className='one-show-description'>
          <h2>description:</h2>
          {tvShow.description}
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default OneShow;
