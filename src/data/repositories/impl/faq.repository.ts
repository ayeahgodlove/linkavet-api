import { Faq } from "../../entities/faq";
import { IFaq } from "../../../domain/models/faq";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IFaqRepository } from "../contracts/repository.base";
export class FaqRepository implements IFaqRepository {
  constructor() {}
  findByName(name: string): Promise<Faq | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a Faq as parameter
   * @faq
   * returns void
   */
  async create(faq: IFaq): Promise<Faq> {
    try {
      return await Faq.create<Faq>({ ...faq });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Faq
   */
  async findById(id: string): Promise<Faq | null> {
    try {
      const faqItem = await Faq.findByPk(id);

      if (!faqItem) {
        throw new NotFoundException("Faq", id);
      }
      return faqItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @title
   * returns Faq
   */
  async findByQuestion(question: string): Promise<Faq | null> {
    try {
      const faqItem = await Faq.findOne({ where: { question } });
      return faqItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Faq
   */
  async getAll(): Promise<Faq[]> {
    try {
      const categories = await Faq.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Faq as parameter
   * @faq
   * returns void
   */
  async update(faq: IFaq): Promise<Faq> {
    const { id } = faq;
    try {
      const faqItem: any = await Faq.findByPk(id);

      console.log(faq);
      if (!faqItem) {
        throw new NotFoundException("Faq", id.toString());
      }

      return await faqItem.update({ ...faq });
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
      const faqItem = await Faq.findByPk(id);

      if (!faqItem) {
        throw new NotFoundException("Faq", id);
      }

      await faqItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
