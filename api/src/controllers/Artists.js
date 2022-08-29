const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config()

const getTopArtists = async (req,res,next)=>{
    try {
        const {data} = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.API_KEY}&limit=10&format=json`)        
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getTopTracks = async (req,res,next)=>{
    try {
        const {artist} = req.params;
        const {data} = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${process.env.API_KEY}&limit=20&format=json`)
        res.json(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getTrackDetail = async (req,res,next)=>{
    try {
        const {artist,song} = req.params;
        const {data} = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&artist=${artist}&track=${song}&format=json`)
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports={getTopArtists,getTopTracks,getTrackDetail};