import { UserSpecialty } from "../../entities/user-specialty";
import { IUserSpecialty } from "../../../domain/models/user-specialty";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class UserSpecialtyRepository implements IRepository<IUserSpecialty, UserSpecialty> {
  /**
   *
   */
  constructor() {}
  async findByName(userId: string): Promise<UserSpecialty | null> {
    try {
      const userItem = await UserSpecialty.findOne({ where: { userId: userId } });
      return userItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserSpecialty as parameter
   * @userSpecialty
   * returns void
   */
  async create(userSpecialty: IUserSpecialty): Promise<UserSpecialty> {
    try {
      return await UserSpecialty.create<UserSpecialty>({ ...userSpecialty });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns UserSpecialty
   */
  async findById(id: string): Promise<UserSpecialty | null> {
    try {
      const userSpecialtyItem = await UserSpecialty.findByPk(id);

      if (!userSpecialtyItem) {
        throw new NotFoundException("UserSpecialty", id);
      }
      return userSpecialtyItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of UserSpecialty
   */
  async getAll(): Promise<UserSpecialty[]> {
    try {
      const userSpecialtys = await UserSpecialty.findAll();
      return userSpecialtys;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserSpecialty as parameter
   * @userSpecialty
   * returns void
   */
  async update(userSpecialty: IUserSpecialty): Promise<UserSpecialty> {
    const { id } = userSpecialty;
    try {
      const userSpecialtyItem: any = await UserSpecialty.findByPk(id);

      console.log(userSpecialty);
      if (!userSpecialtyItem) {
        throw new NotFoundException("UserSpecialty", id.toString());
      }

      return await userSpecialtyItem.update({ ...userSpecialty });
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
      const userSpecialtyItem = await UserSpecialty.findByPk(id);

      if (!userSpecialtyItem) {
        throw new NotFoundException("UserSpecialty", id);
      }

      await userSpecialtyItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
