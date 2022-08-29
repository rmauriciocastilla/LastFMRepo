import { CLEAR_DETAIL, GET_ARTISTS, GET_ARTIST_DETAIL,GET_TRACK_DETAIL, USER_ROLE, GET_COMPRAS } from "../actions/variables"

const initialState ={
    artists: [],
    artistTracks:[],
    trackDetail:{},
    role: 'loading',
    myCart:[],
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_ARTISTS:
            return{
                ...state,
                artists: action.payload
            }
        case GET_ARTIST_DETAIL:
            return{
                ...state,
                artistTracks: action.payload
            }
        case GET_TRACK_DETAIL:
            return{
                ...state,
                trackDetail: action.payload
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                artistTracks: [],
                trackDetail: {}
            }
        case USER_ROLE:
            return{
                ...state,
                role: action.payload
            }
        case GET_COMPRAS:
            return{
                ...state,
                myCart: action.payload.reverse()
            }
        default:
            return {...state}
    }
}