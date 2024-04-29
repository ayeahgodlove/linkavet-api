"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyEvent = void 0;
exports.emptyEvent = {
    id: "",
    title: "",
    userId: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
    extendedProps: {
        calendar: "",
        guests: [],
        location: "",
        description: "",
    },
};
