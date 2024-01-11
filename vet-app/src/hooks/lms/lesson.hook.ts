import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addLessonSuccess,
  editLessonSuccess,
  fetchLessonsAsync,
  setActiveLesson,
} from "../../redux/lms/lesson.slice";
import { ILesson, emptyLesson } from "models/lms/lesson";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { LessonService } from "services/lms/lesson.service";

const useLesson = () => {
  const lessons = useSelector<IRootState, ILesson[]>(
    (state) => state.lesson.lessons
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.lesson.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.lesson.initialFetch
  );
  const lesson = useSelector<IRootState, ILesson>(
    (state) => state.lesson.lesson
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadLessons = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchLessonsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addLesson = async (lesson: ILesson) => {
    return await LessonService.create(lesson)
      .then((lessonResponse) => {
        dispatch(addLessonSuccess(lessonResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setLesson = (lesson: ILesson) => {
    dispatch(setActiveLesson(lesson));
  };

  const editLesson = async (lesson: ILesson) => {
    return await LessonService.update(lesson)
      .then((lessonResponse) => {
        dispatch(editLessonSuccess(lessonResponse.data));
        setLesson(lessonResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };
  
  const getCourseLessons = useCallback((courseId: string) => {
    return lessons.filter(l => l.courseId === courseId)
  }, [])

  const getLesson = useCallback((lessonId: string) => {
    const lesson = lessons.find((c) => c.id === lessonId);

    if (!lesson) {
      return emptyLesson;
    }
    return lesson;
  }, []);
  useEffect(() => {
    // loadLessons();
  }, [lesson, lessons, isLoading, initialFetch, loadLessons]);

  return {
    lesson,
    lessons,
    isLoading,
    initialFetch,
    addLesson,
    editLesson,
    setLesson,
    getLesson,
    getCourseLessons
  };
};

export { useLesson };
