import { IInitPayment, IInitPaymentResponse, IInitTransactionResponse } from "models/init-payment.model";
import { ITransactionHistoryResponses } from "models/transaction-history.model";
import { ITransactionVmResponse } from "models/transaction.model";
import { requestType } from "services";


export const ProcessPaymentService = {
  initPayment: (initPayment: IInitPayment): Promise<IInitTransactionResponse> =>
    requestType.post(`/api/process-payments`, initPayment),
  transactionStatus: (reference: string): Promise<ITransactionVmResponse> =>
    requestType.get(`/api/process-payments/${reference}`),
  getTransactions: ({
    start_date,
    end_date,
  }: {
    start_date: Date;
    end_date: Date;
  }): Promise<ITransactionHistoryResponses> =>
    requestType.post(`/api/process-payments/history`, { start_date, end_date }),
};
