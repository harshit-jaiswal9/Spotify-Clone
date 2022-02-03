import React,{useEffect,useState} from 'react';
import './App.css';
import { getTokenFromUrl } from './Spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import { useDataLayerValue } from './DataLayer';
import Login from './Login.js'
 


const spotify =new SpotifyWebApi();

function App() {
 // const [token,setToken]= useState(null);
  const [{ token},dispatch]=useDataLayerValue();

  useEffect(()=>{
  const hash= getTokenFromUrl();
  window.location.hash="";

  const _token=hash.access_token;
if(_token)
{
 // setToken(_token);
  spotify.setAccessToken(_token);

  dispatch({
    type: "SET_TOKEN",
    token: _token,
  });

  spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

  spotify.getMe().then(user =>{
     dispatch({type:'SET_USER', user: user,})
  });
  spotify.getUserPlaylists().then((playlists)=>{
    dispatch({type:"SET_PLAYLISTS",playlists: playlists,});
  }); 

/*   spotify.getPlaylist('37i9dQZEVXcJZyENOWUFo7').then(response =>{    
     dispatch({type:"SET_DISCOVER_WEEKLY",
       discover_weekly: response,
 }); */
 spotify.getPlaylist('0pREl1SgnBeF31FGMokgOj').then(response =>{    
  dispatch({type:"SET_DISCOVER_WEEKLY",
    discover_weekly: response,
}); 
 });
}   
  console.log("token",token);
}, [token, dispatch]); 

  return (
    <div className="App">
      {
        token ? <Player spotify={spotify} /> : <Login />
      }
        
    </div>
  );
}
 
export default App;
