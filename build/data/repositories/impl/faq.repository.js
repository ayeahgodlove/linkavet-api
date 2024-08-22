"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRepository = void 0;
const faq_1 = require("../../entities/faq");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class FaqRepository {
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Faq as parameter
     * @faq
     * returns void
     */
    async create(faq) {
        try {
            return await faq_1.Faq.create({ ...faq });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Faq
     */
    async findById(id) {
        try {
            const faqItem = await faq_1.Faq.findByPk(id);
            if (!faqItem) {
                throw new not_found_exception_1.NotFoundException("Faq", id);
            }
            return faqItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @title
     * returns Faq
     */
    async findByQuestion(question) {
        try {
            const faqItem = await faq_1.Faq.findOne({ where: { question } });
            return faqItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Faq
     */
    async getAll() {
        try {
            const categories = await faq_1.Faq.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Faq as parameter
     * @faq
     * returns void
     */
    async update(faq) {
        const { id } = faq;
        try {
            const faqItem = await faq_1.Faq.findByPk(id);
            console.log(faq);
            if (!faqItem) {
                throw new not_found_exception_1.NotFoundException("Faq", id.toString());
            }
            return await faqItem.update({ ...faq });
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
            const faqItem = await faq_1.Faq.findByPk(id);
            if (!faqItem) {
                throw new not_found_exception_1.NotFoundException("Faq", id);
            }
            await faqItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.FaqRepository = FaqRepository;
