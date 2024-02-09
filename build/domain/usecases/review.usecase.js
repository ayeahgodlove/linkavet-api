"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewUseCase = void 0;
class ReviewUseCase {
    reviewRepository;
    /**
     *
     */
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async createReview(review) {
        const existingReview = await this.reviewRepository.findByName(review.comment);
        if (existingReview) {
            throw new Error("Review already exists");
        }
        // const _review = new Review({review});
        //because it's already done in the Repository
        return this.reviewRepository.create(review);
    }
    async getAll() {
        return this.reviewRepository.getAll();
    }
    async getReviewById(id) {
        return this.reviewRepository.findById(id);
    }
    async updateReview(review) {
        return this.reviewRepository.update(review);
    }
    async deleteReview(id) {
        return this.reviewRepository.delete(id);
    }
}
exports.ReviewUseCase = ReviewUseCase;
