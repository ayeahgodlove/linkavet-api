import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IPost {
  id: string; //primary key
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  publishedAt: Date;
  authorId: string; //foreign key to user table
  categoryId: string; //foreign key to user table
  tags: string[]
}


export interface PostFormData extends FormData {
  id: string; // Assuming the ID is a string, adjust the type as needed
}

export const emptyPost: IPost = {
  id: "",
  slug: "",
  title: "",
  content: "",
  imageUrl: "",
  publishedAt: new Date(),
  authorId: "",
  categoryId: "",
  tags: []
};


export interface IPostState extends IBaseState {
  readonly posts: IPost[];
  readonly post: IPost;
}


export interface IPostResponse extends IResponseBase {
  data: IPost;
}

export interface IPostResponses extends IResponseBase {
  data: IPost[];
}