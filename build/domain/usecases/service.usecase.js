"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUseCase = void 0;
const slugify_1 = __importDefault(require("slugify"));
class ServiceUseCase {
    serviceRepository;
    /**
     *
     */
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async createService(service) {
        const existingService = await this.serviceRepository.findByTitle(service.title);
        if (existingService) {
            throw new Error("Service already exists");
        }
        return this.serviceRepository.create(service);
    }
    async getAll() {
        return this.serviceRepository.getAll();
    }
    async getServiceById(id) {
        return this.serviceRepository.findById(id);
    }
    async getServiceBySlug(slug) {
        return this.serviceRepository.findBySlug(slug);
    }
    async updateService(service) {
        const obj = {
            ...service,
            slug: (0, slugify_1.default)(service.title, { lower: true, replacement: "-" }),
        };
        return this.serviceRepository.update(obj);
    }
    async deleteService(id) {
        return this.serviceRepository.delete(id);
    }
}
exports.ServiceUseCase = ServiceUseCase;
