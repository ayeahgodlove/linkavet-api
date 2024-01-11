import { IQuiz, IQuizResponse, IQuizResponses } from "models/lms/quiz";
import { requestType } from "services";

export const QuizService = {
    list: (): Promise<IQuizResponses> => requestType.get("/api/quizes"),
    details: (code: string): Promise<IQuizResponse> => requestType.get(`/api/quizes/${code}`),
    create: (quiz: IQuiz): Promise<IQuizResponse> => requestType.post(`/api/quizes`, quiz),
    update: (quiz: IQuiz): Promise<IQuizResponse> =>
    requestType.put(`/api/quizs/${quiz.id}`, quiz),
  delete: (quiz: IQuiz): Promise<IQuizResponse> =>
    requestType.del(`/api/quizs/${quiz.id}`, quiz),
} 