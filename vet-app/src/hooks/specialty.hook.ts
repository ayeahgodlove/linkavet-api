import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import {
  ISpecialty,
  emptySpecialty,
} from "../models/specialty.model";
import {
  addSpecialtySuccess,
  editSpecialtySuccess,
  fetchSpecialtiesAsync,
  setActiveSpecialty,
} from "../redux/specialty.slice";
import { SpecialtyService } from "../services/specialty.service";
import { useFormErrors } from "./shared/form-error.hook";
import { useUser} from "./user.hook";

const useSpecialty = () => {
  const specialties = useSelector<IRootState, ISpecialty[]>(
    (state) => state.specialty.specialties
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.specialty.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.specialty.initialFetch
  );
  const specialty = useSelector<IRootState, ISpecialty>(
    (state) => state.specialty.specialty
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadSpecialties = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchSpecialtiesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addSpecialty = async (specialty: ISpecialty) => {
    return await SpecialtyService.create(specialty)
      .then((specialtyResponse) => {
        dispatch(addSpecialtySuccess(specialtyResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setSpecialty = (specialty: ISpecialty) => {
    dispatch(setActiveSpecialty(specialty));
  };

  const editSpecialty = async (specialty: ISpecialty) => {
    return await SpecialtyService.update(specialty)
      .then((specialtyResponse) => {
        dispatch(editSpecialtySuccess(specialtyResponse.data));
        setSpecialty(specialtyResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const { users } = useUser();
  const get = (userId: string) => {
    const user = users.find((p) => p.id === userId);
    if (!user) {
      return;
    }
    return user;
  };
  const getSpeciality = useCallback((userId: string) => {
    const specialty = specialties.find((us) => us.userId === userId);
    if (specialty) {
      return specialty;
    }
    return emptySpecialty;
  }, []);

  const getSpecialities = useCallback((): ISpecialty[] => {
    console.log("specialties: ", specialties);
    return specialties.map((us) => {
      return {
        ...us,
        username: get(us.userId)?.username,
        avatar: get(us.userId)?.avatar,
      };
    });
  }, []);
  useEffect(() => {
    // loadSpecialtys();
  }, [
    specialty,
    specialties,
    isLoading,
    initialFetch,
    // loadSpecialtys,
  ]);

  return {
    specialty,
    specialties: getSpecialities(),
    isLoading,
    initialFetch,
    addSpecialty,
    editSpecialty,
    setSpecialty,
    getSpeciality,
    loadSpecialties,
  };
};

export { useSpecialty };
