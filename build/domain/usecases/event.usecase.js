"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUseCase = void 0;
class EventUseCase {
    eventRepository;
    /**
     *
     */
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async createEvent(event) {
        const existingEvent = await this.eventRepository.findByName(event.title);
        if (existingEvent) {
            throw new Error("Event already exists");
        }
        // const _event = new Event({event});
        return this.eventRepository.create(event);
    }
    async getAll() {
        return this.eventRepository.getAll();
    }
    async getEventById(id) {
        return this.eventRepository.findById(id);
    }
    async updateEvent(event) {
        return this.eventRepository.update(event);
    }
    async deleteEvent(id) {
        return this.eventRepository.delete(id);
    }
}
exports.EventUseCase = EventUseCase;
