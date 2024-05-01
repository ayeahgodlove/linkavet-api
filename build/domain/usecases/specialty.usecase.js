"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyUseCase = void 0;
class SpecialtyUseCase {
    specialtyRepository;
    /**
     *
     */
    constructor(specialtyRepository) {
        this.specialtyRepository = specialtyRepository;
    }
    async createSpecialty(specialty) {
        const existingSpecialty = await this.specialtyRepository.findByName(specialty.fullname);
        if (existingSpecialty) {
            throw new Error("Specialty already exists");
        }
        return this.specialtyRepository.create(specialty);
    }
    async getAll() {
        return this.specialtyRepository.getAll();
    }
    async getSpecialtyById(id) {
        return this.specialtyRepository.findById(id);
    }
    async updateSpecialty(specialty) {
        return this.specialtyRepository.update(specialty);
    }
    async deleteSpecialty(id) {
        return this.specialtyRepository.delete(id);
    }
}
exports.SpecialtyUseCase = SpecialtyUseCase;
