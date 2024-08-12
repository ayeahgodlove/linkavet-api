import { Faq } from "../../data/entities/faq";
import { IFaqRepository } from "../../data/repositories/contracts/repository.base";
import { IFaq } from "../models/faq";

export class FaqUseCase {
  /**
   *
   */
  constructor(private readonly faqRepository: IFaqRepository) {}

  async createFaq(faq: IFaq): Promise<Faq> {
    const existingFaq = await this.faqRepository.findByQuestion(faq.question);

    if (existingFaq) {
      throw new Error("Faq already exists");
    }

    // const _faq = new Faq({faq});
    //because it's already done in the Repository
    return this.faqRepository.create(faq);
  }

  async getAll(): Promise<Faq[]> {
    return this.faqRepository.getAll();
  }

  async getFaqById(id: string): Promise<Faq | null> {
    return this.faqRepository.findById(id);
  }

  async updateFaq(faq: IFaq): Promise<Faq> {
    return this.faqRepository.update(faq);
  }

  async deleteFaq(id: string): Promise<void> {
    return this.faqRepository.delete(id);
  }
}
