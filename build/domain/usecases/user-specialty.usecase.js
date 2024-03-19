"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSpecialtyUseCase = void 0;
class UserSpecialtyUseCase {
    userSpecialtyRepository;
    /**
     *
     */
    constructor(userSpecialtyRepository) {
        this.userSpecialtyRepository = userSpecialtyRepository;
    }
    async createUserSpecialty(userSpecialty) {
        const existingUserSpecialty = await this.userSpecialtyRepository.findByName(userSpecialty.userId);
        if (existingUserSpecialty) {
            throw new Error("UserSpecialty already exists");
        }
        return this.userSpecialtyRepository.create(userSpecialty);
    }
    async getAll() {
        return this.userSpecialtyRepository.getAll();
    }
    async getUserSpecialtyById(id) {
        return this.userSpecialtyRepository.findById(id);
    }
    async updateUserSpecialty(userSpecialty) {
        return this.userSpecialtyRepository.update(userSpecialty);
    }
    async deleteUserSpecialty(id) {
        return this.userSpecialtyRepository.delete(id);
    }
}
exports.UserSpecialtyUseCase = UserSpecialtyUseCase;
