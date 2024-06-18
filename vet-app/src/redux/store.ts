import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
// import { default as sessionStorage } from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage";
import { productReducer } from "./product.slice";
import { userReducer } from "./user.slice";
import { categoryReducer } from "./category.slice";
// import { orderReducer } from "./order.slice";
import { paymentReducer } from "./payment.slice";
import { themeReducer } from "./shared/theme.slice";
import { formErrorReducer } from "./shared/form-error.slice";
import { reviewReducer } from "./review.slice";
import { authReducer } from "./auth/auth.slice";
import { postReducer } from "./post.slice";
import { documentReducer } from "./document.slice";
import { tagReducer } from "./tag.slice";
import { tokenReducer } from "./auth/token.slice";
import { subCategoryReducer } from "./sub-category.slice";
import { bannerReducer } from "./banner.slice";
import { storeReducer } from "./store.slice";
import { orderReducer } from "./order.slice";
import { shoppingCartReducer } from "./shared/shopping-cart.slice";
import { initTransactionReducer } from "./init-transaction.slice";
import { commentReducer } from "./comment.slice";
import { courseReducer } from "./lms/course.slice";
import { lessonReducer } from "./lms/lesson.slice";
import { enrollmentReducer } from "./lms/enrollment.slice";
import { quizReducer } from "./lms/quiz.slice";
import { consultationReducer } from "./health/consultation.slice";
import { appointmentReducer } from "./health/appointment.slice";
import { userRoleReducer } from "./user-role.slice";
import { roleReducer } from "./role.slice";
import { specialtyReducer } from "./specialty.slice";
import { imageReducer } from "./shared/image.slice";
import { eventReducer } from "./event.slice";
import { subscriberReducer } from "./subscriber.slice";
import { mailReducer } from "./mail.slice";
import { contactReducer } from "./contact.slice";
import { userDocReducer } from "./user-doc.slice";

// const middlewares: [any] = [thunkMiddleware];

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  tag: tagReducer,
  post: postReducer,
  document: documentReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  order: orderReducer,
  payment: paymentReducer,
  review: reviewReducer,
  theme: themeReducer,
  formError: formErrorReducer,
  auth: authReducer,
  token: tokenReducer,
  banner: bannerReducer,
  store: storeReducer,
  shoppingCart: shoppingCartReducer,
  initTransaction: initTransactionReducer,
  comment: commentReducer,
  image: imageReducer,
  // lms
  course: courseReducer,
  lesson: lessonReducer,
  enrollment: enrollmentReducer,
  quiz: quizReducer,
  // health
  consultation: consultationReducer,
  appointment: appointmentReducer,

  // roles
  userRole: userRoleReducer,
  role: roleReducer,
  specialty: specialtyReducer,
  event: eventReducer,
  subscriber: subscriberReducer,
  mail: mailReducer,
  contact: contactReducer,
  userDoc: userDocReducer
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: [
    "auth",
    "user",
    "theme",
    "category",
    "subCategory",
    "product",
    "order",
    "review",
    "payment",
    "order",
    "token",
    "post",
    "tag",
    "store",
    "shoppingCart",
    "initTransaction",
    "comment",
    "course",
    "lesson",
    "enrollment",
    "quiz",
    "role",
    "userRole",
    "userSpecialty",
    "event",
    "image",
    "contact",
    "userDoc"
  ], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let middleware: any[] = [loggerMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
export default store;
