import React from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibaryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from './DataLayer';
import {getTokenFromUrl} from "./Spotify"


 function Sidebar() {

    const [{playlists},dispatch]=useDataLayerValue(); 

    console.log("playlist", playlists)
    return (
        <div className='sidebar'>
             <img className='sidebar_logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify-logo"  />
              <SidebarOption Icon={HomeIcon} option="Home"/>  
              <SidebarOption Icon={SearchIcon} option="Search"/>
              <SidebarOption Icon={LibaryMusicIcon} option="Your Library"/>  
             <br/>
             <strong className='sidebar__title'>PLAYLISTS</strong>
              <hr />  
               
               {playlists?.items?.map(playlists => (
                       <SidebarOption option={playlists.name} detail={playlists.uri}/> 
               )) }
   
        </div> 
    );
}  

export default Sidebar;