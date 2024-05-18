import { Mail } from "../../entities/mail";
import { IMail } from "../../../domain/models/mail";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class MailRepository implements IRepository<IMail, Mail> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Mail as parameter
   * @mail
   * returns void
   */
  async create(mail: IMail): Promise<Mail> {
    try {
      return await Mail.create<Mail>({ ...mail });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Mail
   */
  async findById(id: string): Promise<Mail | null> {
    try {
      const mailItem = await Mail.findByPk(id);

      if (!mailItem) {
        throw new NotFoundException("Mail", id);
      }
      return mailItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Mail
   */
  async findByName(headline: string): Promise<Mail | null> {
    try {
      const mailItem = await Mail.findOne({ where: { headline } });
      return mailItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Mail
   */
  async getAll(): Promise<Mail[]> {
    try {
      const mails = await Mail.findAll();
      return mails;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Mail as parameter
   * @mail
   * returns void
   */
  async update(mail: IMail): Promise<Mail> {
    const { id } = mail;
    try {
      const mailItem: any = await Mail.findByPk(id);

      console.log(mail);
      if (!mailItem) {
        throw new NotFoundException("Mail", id.toString());
      }

      return await mailItem.update({ ...mail });
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
      const mailItem = await Mail.findByPk(id);

      if (!mailItem) {
        throw new NotFoundException("Mail", id);
      }

      await mailItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
