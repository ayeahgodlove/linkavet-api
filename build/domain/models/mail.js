"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyMail = void 0;
const status_enum_1 = require("./shared/status.enum");
exports.emptyMail = {
    id: "",
    senderEmail: "",
    receiverEmails: [],
    type: "",
    headline: "",
    status: status_enum_1.MAIL_STATUS.DRAFT,
    cta: "",
    content: "",
    media: []
};
