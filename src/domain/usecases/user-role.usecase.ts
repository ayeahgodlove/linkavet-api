import { UserRole } from "../../data/entities/user-role";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IUserRole } from "../models/user-role";

export class UserRoleUseCase {
  /**
   *
   */
  constructor(private readonly userRoleRepository: IRepository<IUserRole, UserRole>) {}

  async createUserRole(userRole: IUserRole): Promise<UserRole> {
    const existingUserRole = await this.userRoleRepository.findByName(
      userRole.roleId
    ); 

    if (existingUserRole) {
      throw new Error("UserRole already exists");
    }

    // const _userRole = new UserRole({userRole});
    //because it's already done in the Repository
    return this.userRoleRepository.create(userRole);
  }

  async getAll(): Promise<UserRole[]> {
    return this.userRoleRepository.getAll();
  }

  async getUserRoleById(id: string): Promise<UserRole | null> {
    return this.userRoleRepository.findById(id);
  }

  async updateUserRole(userRole: IUserRole): Promise<UserRole> {
    return this.userRoleRepository.update(userRole);
  }

  async deleteUserRole(id: string): Promise<void> {
    return this.userRoleRepository.delete(id);
  }
}
