import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addCourseSuccess,
  editCourseSuccess,
  fetchCoursesAsync,
  setActiveCourse,
} from "../../redux/lms/course.slice";
import { CourseFormData, ICourse, emptyCourse } from "models/lms/course";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { CourseService } from "services/lms/course.service";

const useCourse = () => {
  const courses = useSelector<IRootState, ICourse[]>(
    (state) => state.course.courses
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.course.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.course.initialFetch
  );
  const course = useSelector<IRootState, ICourse>(
    (state) => state.course.course
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadCourses = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchCoursesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addCourse = async (course: FormData) => {
    return await CourseService.create(course)
      .then((courseResponse) => {
        dispatch(addCourseSuccess(courseResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setCourse = (course: ICourse) => {
    dispatch(setActiveCourse(course));
  };

  const editCourse = async (course: CourseFormData) => {
    return await CourseService.update(course)
      .then((courseResponse) => {
        dispatch(editCourseSuccess(courseResponse.data));
        setCourse(courseResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const getCourse = useCallback((courseId: string) => {
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      return emptyCourse;
    }
    return course;
  }, []);
  useEffect(() => {
    // loadCourses();
  }, [course, courses, isLoading, initialFetch, loadCourses]);

  return {
    course,
    courses,
    isLoading,
    initialFetch,
    addCourse,
    editCourse,
    setCourse,
    getCourse,
  };
};

export { useCourse };
