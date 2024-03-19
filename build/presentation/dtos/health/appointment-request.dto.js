"use strict";
// src/presentation/dtos/appointment-request.dto.ts
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
exports.AppointmentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const appointment_1 = require("../../../domain/models/health/appointment");
class AppointmentRequestDto {
    userId;
    doctorId;
    // @IsDate()
    appointmentDate;
    // @IsDate()
    appointmentTime;
    isConfirmed;
    fullName;
    email;
    contact;
    symptoms;
    status;
    roomId;
    constructor(data) {
        this.userId = data.userId;
        this.doctorId = data.doctorId;
        this.appointmentDate = data.appointmentDate;
        this.appointmentTime = data.appointmentTime;
        this.isConfirmed = data.isConfirmed;
        this.fullName = data.fullName;
        this.email = data.email;
        this.contact = data.contact;
        this.symptoms = data.symptoms;
        this.status = data.status;
        this.roomId = data.roomId;
    }
    toData() {
        return {
            ...appointment_1.emptyAppointment,
            id: (0, nanoid_1.nanoid)(10),
            userId: this.userId,
            doctorId: this.doctorId,
            appointmentDate: this.appointmentDate,
            appointmentTime: this.appointmentTime,
            isConfirmed: this.isConfirmed,
            fullName: this.fullName,
            email: this.email,
            contact: this.contact,
            symptoms: this.symptoms,
            status: this.status,
            roomId: this.roomId
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            userId: data.userId,
            doctorId: data.doctorId,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            isConfirmed: data.isConfirmed,
            fullName: data.fullName,
            email: data.email,
            contact: data.contact,
            symptoms: data.symptoms,
            status: data.status,
            roomId: data.roomId
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AppointmentRequestDto.prototype, "isConfirmed", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "contact", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "symptoms", void 0);
exports.AppointmentRequestDto = AppointmentRequestDto;
