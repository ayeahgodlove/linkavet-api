import { ILesson, ILessonResponse, ILessonResponses } from "models/lms/lesson";
import { requestType } from "services";

export const LessonService = {
  list: (): Promise<ILessonResponses> => requestType.get("/api/lessons"),
  details: (code: string): Promise<ILessonResponse> =>
    requestType.get(`/api/lessons/${code}`),
  create: (lesson: ILesson): Promise<ILessonResponse> =>
    requestType.post(`/api/lessons`, lesson),
  update: (lesson: ILesson): Promise<ILessonResponse> =>
    requestType.put(`/api/lessons/${lesson.id}`, lesson),
  delete: (lesson: ILesson): Promise<ILessonResponse> =>
    requestType.del(`/api/lessons/${lesson.id}`, lesson),
};
