import { Specialty } from "../../entities/specialty";
import { ISpecialty } from "../../../domain/models/specialty";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class SpecialtyRepository implements IRepository<ISpecialty, Specialty> {
  /**
   *
   */
  constructor() {}
  async findByName(name: string): Promise<Specialty | null> {
    try {
      const userItem = await Specialty.findOne({ where: { fullname: name } });
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
  async create(specialty: ISpecialty): Promise<Specialty> {
    try {
      return await Specialty.create<Specialty>({ ...specialty });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns UserSpecialty
   */
  async findById(id: string): Promise<Specialty | null> {
    try {
      const specialtyItem = await Specialty.findByPk(id);

      if (!specialtyItem) {
        throw new NotFoundException("Specialty", id);
      }
      return specialtyItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of UserSpecialty
   */
  async getAll(): Promise<Specialty[]> {
    try {
      const specialties = await Specialty.findAll();
      return specialties;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserSpecialty as parameter
   * @userSpecialty
   * returns void
   */
  async update(specialty: ISpecialty): Promise<Specialty> {
    const { id } = specialty;
    try {
      const specialtyItem: any = await Specialty.findByPk(id);

      console.log(specialty);
      if (!specialtyItem) {
        throw new NotFoundException("Specialty", id.toString());
      }

      return await specialtyItem.update({ ...specialty });
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
      const specialtyItem = await Specialty.findByPk(id);

      if (!specialtyItem) {
        throw new NotFoundException("Specialty", id);
      }

      await specialtyItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
