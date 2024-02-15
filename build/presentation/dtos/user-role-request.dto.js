"use strict";
// src/presentation/dtos/userRole-request.dto.ts
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
exports.UserRoleRequestDto = void 0;
const class_validator_1 = require("class-validator");
const user_role_1 = require("../../domain/models/user-role");
class UserRoleRequestDto {
    userId;
    roleId;
    constructor(data) {
        this.userId = data.userId;
        this.roleId = data.roleId;
    }
    toData() {
        return {
            ...user_role_1.emptyUserRole,
            userId: this.userId,
            roleId: this.roleId,
        };
    }
    toUpdateData(data) {
        return {
            userId: data.userId,
            roleId: data.roleId,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleRequestDto.prototype, "roleId", void 0);
exports.UserRoleRequestDto = UserRoleRequestDto;
