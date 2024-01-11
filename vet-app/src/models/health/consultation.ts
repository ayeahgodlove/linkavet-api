import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";

export interface IConsultation {
  id: string;
  startDate: Date;
  endDate: Date;
  diagnosis: string;
  petOwnerId: string
  vetDoctorId: string
}

export const emptyConsultation: IConsultation = {
  id: "",
  petOwnerId: "",
  vetDoctorId: "",
  startDate: new Date(),
  endDate: new Date(),
  diagnosis: ""
};

export interface IConsultationState extends IBaseState {
  readonly consultations: IConsultation[];
  readonly consultation: IConsultation;
}

export interface IConsultationResponse extends IResponseBase {
  data: IConsultation;
}

export interface IConsultationResponses extends IResponseBase {
  data: IConsultation[];
}
