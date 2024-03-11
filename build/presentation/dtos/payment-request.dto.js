"use strict";
// src/presentation/dtos/PaymentRequestDto.ts
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
exports.PaymentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const payment_1 = require("../../domain/models/payment");
const uuid_1 = require("uuid");
// status: string;
class PaymentRequestDto {
    orderNo;
    status;
    email;
    username;
    cellPhone;
    address;
    amount;
    constructor(data) {
        this.orderNo = data.orderNo;
        this.status = data.status;
        this.cellPhone = data.cellPhone;
        this.address = data.address;
        this.email = data.email;
        this.username = data.username;
        this.amount = data.amount;
    }
    toData() {
        return {
            ...payment_1.emptyPayment,
            id: (0, uuid_1.v4)(),
            orderNo: this.orderNo,
            status: this.status,
            amount: this.amount,
            cellPhone: this.cellPhone,
            address: this.address,
            email: this.email,
            username: this.username,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            amount: data.amount,
            userId: data.userId,
            orderNo: data.orderNo,
            status: data.status,
            address: data.address,
            cellPhone: data.cellPhone,
            email: data.email,
            username: data.username
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "orderNo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "cellPhone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaymentRequestDto.prototype, "amount", void 0);
exports.PaymentRequestDto = PaymentRequestDto;
