"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqUseCase = void 0;
class FaqUseCase {
    faqRepository;
    /**
     *
     */
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async createFaq(faq) {
        const existingFaq = await this.faqRepository.findByQuestion(faq.question);
        if (existingFaq) {
            throw new Error("Faq already exists");
        }
        // const _faq = new Faq({faq});
        //because it's already done in the Repository
        return this.faqRepository.create(faq);
    }
    async getAll() {
        return this.faqRepository.getAll();
    }
    async getFaqById(id) {
        return this.faqRepository.findById(id);
    }
    async updateFaq(faq) {
        return this.faqRepository.update(faq);
    }
    async deleteFaq(id) {
        return this.faqRepository.delete(id);
    }
}
exports.FaqUseCase = FaqUseCase;
