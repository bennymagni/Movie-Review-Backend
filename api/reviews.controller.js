const ReviewsDAO = require('../dao/reviewsDAO');


class ReviewsController{
    static async apiPostReview (req, res, next) {
        try {
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id:req.body.user_id
            }

            const date = new Date

            const ReviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date)

            res.status(200).json({status: 'Success!!!!'})

        } catch (error) {
            res.status(500).json({error: e.message})
        }
    } 
    
    static async apiUpdateReview(req, res, next){
        try {
             const reviewId = req.body.review_id
             const review = req.body.review

             const date = new Date

             const ReviewResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, review, date)

             var { error } = ReviewResponse
             if(error){
                response.status.json({error})
             }
             if (ReviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review. User may not be the original poster")
             }
             res.status(200).json({status:"success"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)
            res.status(201).json({status: "Success"})
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }
}

module.exports = ReviewsController