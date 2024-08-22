// src/presentation/dtos/Review-request.dto.ts

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IReview, emptyReview } from "../../domain/models/review";
import { nanoid } from "nanoid";

export class ReviewRequestDto {

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  constructor(data: IReview) {
    this.rating = data.rating;
    this.comment = data.comment;
  }

  toData(): IReview {
    return {
      ...emptyReview,
      id: nanoid(10),
      comment: this.comment,
      rating: this.rating,
    };
  }

  toUpdateData(data: IReview): IReview {
    return {
      id: data.id,
      comment: data.comment,
      rating: data.rating,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      toggle: data.toggle
    };
  }
}
