"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_postgres_config_1 = require("./infrastructure/database/postgres/db-postgres.config");
const error_middleware_1 = require("./shared/middlewares/error.middleware");
const not_found_middleware_1 = require("./shared/middlewares/not-found.middleware");
const category_route_1 = __importDefault(require("./presentation/routes/category.route"));
const role_route_1 = __importDefault(require("./presentation/routes/role.route"));
const review_route_1 = __importDefault(require("./presentation/routes/review.route"));
const auth_route_1 = require("./presentation/routes/auth/auth.route");
const user_route_1 = __importDefault(require("./presentation/routes/user.route"));
const user_doc_route_1 = __importDefault(require("./presentation/routes/user-doc.route"));
const path_1 = __importDefault(require("path"));
const tag_route_1 = __importDefault(require("./presentation/routes/tag.route"));
const product_route_1 = __importDefault(require("./presentation/routes/product.route"));
const store_route_1 = __importDefault(require("./presentation/routes/store.route"));
const branch_route_1 = __importDefault(require("./presentation/routes/branch.route"));
const document_route_1 = __importDefault(require("./presentation/routes/document.route"));
const comment_route_1 = __importDefault(require("./presentation/routes/comment.route"));
const post_route_1 = __importDefault(require("./presentation/routes/post.route"));
const sub_category_route_1 = __importDefault(require("./presentation/routes/sub-category.route"));
const authz_middleware_1 = __importDefault(require("./shared/middlewares/authz.middleware"));
const banner_route_1 = __importDefault(require("./presentation/routes/banner.route"));
const order_route_1 = __importDefault(require("./presentation/routes/order.route"));
const payment_route_1 = __importDefault(require("./presentation/routes/payment.route"));
// import processPaymentRouter from "./presentation/routes/payment/process-payments.route";
const course_route_1 = __importDefault(require("./presentation/routes/lms/course.route"));
const lesson_route_1 = __importDefault(require("./presentation/routes/lms/lesson.route"));
const enrollment_route_1 = __importDefault(require("./presentation/routes/lms/enrollment.route"));
const quiz_route_1 = __importDefault(require("./presentation/routes/lms/quiz.route"));
const lesson_review_route_1 = __importDefault(require("./presentation/routes/lesson-review.route"));
const appointment_route_1 = __importDefault(require("./presentation/routes/health/appointment.route"));
const consultation_route_1 = __importDefault(require("./presentation/routes/health/consultation.route"));
// import fs from "fs";
const user_role_route_1 = __importDefault(require("./presentation/routes/user-role.route"));
const upload_route_1 = __importDefault(require("./presentation/routes/upload.route"));
const event_route_1 = __importDefault(require("./presentation/routes/event.route"));
const specialty_route_1 = __importDefault(require("./presentation/routes/specialty.route"));
const subscriber_route_1 = __importDefault(require("./presentation/routes/subscriber.route"));
const mail_route_1 = __importDefault(require("./presentation/routes/mail.route"));
const contact_route_1 = __importDefault(require("./presentation/routes/contact.route"));
const service_route_1 = __importDefault(require("./presentation/routes/service.route"));
const cart_route_1 = __importDefault(require("./presentation/routes/cart.route"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const faq_route_1 = __importDefault(require("./presentation/routes/faq.route"));
const tranzak_route_1 = __importDefault(require("./presentation/routes/payment/tranzak.route"));
dotenv.config();
const db = new db_postgres_config_1.PostgresDbConfig();
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// Serve static files from the public folder
app.use(express_1.default.static("public"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const corsOptions = {
    origin: "*",
    credentials: true,
};
exports.io = new socket_io_1.Server(server, {
    cors: corsOptions,
});
// app.set("io", io);
/**
 *  App Configuration
 */
app.use((0, cors_1.default)(corsOptions));
app
    .use(express_1.default.urlencoded({
    extended: true,
}))
    .use(express_1.default.json({ limit: "50kb" }))
    .use((0, cookie_parser_1.default)())
    .use((0, helmet_1.default)())
    .use((0, express_session_1.default)({
    // store: store,
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}))
    .use(authz_middleware_1.default.initialize())
    .use(authz_middleware_1.default.authenticate("session"))
    .use(authz_middleware_1.default.session());
app.use(error_middleware_1.errorHandler);
// crud operations
db.connection()
    .then(() => {
    // authentication
    app.use("/auth", auth_route_1.authRoutes);
    app.get("/api", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    app.use("/api/categories", category_route_1.default);
    app.use("/api/sub-categories", sub_category_route_1.default);
    app.use("/api/tags", tag_route_1.default);
    app.use("/api/documents", document_route_1.default);
    app.use("/api/comments", comment_route_1.default);
    app.use("/api/posts", post_route_1.default);
    app.use("/api/roles", role_route_1.default);
    app.use("/api/lesson-reviews", lesson_review_route_1.default);
    app.use("/api/users", user_route_1.default);
    app.use("/api/products", product_route_1.default);
    app.use("/api/stores", store_route_1.default);
    app.use("/api/branches", branch_route_1.default);
    app.use("/api/banners", banner_route_1.default);
    app.use("/api/orders", order_route_1.default);
    app.use("/api/payments", payment_route_1.default);
    //only for test purposes
    app.use("/api/process-payments", tranzak_route_1.default);
    //course module
    app.use("/api/courses", course_route_1.default);
    app.use("/api/lessons", lesson_route_1.default);
    app.use("/api/enrollments", enrollment_route_1.default);
    app.use("/api/quizes", quiz_route_1.default);
    // health
    app.use("/api/appointments", appointment_route_1.default);
    app.use("/api/consultations", consultation_route_1.default);
    app.use("/api/reviews", review_route_1.default);
    app.use("/api/user-roles", user_role_route_1.default);
    app.use("/api/user-docs", user_doc_route_1.default);
    app.use("/api/specialties", specialty_route_1.default);
    app.use("/api/uploads", upload_route_1.default);
    app.use("/api/events", event_route_1.default);
    app.use("/api/subscribers", subscriber_route_1.default);
    app.use("/api/mails", mail_route_1.default);
    app.use("/api/contacts", contact_route_1.default);
    app.use("/api/services", service_route_1.default);
    app.use("/api/faqs", faq_route_1.default);
    app.use("/api/carts", (0, cart_route_1.default)(exports.io));
    exports.io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
    // middleware interceptions
    app.use(not_found_middleware_1.notFoundHandler);
    /**
     * Server Activation
     */
    // app.listen(PORT, () => {
    //   console.log(`⚡️[server]: Listening on port ${PORT}`);
    // });
    server.listen(PORT, () => {
        console.log(`⚡️[server]: Listening on port ${PORT}`);
    });
})
    .catch((erro) => {
    console.log("error: ", erro);
});
