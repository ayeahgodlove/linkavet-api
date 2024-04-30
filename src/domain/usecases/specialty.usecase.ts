import { Specialty } from "../../data/entities/specialty";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { ISpecialty } from "../models/specialty";

export class SpecialtyUseCase {
  /**
   *
   */
  constructor(
    private readonly specialtyRepository: IRepository<
      ISpecialty,
      Specialty
    >
  ) {}

  async createSpecialty(
    specialty: ISpecialty
  ): Promise<Specialty> {
    const existingSpecialty = await this.specialtyRepository.findByName(
      specialty.fullname
    );

    if (existingSpecialty) {
      throw new Error("Specialty already exists");
    }

    return this.specialtyRepository.create(specialty);
  }

  async getAll(): Promise<Specialty[]> {
    return this.specialtyRepository.getAll();
  }

  async getSpecialtyById(id: string): Promise<Specialty | null> {
    return this.specialtyRepository.findById(id);
  }

  async updateSpecialty(
    specialty: ISpecialty
  ): Promise<Specialty> {
    return this.specialtyRepository.update(specialty);
  }

  async deleteSpecialty(id: string): Promise<void> {
    return this.specialtyRepository.delete(id);
  }
}
