const MoviesDAO = require("../dao/moviesDAO");

class MoviesController{
    static async apiGetMovies (req, res, next){
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        let filters = {}
        if (req.query.rated){
            filters.rated = req.query.rated
        }else if (req.query.title){
            filters.title = req.query.title
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage})

        const response = {
            movies: moviesList,
            page:page,
            filters:filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }

        res.status(200).json(response);
    }

    static async apiGetMovieById(req, res, next){
        try {
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id)
            if(!movie){
                res.status(404).json({error: "not found"})
                return
            }

            res.status(200).json(movie)
        } catch (error) {
            console.error(`${error}`)
            res.status(500).json({error: error})
        }
    }

    static async apiGetRatings(req, res, next){
        try {
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        } catch (error) {
            console.log(`api, ${error}`)
            res.status(500).json({error:e})
        }
    }

}

module.exports = MoviesController