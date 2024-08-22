"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const nanoid_1 = require("nanoid");
const tranzakRouter = (0, express_1.Router)();
const getAuthToken = async () => {
    const response = await axios_1.default.post("https://dsapi.tranzak.me/auth/token", {
        appId: `${process.env.TRANZAK_APPID}`,
        appKey: `${process.env.TRANZAK_API_KEY}`,
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data.data;
};
const initiateMomoPayment = async (amount, description, returnUrl) => {
    const tokenData = await getAuthToken();
    const response = await axios_1.default.post("https://dsapi.tranzak.me/xp021/v1/request/create", {
        amount,
        currencyCode: `XAF`,
        description,
        mchTransactionRef: (0, nanoid_1.nanoid)(30),
        returnUrl,
        payerNote: "Linkavet Platform Payment",
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
            "X-App-ID": tokenData.appId,
        },
    });
    return response.data.data;
};
const getPaymentHistory = async () => {
    const tokenData = await getAuthToken();
    const response = await axios_1.default.get("https://dsapi.tranzak.me/xp021/v1/request/history", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
            "X-App-ID": tokenData.appId,
        },
    });
    return response.data;
};
tranzakRouter.post("/", 
//   isAuthenticatedMiddleware,
async (req, res) => {
    try {
        const { amount, description, returnUrl } = req.body;
        const response = await initiateMomoPayment(amount, description, returnUrl);
        res.status(200).json({ data: response, success: true });
    }
    catch (error) {
        const { data, status } = error.response;
        res.status(status).json({
            message: data.message,
            success: false,
            validationErrors: [],
            data: data,
        });
    }
});
tranzakRouter.get("/history", 
//   isAuthenticatedMiddleware,
async (req, res) => {
    try {
        const response = await getPaymentHistory();
        res.status(200).json({ data: response, success: true });
    }
    catch (error) {
        const { data, status } = error.response;
        res.status(status).json({
            message: data.message,
            success: false,
            validationErrors: [],
            data: data,
        });
    }
});
exports.default = tranzakRouter;
