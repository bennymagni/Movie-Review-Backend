const app = require('express');
const router = app.Router();
const MoviesController = require('./movies.controller')
const ReviewsController = require('./reviews.controller')

router.route('/')
      .get(MoviesController.apiGetMovies)

router.route('/id/:id').get(MoviesController.apiGetMovieById)

router.route('/review')
      .post(ReviewsController.apiPostReview)
      .put(ReviewsController.apiUpdateReview)
      .delete(ReviewsController.apiDeleteReview)

router.route('/ratings').get(MoviesController.apiGetRatings)

module.exports = router