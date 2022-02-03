import { findAllByDisplayValue } from "@testing-library/react";

export const initialState ={
    user: null,
    playlists: [],
   spotify: null,
   discover_weekly: null,
   top_artists: null,
   playing: false,
   item: null,
    //token:'BQARowLaZCx--WnP6Ya1xH-pBN8rLh8GBvkjhJz9z3FjsrLwC2VJaGfpLF6lc2AhevcVRhVMlTr1gGPEAMRVMx5GB0hx-CWp-b1Qgejk0rHsTi9Qo_m9FrOltkvcnjPrrbLwqSZEl26khTg52y9pIMo52Mxi437z2xrxTOnFAFnxl9PSF9mK' 
};

const reducer =(state, action)=>{
  switch(action.type)
   {
      case 'Set_USER':
          return {
              ...state,
              user: action.user 
          }
          case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
        
      default : return state;
   }
}

export default reducer;