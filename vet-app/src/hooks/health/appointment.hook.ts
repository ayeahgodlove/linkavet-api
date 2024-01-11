import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addAppointmentSuccess,
  editAppointmentSuccess,
  fetchAppointmentsAsync,
  setActiveAppointment,
} from "../../redux/health/appointment.slice";
import { IAppointment, emptyAppointment } from "models/health/appointment";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { AppointmentService } from "services/health/appointment.service";

const useAppointment = () => {
  const appointments = useSelector<IRootState, IAppointment[]>(
    (state) => state.appointment.appointments
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.appointment.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.appointment.initialFetch
  );
  const appointment = useSelector<IRootState, IAppointment>(
    (state) => state.appointment.appointment
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadAppointments = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchAppointmentsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addAppointment = async (appointment: IAppointment) => {
    return await AppointmentService.create(appointment)
      .then((appointmentResponse) => {
        dispatch(addAppointmentSuccess(appointmentResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setAppointment = (appointment: IAppointment) => {
    dispatch(setActiveAppointment(appointment));
  };

  const editAppointment = async (appointment: IAppointment) => {
    return await AppointmentService.update(appointment)
      .then((appointmentResponse) => {
        dispatch(editAppointmentSuccess(appointmentResponse.data));
        setAppointment(appointmentResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const getAppointment = useCallback((appointmentId: string) => {
    const appointment = appointments.find((c) => c.id === appointmentId);

    if (!appointment) {
      return emptyAppointment;
    }
    return appointment;
  }, []);
  useEffect(() => {
    // loadAppointments();
  }, [appointment, appointments, isLoading, initialFetch, loadAppointments]);

  return {
    appointment,
    appointments,
    isLoading,
    initialFetch,
    addAppointment,
    editAppointment,
    setAppointment,
    getAppointment,
  };
};

export { useAppointment };
