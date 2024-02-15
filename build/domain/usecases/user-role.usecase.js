"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleUseCase = void 0;
class UserRoleUseCase {
    userRoleRepository;
    /**
     *
     */
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }
    async createUserRole(userRole) {
        const existingUserRole = await this.userRoleRepository.findByName(userRole.roleId);
        if (existingUserRole) {
            throw new Error("UserRole already exists");
        }
        // const _userRole = new UserRole({userRole});
        //because it's already done in the Repository
        return this.userRoleRepository.create(userRole);
    }
    async getAll() {
        return this.userRoleRepository.getAll();
    }
    async getUserRoleById(id) {
        return this.userRoleRepository.findById(id);
    }
    async updateUserRole(userRole) {
        return this.userRoleRepository.update(userRole);
    }
    async deleteUserRole(id) {
        return this.userRoleRepository.delete(id);
    }
}
exports.UserRoleUseCase = UserRoleUseCase;
