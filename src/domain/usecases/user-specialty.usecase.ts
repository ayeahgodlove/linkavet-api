import { UserSpecialty } from "../../data/entities/user-specialty";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IUserSpecialty } from "../models/user-specialty";

export class UserSpecialtyUseCase {
  /**
   *
   */
  constructor(
    private readonly userSpecialtyRepository: IRepository<
      IUserSpecialty,
      UserSpecialty
    >
  ) {}

  async createUserSpecialty(
    userSpecialty: IUserSpecialty
  ): Promise<UserSpecialty> {
    const existingUserSpecialty = await this.userSpecialtyRepository.findByName(
      userSpecialty.userId
    );

    if (existingUserSpecialty) {
      throw new Error("UserSpecialty already exists");
    }

    return this.userSpecialtyRepository.create(userSpecialty);
  }

  async getAll(): Promise<UserSpecialty[]> {
    return this.userSpecialtyRepository.getAll();
  }

  async getUserSpecialtyById(id: string): Promise<UserSpecialty | null> {
    return this.userSpecialtyRepository.findById(id);
  }

  async updateUserSpecialty(
    userSpecialty: IUserSpecialty
  ): Promise<UserSpecialty> {
    return this.userSpecialtyRepository.update(userSpecialty);
  }

  async deleteUserSpecialty(id: string): Promise<void> {
    return this.userSpecialtyRepository.delete(id);
  }
}
