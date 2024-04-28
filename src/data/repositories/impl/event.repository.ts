import { Event } from "../../entities/event";
import { IEvent } from "../../../domain/models/event";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class EventRepository implements IRepository<IEvent, Event> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Event as parameter
   * @event
   * returns void
   */
  async create(event: IEvent): Promise<Event> {
    try {
      return await Event.create<Event>({ ...event });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Event
   */
  async findById(id: string): Promise<Event | null> {
    try {
      const eventItem = await Event.findByPk(id);

      if (!eventItem) {
        throw new NotFoundException("Event", id);
      }
      return eventItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Event
   */
  async findByName(name: string): Promise<Event | null> {
    try {
      const eventItem = await Event.findOne({ where: { title: name } });
      return eventItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Event
   */
  async getAll(): Promise<Event[]> {
    try {
      const events = await Event.findAll();
      return events;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Event as parameter
   * @event
   * returns void
   */
  async update(event: IEvent): Promise<Event> {
    const { id } = event;
    try {
      const eventItem: any = await Event.findByPk(id);

      console.log(event);
      if (!eventItem) {
        throw new NotFoundException("Event", id.toString());
      }

      return await eventItem.update({ ...event });
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
      const eventItem = await Event.findByPk(id);

      if (!eventItem) {
        throw new NotFoundException("Event", id);
      }

      await eventItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
