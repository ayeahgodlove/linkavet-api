import { Subscriber } from "../../entities/subscriber";
import { ISubscriber } from "../../../domain/models/subscriber";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class SubscriberRepository implements IRepository<ISubscriber, Subscriber> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Subscriber as parameter
   * @subscriber
   * returns void
   */
  async create(subscriber: ISubscriber): Promise<Subscriber> {
    try {
      return await Subscriber.create<Subscriber>({ ...subscriber });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Subscriber
   */
  async findById(id: string): Promise<Subscriber | null> {
    try {
      const subscriberItem = await Subscriber.findByPk(id);

      if (!subscriberItem) {
        throw new NotFoundException("Subscriber", id);
      }
      return subscriberItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Subscriber
   */
  async findByName(email: string): Promise<Subscriber | null> {
    try {
      const subscriberItem = await Subscriber.findOne({ where: { email } });
      return subscriberItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Subscriber
   */
  async getAll(): Promise<Subscriber[]> {
    try {
      const subscribers = await Subscriber.findAll();
      return subscribers;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Subscriber as parameter
   * @subscriber
   * returns void
   */
  async update(subscriber: ISubscriber): Promise<Subscriber> {
    const { id } = subscriber;
    try {
      const subscriberItem: any = await Subscriber.findByPk(id);

      console.log(subscriber);
      if (!subscriberItem) {
        throw new NotFoundException("Subscriber", id.toString());
      }

      return await subscriberItem.update({ ...subscriber });
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
      const subscriberItem = await Subscriber.findByPk(id);

      if (!subscriberItem) {
        throw new NotFoundException("Subscriber", id);
      }

      await subscriberItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
