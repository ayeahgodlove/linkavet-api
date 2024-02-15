"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleRepository = void 0;
const user_role_1 = require("../../entities/user-role");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class UserRoleRepository {
    /**
     *
     */
    constructor() { }
    async findByName(userId) {
        try {
            const userItem = await user_role_1.UserRole.findOne({ where: { userId: userId } });
            return userItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a UserRole as parameter
     * @userRole
     * returns void
     */
    async create(userRole) {
        try {
            return await user_role_1.UserRole.create({ ...userRole });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns UserRole
     */
    async findById(id) {
        try {
            const userRoleItem = await user_role_1.UserRole.findByPk(id);
            if (!userRoleItem) {
                throw new not_found_exception_1.NotFoundException("UserRole", id);
            }
            return userRoleItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns UserRole
     */
    // async findByName(name: string): Promise<UserRole | null> {
    //   try {
    //     const userRoleItem = await UserRole.findOne({ where: { name } });
    //     return userRoleItem;
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    /*
     * Returns an array of UserRole
     */
    async getAll() {
        try {
            const userRoles = await user_role_1.UserRole.findAll();
            return userRoles;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a UserRole as parameter
     * @userRole
     * returns void
     */
    async update(userRole) {
        const { roleId } = userRole;
        try {
            const userRoleItem = await user_role_1.UserRole.findByPk(roleId);
            console.log(userRole);
            if (!userRoleItem) {
                throw new not_found_exception_1.NotFoundException("UserRole", roleId.toString());
            }
            return await userRoleItem.update({ ...userRole });
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
            const userRoleItem = await user_role_1.UserRole.findByPk(id);
            if (!userRoleItem) {
                throw new not_found_exception_1.NotFoundException("UserRole", id);
            }
            await userRoleItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserRoleRepository = UserRoleRepository;
