import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Game from '../models/game.js';
import Genre from '../models/genre.js';



router.post("/createNewGame", async(req, res) => {
    const { 
        gameName,
        gamePrice,
        gameDescription,
        gameImage,
        gameGenre    
    } = req.body.game;
    Game.findOne({ gameName: gameName })
    .then(game => {
        if(game) {
            return res.status(200).json({
                status: false,
                message: `${gameName} is already exist`
            })
        } else {
            Genre.findOne({ genreName: gameGenre })
            .then(async(genre) => {
                let genreId;
                if(!genre) {
                    const new_genre = new Genre({ _id: new mongoose.Types.ObjectId(), genreName: gameGenre })
                    new_genre.save();
                    genreId = new_genre._id;
                } else {
                    genreId = genre._id;
                }
                const new_game = new Game({
                    _id: new mongoose.Types.ObjectId(),
                    genreId,
                    gameName,
                    gamePrice,
                    gameDescription,
                    gameImage
                })

                return new_game.save()
                .then((g) => {
                    console.log(g);
                    return res.status(200).json({
                        status: true,
                        message: "Success"
                    })
                })
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            status: false,
            message: error.message
        })
    })
    
})

router.get("/getAllGames", async(req, res) => {
    try {
        const games = await Game.find().populate('genreId', 'genreName').exec();
        let formatted_games = games.map(game => {
          return {
            ...game.toObject(),
            gameGenre: game.genreId.genreName
          };
        });
        return res.status(200).json({
            games: formatted_games
        })
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
})

router.get("/getGameById/:gameId", async(req, res) => {
    const { gameId } = req.params;
    try {
        const games = await Game.find({ _id: gameId }).populate('genreId', 'genreName').exec();
        let formatted_games = games.map(game => {
          return {
            ...game.toObject(),
            gameGenre: game.genreId.genreName
          };
        });
        return res.status(200).json({
            game: formatted_games[0]
        })
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
})

router.get("/getAllGeners", async(req, res) => {
    Genre.find({ })
    .then(geners => {
        return res.status(200).json({
            geners
        })
    })
    .catch(error => {
        console.log(error);
    })
})

router.put("/editGame", async(req,res) => {
    const { 
        gameId,
        gameName,
        gamePrice,
        gameDescription,
        gameImage,
        gameGenre    
    } = req.body.game;
    Game.findById(gameId)
    .then(game => {
        game.gameName = gameName;
        game.gamePrice = gamePrice;
        game.gameDescription = gameDescription;
        game.gameImage = gameImage;
        Genre.findOne({ genreName: gameGenre })
        .then(gener => {
            if(gener) {
                game.genreId = gener._id;
            } else {
                const new_genre = new Genre({ _id: new mongoose.Types.ObjectId(), genreName: gameGenre })
                new_genre.save();
                game.genreId = new_genre._id;
            }
            return game.save()
            .then(() => {
                return res.status(200).json({
                    status: true,
                    message: `${gameName} was updated succsesfuly`
                })
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

router.delete("/deleteGameById/:gameId", async(req, res) => {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId)
    .then(() => {
        return res.status(200).json({
            status: true
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

export default router;