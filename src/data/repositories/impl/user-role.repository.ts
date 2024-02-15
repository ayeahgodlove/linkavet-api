import { UserRole } from "../../entities/user-role";
import { IUserRole } from "../../../domain/models/user-role";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class UserRoleRepository implements IRepository<IUserRole, UserRole> {
  /**
   *
   */
  constructor() {}
  async findByName(userId: string): Promise<UserRole | null> {
    try {
      const userItem = await UserRole.findOne({ where: { userId: userId } });
      return userItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserRole as parameter
   * @userRole
   * returns void
   */
  async create(userRole: IUserRole): Promise<UserRole> {
    try {
      return await UserRole.create<UserRole>({ ...userRole });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns UserRole
   */
  async findById(id: string): Promise<UserRole | null> {
    try {
      const userRoleItem = await UserRole.findByPk(id);

      if (!userRoleItem) {
        throw new NotFoundException("UserRole", id);
      }
      return userRoleItem;
    } catch (error) {
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
  async getAll(): Promise<UserRole[]> {
    try {
      const userRoles = await UserRole.findAll();
      return userRoles;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserRole as parameter
   * @userRole
   * returns void
   */
  async update(userRole: IUserRole): Promise<UserRole> {
    const { roleId } = userRole;
    try {
      const userRoleItem: any = await UserRole.findByPk(roleId);

      console.log(userRole);
      if (!userRoleItem) {
        throw new NotFoundException("UserRole", roleId.toString());
      }

      return await userRoleItem.update({ ...userRole });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const userRoleItem = await UserRole.findByPk(id);

      if (!userRoleItem) {
        throw new NotFoundException("UserRole", id);
      }

      await userRoleItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
