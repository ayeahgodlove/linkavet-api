"use strict";
// src/presentation/dtos/contact-request.dto.ts
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
exports.ContactRequestDto = void 0;
const class_validator_1 = require("class-validator");
const contact_1 = require("../../domain/models/contact");
const nanoid_1 = require("nanoid");
class ContactRequestDto {
    name;
    subject;
    message;
    email;
    constructor(data) {
        this.name = data.name;
        this.subject = data.subject;
        this.message = data.message;
        this.email = data.email;
    }
    toData() {
        return {
            ...contact_1.emptyContact,
            id: (0, nanoid_1.nanoid)(10),
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactRequestDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactRequestDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactRequestDto.prototype, "email", void 0);
exports.ContactRequestDto = ContactRequestDto;
