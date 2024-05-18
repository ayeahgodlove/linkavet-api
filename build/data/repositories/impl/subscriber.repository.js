"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberRepository = void 0;
const subscriber_1 = require("../../entities/subscriber");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class SubscriberRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Subscriber as parameter
     * @subscriber
     * returns void
     */
    async create(subscriber) {
        try {
            return await subscriber_1.Subscriber.create({ ...subscriber });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Subscriber
     */
    async findById(id) {
        try {
            const subscriberItem = await subscriber_1.Subscriber.findByPk(id);
            if (!subscriberItem) {
                throw new not_found_exception_1.NotFoundException("Subscriber", id);
            }
            return subscriberItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Subscriber
     */
    async findByName(email) {
        try {
            const subscriberItem = await subscriber_1.Subscriber.findOne({ where: { email } });
            return subscriberItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Subscriber
     */
    async getAll() {
        try {
            const subscribers = await subscriber_1.Subscriber.findAll();
            return subscribers;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Subscriber as parameter
     * @subscriber
     * returns void
     */
    async update(subscriber) {
        const { id } = subscriber;
        try {
            const subscriberItem = await subscriber_1.Subscriber.findByPk(id);
            console.log(subscriber);
            if (!subscriberItem) {
                throw new not_found_exception_1.NotFoundException("Subscriber", id.toString());
            }
            return await subscriberItem.update({ ...subscriber });
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
            const subscriberItem = await subscriber_1.Subscriber.findByPk(id);
            if (!subscriberItem) {
                throw new not_found_exception_1.NotFoundException("Subscriber", id);
            }
            await subscriberItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SubscriberRepository = SubscriberRepository;
