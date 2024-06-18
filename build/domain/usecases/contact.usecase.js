"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUseCase = void 0;
class ContactUseCase {
    contactRepository;
    /**
     *
     */
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async createContact(contact) {
        const existingContact = await this.contactRepository.findByName(contact.name);
        if (existingContact) {
            throw new Error("Contact already exists");
        }
        // const _contact = new Contact({contact});
        //because it's already done in the Repository
        return this.contactRepository.create(contact);
    }
    async getAll() {
        return this.contactRepository.getAll();
    }
    async getContactById(id) {
        return this.contactRepository.findById(id);
    }
    async updateContact(contact) {
        const obj = {
            ...contact,
        };
        return this.contactRepository.update(obj);
    }
    async deleteContact(id) {
        return this.contactRepository.delete(id);
    }
}
exports.ContactUseCase = ContactUseCase;
