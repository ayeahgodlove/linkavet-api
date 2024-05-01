"use strict";
// src/presentation/dtos/userSpecialty-request.dto.ts
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
exports.SpecialtyRequestDto = void 0;
const class_validator_1 = require("class-validator");
const specialty_1 = require("../../domain/models/specialty");
const nanoid_1 = require("nanoid");
class SpecialtyRequestDto {
    userId;
    specialty;
    facebook;
    linkedin;
    twitter;
    constructor(data) {
        this.userId = data.userId;
        this.specialty = data.specialty;
        (this.facebook = data.facebook),
            (this.linkedin = data.linkedin),
            (this.twitter = data.twitter);
    }
    toData() {
        return {
            ...specialty_1.emptySpecialty,
            id: (0, nanoid_1.nanoid)(15),
            userId: this.userId,
            specialty: this.specialty,
            facebook: this.facebook,
            linkedin: this.linkedin,
            twitter: this.twitter,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            userId: data.userId,
            specialty: data.specialty,
            facebook: data.facebook,
            linkedin: data.linkedin,
            twitter: data.twitter,
            fullname: data.fullname,
            title: data.title,
            website: data.website,
            yearsOfExperience: data.yearsOfExperience,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecialtyRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecialtyRequestDto.prototype, "specialty", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecialtyRequestDto.prototype, "facebook", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecialtyRequestDto.prototype, "linkedin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecialtyRequestDto.prototype, "twitter", void 0);
exports.SpecialtyRequestDto = SpecialtyRequestDto;
