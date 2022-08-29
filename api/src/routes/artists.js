const {Router} = require('express');
const artists = require('../controllers/Artists')

const router = Router()

router.get('/topartists',artists.getTopArtists);
router.get('/topartists/:artist',artists.getTopTracks);
router.get('/topartists/:artist/:song',artists.getTrackDetail);


module.exports = router;