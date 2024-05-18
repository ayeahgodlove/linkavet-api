"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberUseCase = void 0;
class SubscriberUseCase {
    subscriberRepository;
    /**
     *
     */
    constructor(subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }
    async createSubscriber(subscriber) {
        const existingSubscriber = await this.subscriberRepository.findByName(subscriber.email);
        if (existingSubscriber) {
            throw new Error("Subscriber already exists");
        }
        // const _subscriber = new Subscriber({subscriber});
        //because it's already done in the Repository
        return this.subscriberRepository.create(subscriber);
    }
    async getAll() {
        return this.subscriberRepository.getAll();
    }
    async getSubscriberById(id) {
        return this.subscriberRepository.findById(id);
    }
    async updateSubscriber(subscriber) {
        return this.subscriberRepository.update(subscriber);
    }
    async deleteSubscriber(id) {
        return this.subscriberRepository.delete(id);
    }
}
exports.SubscriberUseCase = SubscriberUseCase;
