import {
  IPayment,
  IPaymentResponse,
  IPaymentResponses,
} from "models/payment.model";
import { requestType } from "services";

export const PaymentService = {
  list: (): Promise<IPaymentResponses> => requestType.get("/api/payments"),
  details: (code: string): Promise<IPaymentResponse> =>
    requestType.get(`/api/payments/${code}`),
  create: (user: IPayment): Promise<IPaymentResponse> =>
    requestType.post(`/api/payments`, user),
  update: (payment: IPayment): Promise<IPaymentResponse> =>
    requestType.put(`/api/payments/${payment.id}`, payment),
  delete: (payment: IPayment): Promise<IPaymentResponse> =>
    requestType.del(`/api/payments/${payment.id}`, payment),
};
