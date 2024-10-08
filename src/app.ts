import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";

import { PostgresDbConfig } from "./infrastructure/database/postgres/db-postgres.config";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { notFoundHandler } from "./shared/middlewares/not-found.middleware";
import categoryRouter from "./presentation/routes/category.route";
import roleRouter from "./presentation/routes/role.route";
import reviewRouter from "./presentation/routes/review.route";
import { authRoutes } from "./presentation/routes/auth/auth.route";

import userRouter from "./presentation/routes/user.route";
import userDocRouter from "./presentation/routes/user-doc.route";
import path from "path";
import tagRouter from "./presentation/routes/tag.route";
import productRouter from "./presentation/routes/product.route";
import storeRouter from "./presentation/routes/store.route";
import branchRouter from "./presentation/routes/branch.route";
import documentRouter from "./presentation/routes/document.route";
import commentRouter from "./presentation/routes/comment.route";
import postRouter from "./presentation/routes/post.route";
import subCategoryRouter from "./presentation/routes/sub-category.route";
import Passport from "./shared/middlewares/authz.middleware";
import bannerRouter from "./presentation/routes/banner.route";
import orderRouter from "./presentation/routes/order.route";
import paymentRouter from "./presentation/routes/payment.route";
// import processPaymentRouter from "./presentation/routes/payment/process-payments.route";
import courseRouter from "./presentation/routes/lms/course.route";
import lessonRouter from "./presentation/routes/lms/lesson.route";
import enrollmentRouter from "./presentation/routes/lms/enrollment.route";
import quizRouter from "./presentation/routes/lms/quiz.route";
import lessonReviewRouter from "./presentation/routes/lesson-review.route";
import appointmentRouter from "./presentation/routes/health/appointment.route";
import consultationRouter from "./presentation/routes/health/consultation.route";
// import fs from "fs";
import userRoleRouter from "./presentation/routes/user-role.route";
import uploadRouter from "./presentation/routes/upload.route";
import eventRouter from "./presentation/routes/event.route";
import specialtyRouter from "./presentation/routes/specialty.route";
import subscriberRouter from "./presentation/routes/subscriber.route";
import mailRouter from "./presentation/routes/mail.route";
import contactRouter from "./presentation/routes/contact.route";
import serviceRouter from "./presentation/routes/service.route";
import cartRouter from "./presentation/routes/cart.route";
import { createServer } from "http";
import { Server } from "socket.io";
import faqRouter from "./presentation/routes/faq.route";
import tranzakRouter from "./presentation/routes/payment/tranzak.route";

dotenv.config();
const db = new PostgresDbConfig();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();
const server = createServer(app);

// Serve static files from the public folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "*", // Allow requests from all origins (for development only)
  credentials: true,
};
export const io = new Server(server, {
  cors: corsOptions,
});

// app.set("io", io);
/**
 *  App Configuration
 */

app.use(cors(corsOptions));
app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json({ limit: "50kb" }))
  .use(cookieParser())
  .use(helmet())
  .use(
    session({
      // store: store,
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  )
  .use(Passport.initialize())
  .use(Passport.authenticate("session"))
  .use(Passport.session());

app.use(errorHandler);

// crud operations
db.connection()
  .then(() => {
    // authentication
    app.use("/auth", authRoutes);

    app.get("/api", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });

    app.use("/api/categories", categoryRouter);
    app.use("/api/sub-categories", subCategoryRouter);
    app.use("/api/tags", tagRouter);
    app.use("/api/documents", documentRouter);
    app.use("/api/comments", commentRouter);
    app.use("/api/posts", postRouter);
    app.use("/api/roles", roleRouter);
    app.use("/api/lesson-reviews", lessonReviewRouter);
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
    app.use("/api/stores", storeRouter);
    app.use("/api/branches", branchRouter);
    app.use("/api/banners", bannerRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/payments", paymentRouter);

    //only for test purposes
    app.use("/api/process-payments", tranzakRouter);

    //course module
    app.use("/api/courses", courseRouter);
    app.use("/api/lessons", lessonRouter);
    app.use("/api/enrollments", enrollmentRouter);
    app.use("/api/quizes", quizRouter);

    // health
    app.use("/api/appointments", appointmentRouter);
    app.use("/api/consultations", consultationRouter);

    app.use("/api/reviews", reviewRouter);
    app.use("/api/user-roles", userRoleRouter);
    app.use("/api/user-docs", userDocRouter);
    app.use("/api/specialties", specialtyRouter);
    app.use("/api/uploads", uploadRouter);
    app.use("/api/events", eventRouter);
    app.use("/api/subscribers", subscriberRouter);
    app.use("/api/mails", mailRouter);
    app.use("/api/contacts", contactRouter);
    app.use("/api/services", serviceRouter);
    app.use("/api/faqs", faqRouter);
    app.use("/api/carts", cartRouter(io));

    io.on("connection", (socket) => {
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
    // middleware interceptions
    app.use(notFoundHandler);

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
