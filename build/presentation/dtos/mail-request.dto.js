"use strict";
// src/presentation/dtos/mail-request.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRequestDto = void 0;
const class_validator_1 = require("class-validator");
const mail_1 = require("../../domain/models/mail");
const nanoid_1 = require("nanoid");
const status_enum_1 = require("../../domain/models/shared/status.enum");
class MailRequestDto {
    senderEmail;
    receiverEmails;
    type;
    headline;
    status;
    cta;
    content;
    constructor(data) {
        this.senderEmail = data.senderEmail;
        this.receiverEmails = data.receiverEmails;
        this.type = data.type;
        this.headline = data.headline;
        this.status = data.status;
        this.cta = data.cta;
        this.content = data.content;
    }
    toData() {
        return {
            ...mail_1.emptyMail,
            id: (0, nanoid_1.nanoid)(10),
            senderEmail: this.senderEmail,
            receiverEmails: this.receiverEmails,
            type: this.type,
            headline: this.headline,
            status: this.status,
            cta: this.cta,
            content: this.content,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            senderEmail: data.senderEmail,
            receiverEmails: data.receiverEmails,
            content: data.content,
            cta: data.cta,
            headline: data.headline,
            status: data.status,
            type: data.type,
            media: data.media,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "senderEmail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MailRequestDto.prototype, "receiverEmails", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "headline", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "cta", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MailRequestDto.prototype, "content", void 0);
exports.MailRequestDto = MailRequestDto;
