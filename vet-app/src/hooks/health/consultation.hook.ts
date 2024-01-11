import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addConsultationSuccess,
  editConsultationSuccess,
  fetchConsultationsAsync,
  setActiveConsultation,
} from "../../redux/health/consultation.slice";
import { IConsultation, emptyConsultation } from "models/health/consultation";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { ConsultationService } from "services/health/consultation.service";

const useConsultation = () => {
  const consultations = useSelector<IRootState, IConsultation[]>(
    (state) => state.consultation.consultations
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.consultation.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.consultation.initialFetch
  );
  const consultation = useSelector<IRootState, IConsultation>(
    (state) => state.consultation.consultation
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadConsultations = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchConsultationsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addConsultation = async (consultation: IConsultation) => {
    return await ConsultationService.create(consultation)
      .then((consultationResponse) => {
        dispatch(addConsultationSuccess(consultationResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setConsultation = (consultation: IConsultation) => {
    dispatch(setActiveConsultation(consultation));
  };

  const editConsultation = async (consultation: IConsultation) => {
    return await ConsultationService.update(consultation)
      .then((consultationResponse) => {
        dispatch(editConsultationSuccess(consultationResponse.data));
        setConsultation(consultationResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const getConsultation = useCallback((consultationId: string) => {
    const consultation = consultations.find((c) => c.id === consultationId);

    if (!consultation) {
      return emptyConsultation;
    }
    return consultation;
  }, []);
  useEffect(() => {
    // loadConsultations();
  }, [consultation, consultations, isLoading, initialFetch, loadConsultations]);

  return {
    consultation,
    consultations,
    isLoading,
    initialFetch,
    addConsultation,
    editConsultation,
    setConsultation,
    getConsultation,
  };
};

export { useConsultation };
