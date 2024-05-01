"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyRepository = void 0;
const specialty_1 = require("../../entities/specialty");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class SpecialtyRepository {
    /**
     *
     */
    constructor() { }
    async findByName(name) {
        try {
            const userItem = await specialty_1.Specialty.findOne({ where: { fullname: name } });
            return userItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a UserSpecialty as parameter
     * @userSpecialty
     * returns void
     */
    async create(specialty) {
        try {
            return await specialty_1.Specialty.create({ ...specialty });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns UserSpecialty
     */
    async findById(id) {
        try {
            const specialtyItem = await specialty_1.Specialty.findByPk(id);
            if (!specialtyItem) {
                throw new not_found_exception_1.NotFoundException("Specialty", id);
            }
            return specialtyItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of UserSpecialty
     */
    async getAll() {
        try {
            const specialties = await specialty_1.Specialty.findAll();
            return specialties;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a UserSpecialty as parameter
     * @userSpecialty
     * returns void
     */
    async update(specialty) {
        const { id } = specialty;
        try {
            const specialtyItem = await specialty_1.Specialty.findByPk(id);
            console.log(specialty);
            if (!specialtyItem) {
                throw new not_found_exception_1.NotFoundException("Specialty", id.toString());
            }
            return await specialtyItem.update({ ...specialty });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const specialtyItem = await specialty_1.Specialty.findByPk(id);
            if (!specialtyItem) {
                throw new not_found_exception_1.NotFoundException("Specialty", id);
            }
            await specialtyItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SpecialtyRepository = SpecialtyRepository;
