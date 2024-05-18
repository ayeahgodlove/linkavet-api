import { Mail } from "../../data/entities/mail";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IMail } from "../models/mail";

export class MailUseCase {
  /**
   *
   */
  constructor(private readonly mailRepository: IRepository<IMail, Mail>) {}

  async createMail(mail: IMail): Promise<Mail> {
    const existingMail = await this.mailRepository.findByName(mail.headline);

    if (existingMail) {
      throw new Error("Mail already exists");
    }

    // const _mail = new Mail({mail});
    //because it's already done in the Repository
    return this.mailRepository.create(mail);
  }

  async getAll(): Promise<Mail[]> {
    return this.mailRepository.getAll();
  }

  async getMailById(id: string): Promise<Mail | null> {
    return this.mailRepository.findById(id);
  }

  async updateMail(mail: IMail): Promise<Mail> {

    return this.mailRepository.update(mail);
  }

  async deleteMail(id: string): Promise<void> {
    return this.mailRepository.delete(id);
  }
}
