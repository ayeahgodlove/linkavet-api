"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyAppointment = void 0;
const status_enum_1 = require("../shared/status.enum");
exports.emptyAppointment = {
    id: "",
    isConfirmed: false,
    userId: "",
    doctorId: "",
    appointmentDate: new Date(),
    appointmentTime: new Date(),
    fullName: "",
    email: "",
    contact: "",
    symptoms: "",
    status: status_enum_1.STATUS.PENDING,
    roomId: ""
};
