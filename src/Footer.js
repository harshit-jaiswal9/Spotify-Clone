import React,{useEffect, useState} from 'react'
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from './DataLayer';
import useSound from 'use-sound';


function Footer({spotify}) {

    const [{ token, item, playing }, dispatch] = useDataLayerValue();
   
   //console.log(item,playing);

   // const soundUrl = '/Songlist/guitar-loop.mp3';

    //const [play, { stop, isPlaying }] = useSound(soundUrl);
  

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r,spotify);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = (r) => {
 
   //console.log(r)
    if (playing) {
      spotify.pause(r);
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play(r)  //'device_id:46c7224b9bc0fa7ec413d3b2b4949fa2f911c210'
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
  
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };


    return (
        <div className='footer'>
           <div className='footer__left'>
               
           <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}

           </div>
           
           <div className='footer__center'>
           <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (<>
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
           // src="https://open.spotify.com/track/0Dgnvs9E1oMKMn6MPv9Zk4?si=fd1a211177014fc8"
            fontSize="large"
            className="footer__icon"
          />
         
          </>
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
          
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
           </div> 
           
           <div className='footer__right'>
           <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider  />
          </Grid> 
        </Grid>
           </div>


        </div>
    )
}

export default Footer;

