import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addEnrollmentSuccess,
  editEnrollmentSuccess,
  fetchEnrollmentsAsync,
  setActiveEnrollment,
} from "../../redux/lms/enrollment.slice";
import { IEnrollment, emptyEnrollment } from "models/lms/enrollment";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { EnrollmentService } from "services/lms/enrollment.service";

const useEnrollment = () => {
  const enrollments = useSelector<IRootState, IEnrollment[]>(
    (state) => state.enrollment.enrollments
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.enrollment.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.enrollment.initialFetch
  );
  const enrollment = useSelector<IRootState, IEnrollment>(
    (state) => state.enrollment.enrollment
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadEnrollments = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchEnrollmentsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addEnrollment = async (enrollment: IEnrollment) => {
    return await EnrollmentService.create(enrollment)
      .then((enrollmentResponse) => {
        dispatch(addEnrollmentSuccess(enrollmentResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setEnrollment = (enrollment: IEnrollment) => {
    dispatch(setActiveEnrollment(enrollment));
  };

  const editEnrollment = async (enrollment: IEnrollment) => {
    return await EnrollmentService.update(enrollment)
      .then((enrollmentResponse) => {
        dispatch(editEnrollmentSuccess(enrollmentResponse.data));
        setEnrollment(enrollmentResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const getEnrollment = useCallback((enrollmentId: string) => {
    const enrollment = enrollments.find((c) => c.id === enrollmentId);

    if (!enrollment) {
      return emptyEnrollment;
    }
    return enrollment;
  }, []);
  useEffect(() => {
    // loadEnrollments();
  }, [enrollment, enrollments, isLoading, initialFetch, loadEnrollments]);

  return {
    enrollment,
    enrollments,
    isLoading,
    initialFetch,
    addEnrollment,
    editEnrollment,
    setEnrollment,
    getEnrollment,
  };
};

export { useEnrollment };
