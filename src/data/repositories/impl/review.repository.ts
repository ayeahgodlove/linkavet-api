import { Review } from "../../entities/review";
import { IReview } from "../../../domain/models/review";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class ReviewRepository implements IRepository<IReview, Review> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Review as parameter
   * @review
   * returns void
   */
  async create(review: IReview): Promise<Review> {
    try {
      return await Review.create<Review>({ ...review });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Review
   */
  async findById(id: string): Promise<Review | null> {
    try {
      const reviewItem = await Review.findByPk(id);

      if (!reviewItem) {
        throw new NotFoundException("Review", id);
      }
      return reviewItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Review
   */
  async findByName(name: string): Promise<Review | null> {
    try {
      const reviewItem = await Review.findOne({ where: { comment: name } });
      return reviewItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Review
   */
  async getAll(): Promise<Review[]> {
    try {
      const reviews = await Review.findAll();
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Review as parameter
   * @review
   * returns void
   */
  async update(review: IReview): Promise<Review> {
    const { id } = review;
    try {
      const reviewItem: any = await Review.findByPk(id);

      console.log(review);
      if (!reviewItem) {
        throw new NotFoundException("Review", id.toString());
      }

      return await reviewItem.update({ ...review });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const reviewItem = await Review.findByPk(id);

      if (!reviewItem) {
        throw new NotFoundException("Review", id);
      }

      await reviewItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
