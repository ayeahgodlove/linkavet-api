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
import processPaymentRouter from "./presentation/routes/payment/process-payments.route";
import courseRouter from "./presentation/routes/lms/course.route";
import lessonRouter from "./presentation/routes/lms/lesson.route";
import enrollmentRouter from "./presentation/routes/lms/enrollment.route";
import quizRouter from "./presentation/routes/lms/quiz.route";
import productReviewRouter from "./presentation/routes/product-review.route";
import lessonReviewRouter from "./presentation/routes/lesson-review.route";
import appointmentRouter from "./presentation/routes/health/appointment.route";
import consultationRouter from "./presentation/routes/health/consultation.route";
// import { seo } from "./utils/seo";
// import fs from "fs";
import userRoleRouter from "./presentation/routes/user-role.route";
// import { sendPasswordResetEmail, sendRegistrationMail } from "./utils/email";
import uploadRouter from "./presentation/routes/upload.route";
import eventRouter from "./presentation/routes/event.route";
import specialtyRouter from "./presentation/routes/specialty.route";
import subscriberRouter from "./presentation/routes/subscriber.route";
import mailRouter from "./presentation/routes/mail.route";

dotenv.config();
const db = new PostgresDbConfig();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

db.connection()
  .then(() => {
    const app: Express = express();

    /**
     *  App Configuration
     */

    // Serve static files from the public folder
    app.use(express.static("public"));
    app.use(express.static(path.join(__dirname, "public")));
    // app.use("/uploads", express.static(path.join(__dirname, "public")));

    // enable the use of request body parsing middleware
    
    // const allowedOrigins = [
    //   "http://localhost:3000",
    //   "https://linkavet.com",
    //   "https://www.linkavet.com",
    // ];

    // const corsOptions = {
    //   origin: function (origin: any, callback: any) {
    //     if (allowedOrigins.indexOf(origin) !== -1) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error("Not allowed by CORS"));
    //     }
    //   },
    //   credentials: true, // Needed if you're sending cookies or authorization headers
    // };
    const corsOptions = {
      origin: "*", // Allow requests from all origins (for development only)
      credentials: true,
    };

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
    app.use("/api/user-documents", userDocRouter);
    app.use("/api/product-reviews", productReviewRouter);
    app.use("/api/lesson-reviews", lessonReviewRouter);
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
    app.use("/api/stores", storeRouter);
    app.use("/api/branches", branchRouter);
    app.use("/api/banners", bannerRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/payments", paymentRouter);

    //only for test purposes
    app.use("/api/process-payments", processPaymentRouter);

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
    app.use("/api/specialties", specialtyRouter);
    app.use("/api/uploads", uploadRouter);
    app.use("/api/calendar/events", eventRouter);
    app.use("/api/subscribers", subscriberRouter);
    app.use("/api/mails", mailRouter);
    // middleware interceptions
    app.use(notFoundHandler);

    /**
     * Server Activation
     */
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Listening on port ${PORT}`);
    });
  })
  .catch((erro) => {
    console.log("error: ", erro);
  });
