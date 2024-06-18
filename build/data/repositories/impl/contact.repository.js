"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const contact_1 = require("../../entities/contact");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class ContactRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Contact as parameter
     * @contact
     * returns void
     */
    async create(contact) {
        try {
            return await contact_1.Contact.create({ ...contact });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Contact
     */
    async findById(id) {
        try {
            const contactItem = await contact_1.Contact.findByPk(id);
            if (!contactItem) {
                throw new not_found_exception_1.NotFoundException("Contact", id);
            }
            return contactItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Contact
     */
    async findByName(name) {
        try {
            const contactItem = await contact_1.Contact.findOne({ where: { name } });
            return contactItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Contact
     */
    async getAll() {
        try {
            const categories = await contact_1.Contact.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Contact as parameter
     * @contact
     * returns void
     */
    async update(contact) {
        const { id } = contact;
        try {
            const contactItem = await contact_1.Contact.findByPk(id);
            console.log(contact);
            if (!contactItem) {
                throw new not_found_exception_1.NotFoundException("Contact", id.toString());
            }
            return await contactItem.update({ ...contact });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const contactItem = await contact_1.Contact.findByPk(id);
            if (!contactItem) {
                throw new not_found_exception_1.NotFoundException("Contact", id);
            }
            await contactItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ContactRepository = ContactRepository;
