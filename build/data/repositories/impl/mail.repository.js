"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRepository = void 0;
const mail_1 = require("../../entities/mail");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class MailRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Mail as parameter
     * @mail
     * returns void
     */
    async create(mail) {
        try {
            return await mail_1.Mail.create({ ...mail });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Mail
     */
    async findById(id) {
        try {
            const mailItem = await mail_1.Mail.findByPk(id);
            if (!mailItem) {
                throw new not_found_exception_1.NotFoundException("Mail", id);
            }
            return mailItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Mail
     */
    async findByName(headline) {
        try {
            const mailItem = await mail_1.Mail.findOne({ where: { headline } });
            return mailItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Mail
     */
    async getAll() {
        try {
            const mails = await mail_1.Mail.findAll();
            return mails;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Mail as parameter
     * @mail
     * returns void
     */
    async update(mail) {
        const { id } = mail;
        try {
            const mailItem = await mail_1.Mail.findByPk(id);
            console.log(mail);
            if (!mailItem) {
                throw new not_found_exception_1.NotFoundException("Mail", id.toString());
            }
            return await mailItem.update({ ...mail });
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
            const mailItem = await mail_1.Mail.findByPk(id);
            if (!mailItem) {
                throw new not_found_exception_1.NotFoundException("Mail", id);
            }
            await mailItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MailRepository = MailRepository;
