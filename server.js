const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const favList = require('./favList.json');

//CORS middleware enables all CORS requests
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://itunes-api-server.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback){
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    }else{
      console.log("Origin rejected")
      callback(new Error("Not allowed by CORS"))
    }
  }
}

app.use(cors(corsOptions));

//Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//helmet security policy
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "default-src": ["'self'", "https://itunes.apple.com/"],
        "script-src": [
          "'self'",
          "'sha256-1kri9uKG6Gd9VbixGzyFE/kaQIHihYFdxFKKhgz3b80='",
        ],
        "object-src": ["'self'"],
        "img-src": ["'self'", "https://itunes.apple.com/", "https:"],
        "connect-src": ["'self'", "https://itunes.apple.com/"],
        "font-src": ["'self'"],
        "style-src": [
          "'self'",
          "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='",
        ],
      },
    })
  );
  
//GET function to display all data in favList.json
app.get('/api', (req, res)=>{
    fs.readFile('favList.json', (err, data) => {
      if(err){
        res.send("File not found. First post to create file.");
      }else{
        const fav = JSON.parse(data);

        res.send(fav);
      }
    });
});

//GET data from itunes based on term and media search
app.get('/itunes/:termmedia', async(req, res) => {
    //Split termmedia at the comma (,)
    const term_media = req.params.termmedia.split(',');

    //Define term and media
    const term = term_media[0];
    const media = term_media[1];

    const url = `https://itunes.apple.com/search?term=${term}&media=${media}&country=za&limit=25`;
    const fetch_res = await fetch(url);
    const data_res = await fetch_res.json();
    res.json(data_res);
});

//POST function to add favourites to favList.json
app.post('/', (req, res) => {
    const newFav = {
        trackID: req.body.trackID,
        artistName: req.body.artistName,
        trackName: req.body.trackName,
        artworkUrl100: req.body.artworkUrl100,
        kind: req.body.kind,
    };

    if(!newFav.trackID || !newFav.trackName){
        return res.status(400).json({msg: "Please add a track ID and name"});
    }else{
        favList.push(newFav);

        fs.writeFile('favList.json', JSON.stringify(favList), (err) => {
          if(err) throw err;
          res.json({msg: "Data not written", favList});
        });
    }
});


//DELETE items from favourites
app.delete('/:id', (req, res) => {
    //Returns found as true if trackID = req.param.id
    //Returns found as false if requested param id doesn't exist
    const found = favList.some(
        (fav) => fav.trackID === parseInt(req.params.id)
    );

    if(found){
        //Removes favourite from array based on the track id
        let del_fav = favList;

        del_fav.splice(
            del_fav.findIndex((del) => del.trackID === parseInt(req.params.id)),
            1
        );

        //Updates favList.json
        fs.writeFile('favList.json', JSON.stringify(del_fav), (err) => {
          if(err) throw err;
        });

        res.json({
            msg: "Favourite removed",
            del_fav,
        });
    }else{
        res.status(400).json({msg:`${req.params.id} does not exist in Favourites`});
    }
});

//Manage errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something is broken!");
});


//DEPLOYMENT
if (process.env.NODE_ENV === "production") {
  //Serves any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  //Handles React routing, retun all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}
  
  //Listening on PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});