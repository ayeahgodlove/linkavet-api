
import { IsArray, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { IProduct, emptyProduct } from "../../domain/models/product";
import { nanoid } from "nanoid";

export class ProductRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString() 
  shortDescription: string;

  @IsNotEmpty()
  // @IsNumber()
  amount: number;

  @IsNotEmpty()
  // @IsNumber()
  qtty: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string

  @IsNotEmpty()
  @IsString()
  availabilityStatus: string

  @IsNotEmpty()
  @IsNumber()
  discountPercentage: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;


  constructor(data: IProduct) {
    this.name = data.name;
    this.description = data.description;
    this.shortDescription = data.shortDescription;
    this.amount = data.amount;
    this.qtty = data.qtty;
    this.categoryId = data.categoryId;
    this.availabilityStatus = data.availabilityStatus;
    this.discountPercentage = data.discountPercentage;
    this.rating = data.rating
  }

  toData(): IProduct {
    return {
      ...emptyProduct,
      id: nanoid(10),
      name: this.name,
      description: this.description,
      shortDescription: this.shortDescription,
      amount: this.amount,
      qtty: this.qtty,
      categoryId: this.categoryId,
      availabilityStatus: this.availabilityStatus,
      discountPercentage: this.discountPercentage,
      rating: this.rating,
    };
  }

  toUpdateData(data: IProduct): IProduct {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      amount: data.amount,
      qtty: data.qtty,
      categoryId: data.categoryId,
      productImages: data.productImages,
      tags: data.tags,
      availabilityStatus: data.availabilityStatus,
      discountPercentage: data.discountPercentage,
      rating: data.rating
    };
  }
}
