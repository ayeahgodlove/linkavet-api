import { Request, Response, Router } from "express";
import axios from "axios";
import { nanoid } from "nanoid";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";

const tranzakRouter = Router();

const getAuthToken = async () => {
  const response = await axios.post(
    "https://dsapi.tranzak.me/auth/token",
    {
      appId: `${process.env.TRANZAK_APPID}`,
      appKey: `${process.env.TRANZAK_API_KEY}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

const initiateMomoPayment = async (
  amount: number,
  description: string,
  returnUrl: string
) => {
  const tokenData = await getAuthToken();

  const response = await axios.post(
    "https://dsapi.tranzak.me/xp021/v1/request/create",
    {
      amount,
      currencyCode: `XAF`,
      description,
      mchTransactionRef: nanoid(30),
      returnUrl,
      payerNote: "Linkavet Platform Payment",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
        "X-App-ID": tokenData.appId,
      },
    }
  );

  return response.data.data;
};

const getPaymentHistory = async () => {
  const tokenData = await getAuthToken();

  const response = await axios.get(
    "https://dsapi.tranzak.me/xp021/v1/request/history",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
        "X-App-ID": tokenData.appId,
      },
    }
  );

  return response.data;
};

tranzakRouter.post(
  "/",
//   isAuthenticatedMiddleware,
  async (req: Request, res: Response<any>) => {
    try {
      const { amount, description, returnUrl } = req.body;
      const response = await initiateMomoPayment(
        amount,
        description,
        returnUrl 
      );
      res.status(200).json({ data: response, success: true });
    } catch (error: any) {
      const { data, status } = error.response;
      res.status(status).json({
        message: data.message,
        success: false,
        validationErrors: [],
        data: data,
      });
    }
  }
);

tranzakRouter.get(
  "/history",
//   isAuthenticatedMiddleware,
  async (req: Request, res: Response<any>) => {
    try {
      const response = await getPaymentHistory();
      res.status(200).json({ data: response, success: true });
    } catch (error: any) {
      const { data, status } = error.response;
      res.status(status).json({
        message: data.message,
        success: false,
        validationErrors: [],
        data: data,
      });
    }
  }
);

export default tranzakRouter;
