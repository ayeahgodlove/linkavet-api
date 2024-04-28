import { Event } from "../../data/entities/event";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IEvent } from "../models/event";

export class EventUseCase {
  /**
   *
   */
  constructor(private readonly eventRepository: IRepository<IEvent, Event>) {}

  async createEvent(event: IEvent): Promise<Event> {
    const existingEvent = await this.eventRepository.findByName(
      event.title
    );

    if (existingEvent) {
      throw new Error("Event already exists");
    }

    // const _event = new Event({event});
    return this.eventRepository.create(event);
  }

  async getAll(): Promise<Event[]> {
    return this.eventRepository.getAll();
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }

  async updateEvent(event: IEvent): Promise<Event> {
    return this.eventRepository.update(event);
  }

  async deleteEvent(id: string): Promise<void> {
    return this.eventRepository.delete(id);
  }
}