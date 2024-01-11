import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface ITag {
  id: string;
  name: string;
}

export interface ISubTag extends ITag {
  tagId: string;
}

export const emptyTag: ITag = {
  id: "",
  name: "",
};



export interface ITagState extends IBaseState {
  readonly tags: ITag[]
  readonly tag: ITag
} 

export interface ITagResponse extends IResponseBase {
  data: ITag;
}

export interface ITagResponses extends IResponseBase {
  data: ITag[];
}


