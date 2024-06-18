import { Contact } from "../../entities/contact";
import { IContact } from "../../../domain/models/contact";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class ContactRepository implements IRepository<IContact, Contact> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Contact as parameter
   * @contact
   * returns void
   */
  async create(contact: IContact): Promise<Contact> {
    try {
      return await Contact.create<Contact>({ ...contact });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Contact
   */
  async findById(id: string): Promise<Contact | null> {
    try {
      const contactItem = await Contact.findByPk(id);

      if (!contactItem) {
        throw new NotFoundException("Contact", id);
      }
      return contactItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Contact
   */
  async findByName(name: string): Promise<Contact | null> {
    try {
      const contactItem = await Contact.findOne({ where: { name } });
      return contactItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Contact
   */
  async getAll(): Promise<Contact[]> {
    try {
      const categories = await Contact.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Contact as parameter
   * @contact
   * returns void
   */
  async update(contact: IContact): Promise<Contact> {
    const { id } = contact;
    try {
      const contactItem: any = await Contact.findByPk(id);

      console.log(contact);
      if (!contactItem) {
        throw new NotFoundException("Contact", id.toString());
      }

      return await contactItem.update({ ...contact });
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
      const contactItem = await Contact.findByPk(id);

      if (!contactItem) {
        throw new NotFoundException("Contact", id);
      }

      await contactItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
