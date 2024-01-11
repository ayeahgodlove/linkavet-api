import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";

// {
//   question: "What is JavaScript?",
//   answers: ["A programming language", "A web browser", "A markup language"],
//   correctAnswerIndex: 0,
// }

export interface IQuiz {
  id: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  lessonId: string;
}

export const emptyQuiz: IQuiz = {
  id: "",
  question: "",
  answers: [""],
  correctAnswerIndex: 0,
  lessonId: "",
};

export interface IQuizState extends IBaseState {
  readonly quizs: IQuiz[];
  readonly quiz: IQuiz;
}

export interface IQuizResponse extends IResponseBase {
  data: IQuiz;
}

export interface IQuizResponses extends IResponseBase {
  data: IQuiz[];
}
