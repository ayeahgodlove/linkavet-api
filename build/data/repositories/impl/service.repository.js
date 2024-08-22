"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const service_1 = require("../../entities/service");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class ServiceRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a String as parameter
     * @title
     * returns Category
     */
    async findByTitle(title) {
        try {
            const service = await service_1.Service.findOne({ where: { title } });
            return service;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Service as parameter
     * @service
     * returns void
     */
    async create(service) {
        try {
            return await service_1.Service.create({ ...service });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Service
     */
    async findById(id) {
        try {
            const serviceItem = await service_1.Service.findByPk(id);
            if (!serviceItem) {
                throw new not_found_exception_1.NotFoundException("Service", id);
            }
            return serviceItem;
        }
        catch (error) {
            throw error;
        }
    }
    async findBySlug(slug) {
        try {
            const service = await service_1.Service.findOne({ where: { slug } });
            return service;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Service
     */
    async getAll() {
        try {
            const services = await service_1.Service.findAll();
            return services;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Service as parameter
     * @service
     * returns void
     */
    async update(service) {
        const { id } = service;
        try {
            const serviceItem = await service_1.Service.findByPk(id);
            console.log(service);
            if (!serviceItem) {
                throw new not_found_exception_1.NotFoundException("Service", id.toString());
            }
            return await serviceItem.update({ ...service });
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
            const serviceItem = await service_1.Service.findByPk(id);
            if (!serviceItem) {
                throw new not_found_exception_1.NotFoundException("Service", id);
            }
            await serviceItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ServiceRepository = ServiceRepository;
