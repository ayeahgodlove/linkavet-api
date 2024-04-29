"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const event_1 = require("../../entities/event");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class EventRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Event as parameter
     * @event
     * returns void
     */
    async create(event) {
        try {
            return await event_1.Event.create({ ...event });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Event
     */
    async findById(id) {
        try {
            const eventItem = await event_1.Event.findByPk(id);
            if (!eventItem) {
                throw new not_found_exception_1.NotFoundException("Event", id);
            }
            return eventItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Event
     */
    async findByName(name) {
        try {
            const eventItem = await event_1.Event.findOne({ where: { title: name } });
            return eventItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Event
     */
    async getAll() {
        try {
            const events = await event_1.Event.findAll();
            return events;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Event as parameter
     * @event
     * returns void
     */
    async update(event) {
        const { id } = event;
        try {
            const eventItem = await event_1.Event.findByPk(id);
            console.log(event);
            if (!eventItem) {
                throw new not_found_exception_1.NotFoundException("Event", id.toString());
            }
            return await eventItem.update({ ...event });
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
            const eventItem = await event_1.Event.findByPk(id);
            if (!eventItem) {
                throw new not_found_exception_1.NotFoundException("Event", id);
            }
            await eventItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.EventRepository = EventRepository;
