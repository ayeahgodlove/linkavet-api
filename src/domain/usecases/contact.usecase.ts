import { Contact } from "../../data/entities/contact";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IContact } from "../models/contact";
import slugify from "slugify";
export class ContactUseCase {
  /**
   *
   */
  constructor(
    private readonly contactRepository: IRepository<IContact, Contact>
  ) {}

  async createContact(contact: IContact): Promise<Contact> {
    const existingContact = await this.contactRepository.findByName(
      contact.name
    );

    if (existingContact) {
      throw new Error("Contact already exists");
    }

    // const _contact = new Contact({contact});
    //because it's already done in the Repository
    return this.contactRepository.create(contact);
  }

  async getAll(): Promise<Contact[]> {
    return this.contactRepository.getAll();
  }

  async getContactById(id: string): Promise<Contact | null> {
    return this.contactRepository.findById(id);
  }

  async updateContact(contact: IContact): Promise<Contact> {
    const obj: IContact = {
      ...contact,
    };
    return this.contactRepository.update(obj);
  }

  async deleteContact(id: string): Promise<void> {
    return this.contactRepository.delete(id);
  }
}
