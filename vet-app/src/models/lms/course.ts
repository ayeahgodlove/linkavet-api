import dayjs from "dayjs";
import { IBaseState } from "../base-state.model";
import { IResponseBase } from "../response-base.model";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  courseImage: string;
  authorId: string;
  price: number;
  startDate: Date;
  completionDate: Date;
}

export const emptyCourse: ICourse = {
  id: "",
  title: "",
  description: "",
  courseImage: "",
  authorId: "",
  price: 0,
  startDate: dayjs(new Date()) as unknown as Date,
  completionDate: dayjs(new Date()) as unknown as Date
};

export interface ICourseState extends IBaseState {
  readonly courses: ICourse[];
  readonly course: ICourse;
}

export interface ICourseResponse extends IResponseBase {
  data: ICourse;
}

export interface ICourseResponses extends IResponseBase {
  data: ICourse[];
}
