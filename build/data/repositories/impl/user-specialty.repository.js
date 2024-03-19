"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSpecialtyRepository = void 0;
const user_specialty_1 = require("../../entities/user-specialty");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class UserSpecialtyRepository {
    /**
     *
     */
    constructor() { }
    async findByName(userId) {
        try {
            const userItem = await user_specialty_1.UserSpecialty.findOne({ where: { userId: userId } });
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
    async create(userSpecialty) {
        try {
            return await user_specialty_1.UserSpecialty.create({ ...userSpecialty });
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
            const userSpecialtyItem = await user_specialty_1.UserSpecialty.findByPk(id);
            if (!userSpecialtyItem) {
                throw new not_found_exception_1.NotFoundException("UserSpecialty", id);
            }
            return userSpecialtyItem;
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
            const userSpecialtys = await user_specialty_1.UserSpecialty.findAll();
            return userSpecialtys;
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
    async update(userSpecialty) {
        const { id } = userSpecialty;
        try {
            const userSpecialtyItem = await user_specialty_1.UserSpecialty.findByPk(id);
            console.log(userSpecialty);
            if (!userSpecialtyItem) {
                throw new not_found_exception_1.NotFoundException("UserSpecialty", id.toString());
            }
            return await userSpecialtyItem.update({ ...userSpecialty });
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
            const userSpecialtyItem = await user_specialty_1.UserSpecialty.findByPk(id);
            if (!userSpecialtyItem) {
                throw new not_found_exception_1.NotFoundException("UserSpecialty", id);
            }
            await userSpecialtyItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserSpecialtyRepository = UserSpecialtyRepository;
