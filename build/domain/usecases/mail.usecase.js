"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailUseCase = void 0;
class MailUseCase {
    mailRepository;
    /**
     *
     */
    constructor(mailRepository) {
        this.mailRepository = mailRepository;
    }
    async createMail(mail) {
        const existingMail = await this.mailRepository.findByName(mail.headline);
        if (existingMail) {
            throw new Error("Mail already exists");
        }
        // const _mail = new Mail({mail});
        //because it's already done in the Repository
        return this.mailRepository.create(mail);
    }
    async getAll() {
        return this.mailRepository.getAll();
    }
    async getMailById(id) {
        return this.mailRepository.findById(id);
    }
    async updateMail(mail) {
        return this.mailRepository.update(mail);
    }
    async deleteMail(id) {
        return this.mailRepository.delete(id);
    }
}
exports.MailUseCase = MailUseCase;
