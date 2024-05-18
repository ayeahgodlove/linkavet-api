import { Subscriber } from "../../data/entities/subscriber";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { ISubscriber } from "../models/subscriber";

export class SubscriberUseCase {
  /**
   *
   */
  constructor(private readonly subscriberRepository: IRepository<ISubscriber, Subscriber>) {}

  async createSubscriber(subscriber: ISubscriber): Promise<Subscriber> {
    const existingSubscriber = await this.subscriberRepository.findByName(subscriber.email);

    if (existingSubscriber) {
      throw new Error("Subscriber already exists");
    }

    // const _subscriber = new Subscriber({subscriber});
    //because it's already done in the Repository
    return this.subscriberRepository.create(subscriber);
  }

  async getAll(): Promise<Subscriber[]> {
    return this.subscriberRepository.getAll();
  }

  async getSubscriberById(id: string): Promise<Subscriber | null> {
    return this.subscriberRepository.findById(id);
  }

  async updateSubscriber(subscriber: ISubscriber): Promise<Subscriber> {

    return this.subscriberRepository.update(subscriber);
  }

  async deleteSubscriber(id: string): Promise<void> {
    return this.subscriberRepository.delete(id);
  }
}
