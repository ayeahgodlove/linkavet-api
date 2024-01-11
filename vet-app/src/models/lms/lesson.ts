import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";

export interface ILesson {
  id: string;
  title: string;
  description: string;
  authorId: string;
  content: string;
  duration: number;
  difficulty: string;
  courseId: string;
  // dependencies
  prerequisites: string[];
  objectives: string[];
  keywords: string[];

   // Additional properties
   author: string;
   category?: string;
   language?: string;
   targetAudience?: string;
   rating?: number;
   reviews?: string[];
}

export const emptyLesson: ILesson = {
  id: "",
  title: "",
  description: "",
  authorId: "",
  content: "",
  duration: 0,
  difficulty: "",
  prerequisites: [],
  objectives: [],
  keywords: [],
  author: "",
  courseId: ""
};

export interface ILessonState extends IBaseState {
  readonly lessons: ILesson[];
  readonly lesson: ILesson;
}

export interface ILessonResponse extends IResponseBase {
  data: ILesson;
}

export interface ILessonResponses extends IResponseBase {
  data: ILesson[];
}