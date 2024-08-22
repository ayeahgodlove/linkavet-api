"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_1 = __importDefault(require("http"));
let server = http_1.default.createServer();
describe("Server checks", function () {
    it("Server runs successfully!", function (done) {
        (0, supertest_1.default)(server).get("/api").expect(200, done());
    });
});
