// src/presentation/mappers/category-mapper.ts

import { Branch } from "../../data/entities/branch";
import { Category } from "../../data/entities/category";
import { Role } from "../../data/entities/role";
import { Tag } from "../../data/entities/tag";
import { User } from "../../data/entities/user";
import { UserDoc } from "../../data/entities/user-doc";
import { IBranch } from "../../domain/models/branch";
import { ICategory } from "../../domain/models/category";
import { ILessonReview } from "../../domain/models/lesson-review";
import { IRole } from "../../domain/models/role";
import { ITag } from "../../domain/models/tag";
import { IUser } from "../../domain/models/user";
import { IUserDoc } from "../../domain/models/user-doc";
import { IStore } from "../../domain/models/store";
import { Store } from "../../data/entities/store";
import { Product } from "../../data/entities/product";
import { Comment } from "../../data/entities/comment";
import { IProduct } from "../../domain/models/product";
import { DocumentFile } from "../../data/entities/document";
import { IDocument } from "../../domain/models/document";
import { IComment } from "../../domain/models/comment";
import { Post } from "../../data/entities/post";
import { IPost } from "../../domain/models/post";
import { SubCategory } from "../../data/entities/sub-category";
import { ISubCategory } from "../../domain/models/sub-category";
import { Banner } from "../../data/entities/banner";
import { IBanner } from "../../domain/models/banner";
import { Order } from "../../data/entities/order";
import { IOrder } from "../../domain/models/order";
import { Payment } from "../../data/entities/payment";
import { IPayment } from "../../domain/models/payment";
import { LessonReview } from "../../data/entities/lesson-review";
import { Course } from "../../data/entities/lms/course";
import { ICourse } from "../../domain/models/lms/course";
import { Lesson } from "../../data/entities/lms/lesson";
import { ILesson } from "../../domain/models/lms/lesson";
import { Enrollment } from "../../data/entities/lms/enrollment";
import { IEnrollment } from "../../domain/models/lms/enrollment";
import { Quiz } from "../../data/entities/lms/quiz";
import { IQuiz } from "../../domain/models/lms/quiz";
import { Appointment } from "../../data/entities/health/appointment";
import { IAppointment } from "../../domain/models/health/appointment";
import { Consultation } from "../../data/entities/health/consultation";
import { IConsultation } from "../../domain/models/health/consultation";
import { Review } from "../../data/entities/review";
import { IReview } from "../../domain/models/review";
import { UserRole } from "../../data/entities/user-role";
import { IUserRole } from "../../domain/models/user-role";
import { ProductOrder } from "../../data/entities/product-order";
import { IProductOrder } from "../../domain/models/product-order";
import { Specialty } from "../../data/entities/specialty";
import { ISpecialty } from "../../domain/models/specialty";
import { IEvent } from "../../domain/models/event";
import { Event } from "../../data/entities/event";
import { Subscriber } from "../../data/entities/subscriber";
import { ISubscriber } from "../../domain/models/subscriber";
import { Mail } from "../../data/entities/mail";
import { IMail } from "../../domain/models/mail";
import { Contact } from "../../data/entities/contact";
import { IContact } from "../../domain/models/contact";
import { Service } from "../../data/entities/service";
import { IService } from "../../domain/models/service";
import { Faq } from "../../data/entities/faq";
import { IFaq } from "../../domain/models/faq";

export class CategoryMapper {
  toDTO(category: Category): ICategory {
    const entity = category.toJSON<ICategory>();
    return entity;
  }
  toDTOs(categories: Category[]): ICategory[] {
    const _categories = categories.map((category) => {
      const entity = category.toJSON<ICategory>();
      return entity;
    });
    return _categories;
  }
}

export class EventMapper {
  toDTO(event: Event): IEvent {
    const entity = event.toJSON<IEvent>();
    return entity;
  }
  toDTOs(events: Event[]): IEvent[] {
    const _events = events.map((event) => {
      const entity = event.toJSON<IEvent>();
      return entity;
    });
    return _events;
  }
}

export class FaqMapper {
  toDTO(faq: Faq): IFaq {
    const entity = faq.toJSON<IFaq>();
    return entity;
  }
  toDTOs(faqs: Faq[]): IFaq[] {
    const _faqs = faqs.map((faq) => {
      const entity = faq.toJSON<IFaq>();
      return entity;
    });
    return _faqs;
  }
}

export class ServiceMapper {
  toDTO(service: Service): IService {
    const entity = service.toJSON<IService>();
    return entity;
  }
  toDTOs(services: Service[]): IService[] {
    const _services = services.map((service) => {
      const entity = service.toJSON<IService>();
      return entity;
    });
    return _services;
  }
}

export class BannerMapper {
  toDTO(banner: Banner): IBanner {
    const entity = banner.toJSON<IBanner>();
    return entity;
  }
  toDTOs(banners: Banner[]): IBanner[] {
    const _banners = banners.map((banner) => {
      const entity = banner.toJSON<IBanner>();
      return entity;
    });
    return _banners;
  }
}

export class SubCategoryMapper {
  toDTO(subCategory: SubCategory): ISubCategory {
    const entity = subCategory.toJSON<ISubCategory>();
    return entity;
  }
  toDTOs(subCategories: SubCategory[]): ISubCategory[] {
    const _subCategories = subCategories.map((subCategory) => {
      const entity = subCategory.toJSON<ISubCategory>();
      return entity;
    });
    return _subCategories;
  }
}

export class PostMapper {
  toDTO(post: Post): IPost {
    const entity = post.toJSON<IPost>();
    return entity;
  }
  toDTOs(posts: Post[]): IPost[] {
    const _posts = posts.map((post) => {
      const entity = post.toJSON<IPost>();
      return entity;
    });
    return _posts;
  }
}

export class UserMapper {
  toDTO(user: User): IUser {
    const entity = user.toJSON<IUser>();
    return entity;
  }
  toDTOs(users: User[]): IUser[] {
    const _users = users.map((user) => {
      const entity = user.toJSON<IUser>();
      return entity;
    });
    return _users;
  }
}

export class UserRoleMapper {
  toDTO(userRole: UserRole): IUserRole {
    const entity = userRole.toJSON<IUserRole>();
    return entity;
  }
  toDTOs(userRoles: UserRole[]): IUserRole[] {
    const _userRoles = userRoles.map((userRole) => {
      const entity = userRole.toJSON<IUserRole>();
      return entity;
    });
    return _userRoles;
  }
}

export class CommentMapper {
  toDTO(comment: Comment): IComment {
    const entity = comment.toJSON<IComment>();
    return entity;
  }
  toDTOs(comments: Comment[]): IComment[] {
    const _comments = comments.map((comment) => {
      const entity = comment.toJSON<IComment>();
      return entity;
    });

    // const filteredComments = _comments.filter(c => c.parent_id === "" || c.parent_id === null);
    return _comments;
  }
}

export class DocumentMapper {
  toDTO(document: DocumentFile): IDocument {
    const entity = document.toJSON<IDocument>();
    return entity;
  }
  toDTOs(documents: DocumentFile[]): IDocument[] {
    const _documents = documents.map((document) => {
      const entity = document.toJSON<IDocument>();
      return entity;
    });
    return _documents;
  }
}

export class TagMapper {
  toDTO(tag: Tag): ITag {
    const entity = tag.toJSON<ITag>();
    return entity;
  }
  toDTOs(tags: Tag[]): ITag[] {
    const _tags = tags.map((tag) => {
      const entity = tag.toJSON<ITag>();
      return entity;
    });
    return _tags;
  }
}

export class BranchMapper {
  toDTO(branch: Branch): IBranch {
    const entity = branch.toJSON<IBranch>();
    return entity;
  }
  toDTOs(branches: Branch[]): IBranch[] {
    const _branches = branches.map((branch) => {
      const entity = branch.toJSON<IBranch>();
      return entity;
    });
    return _branches;
  }
}

export class ReviewMapper {
  toDTO(review: Review): IReview {
    const entity = review.toJSON<IReview>();
    return entity;
  }
  toDTOs(reviewes: Review[]): IReview[] {
    const _reviews = reviewes.map((review) => {
      const entity = review.toJSON<IReview>();
      return entity;
    });
    return _reviews;
  }
}

export class StoreMapper {
  toDTO(store: Store): IStore {
    const entity = store.toJSON<IStore>();
    return entity;
  }
  toDTOs(stores: Store[]): IStore[] {
    const _stores = stores.map((store) => {
      const entity = store.toJSON<IStore>();
      return entity;
    });
    return _stores;
  }
}

export class ProductMapper {
  toDTO(product: Product): IProduct {
    const entity = product.toJSON<IProduct>();
    return entity;
  }
  toDTOs(products: Product[]): IProduct[] {
    const _products = products.map((product) => {
      const entity = product.toJSON<IProduct>();
      return entity;
    });
    return _products;
  }
}

export class UserDocMapper {
  toDTO(userDoc: UserDoc): IUserDoc {
    const entity = userDoc.toJSON<IUserDoc>();
    return entity;
  }
  toDTOs(userDocs: UserDoc[]): IUserDoc[] {
    const _userDocs = userDocs.map((userDoc) => {
      const entity = userDoc.toJSON<IUserDoc>();
      return entity;
    });
    return _userDocs;
  }
}

export class RoleMapper {
  toDTO(role: Role): IRole {
    const entity = role.toJSON<IRole>();
    return entity;
  }
  toDTOs(roles: Role[]): IRole[] {
    const _roles = roles.map((role) => {
      const entity = role.toJSON<IRole>();
      return entity;
    });
    return _roles;
  }
}

export class ContactMapper {
  toDTO(contact: Contact): IContact {
    const entity = contact.toJSON<IContact>();
    return entity;
  }
  toDTOs(contacts: Contact[]): IContact[] {
    const _contacts = contacts.map((contact) => {
      const entity = contact.toJSON<IContact>();
      return entity;
    });
    return _contacts;
  }
}

export class SpecialtyMapper {
  toDTO(specialty: Specialty): ISpecialty {
    const entity = specialty.toJSON<ISpecialty>();
    return entity;
  }
  toDTOs(specialtys: Specialty[]): ISpecialty[] {
    const _specialties = specialtys.map((specialty) => {
      const entity = specialty.toJSON<ISpecialty>();
      return entity;
    });
    return _specialties;
  }
}

export class LessonReviewMapper {
  toDTO(review: LessonReview): ILessonReview {
    const entity = review.toJSON<ILessonReview>();
    return entity;
  }
  toDTOs(reviews: LessonReview[]): ILessonReview[] {
    const _reviews = reviews.map((review) => {
      const entity = review.toJSON<ILessonReview>();
      return entity;
    });
    return _reviews;
  }
}
export class ProductOrderMapper {
  toDTO(order: ProductOrder): IProductOrder {
    const entity = order.toJSON<IProductOrder>();
    return entity;
  }
  toDTOs(orders: ProductOrder[]): IProductOrder[] {
    const _orders = orders.map((order) => {
      const entity = order.toJSON<IProductOrder>();
      return entity;
    });
    return _orders;
  }
}

export class OrderMapper {
  toDTO(order: Order): IOrder {
    const entity = order.toJSON<IOrder>();
    return entity;
  }
  toDTOs(orders: Order[]): IOrder[] {
    const _orders = orders.map((order) => {
      const entity = order.toJSON<IOrder>();
      return entity;
    });
    return _orders;
  }
}
export class PaymentMapper {
  toDTO(payment: Payment): IPayment {
    const entity = payment.toJSON<IPayment>();
    return entity;
  }
  toDTOs(payments: Payment[]): IPayment[] {
    const _payments = payments.map((payment) => {
      const entity = payment.toJSON<IPayment>();
      return entity;
    });
    return _payments;
  }
}

/**
 * course module
 */
export class CourseMapper {
  toDTO(course: Course): ICourse {
    const entity = course.toJSON<ICourse>();
    return entity;
  }
  toDTOs(courses: Course[]): ICourse[] {
    const _courses = courses.map((course) => {
      const entity = course.toJSON<ICourse>();
      return entity;
    });
    return _courses;
  }
}

export class LessonMapper {
  toDTO(lesson: Lesson): ILesson {
    const entity = lesson.toJSON<ILesson>();
    return entity;
  }
  toDTOs(lessons: Lesson[]): ILesson[] {
    const _lessons = lessons.map((lesson) => {
      const entity = lesson.toJSON<ILesson>();
      return entity;
    });
    return _lessons;
  }
}

export class EnrollmentMapper {
  toDTO(enrollment: Enrollment): IEnrollment {
    const entity = enrollment.toJSON<IEnrollment>();
    return entity;
  }
  toDTOs(enrollments: Enrollment[]): IEnrollment[] {
    const _enrollments = enrollments.map((enrollment) => {
      const entity = enrollment.toJSON<IEnrollment>();
      return entity;
    });
    return _enrollments;
  }
}

export class QuizMapper {
  toDTO(quiz: Quiz): IQuiz {
    const entity = quiz.toJSON<IQuiz>();
    return entity;
  }
  toDTOs(quizes: Quiz[]): IQuiz[] {
    const _quizes = quizes.map((quiz) => {
      const entity = quiz.toJSON<IQuiz>();
      return entity;
    });
    return _quizes;
  }
}

export class AppointmentMapper {
  toDTO(appointment: Appointment): IAppointment {
    const entity = appointment.toJSON<IAppointment>();
    return entity;
  }
  toDTOs(appointments: Appointment[]): IAppointment[] {
    const _appointments = appointments.map((appointment) => {
      const entity = appointment.toJSON<IAppointment>();
      return entity;
    });
    return _appointments;
  }
}

export class ConsultationMapper {
  toDTO(consultation: Consultation): IConsultation {
    const entity = consultation.toJSON<IConsultation>();
    return entity;
  }
  toDTOs(consultations: Consultation[]): IConsultation[] {
    const _consultations = consultations.map((consultation) => {
      const entity = consultation.toJSON<IConsultation>();
      return entity;
    });
    return _consultations;
  }
}

export class SubscriberMapper {
  toDTO(subscriber: Subscriber): ISubscriber {
    const entity = subscriber.toJSON<ISubscriber>();
    return entity;
  }
  toDTOs(subscribers: Subscriber[]): ISubscriber[] {
    const _subscribers = subscribers.map((subscriber) => {
      const entity = subscriber.toJSON<ISubscriber>();
      return entity;
    });
    return _subscribers;
  }
}

export class MailMapper {
  toDTO(mail: Mail): IMail {
    const entity = mail.toJSON<IMail>();
    return entity;
  }
  toDTOs(mails: Mail[]): IMail[] {
    const _mails = mails.map((mail) => {
      const entity = mail.toJSON<IMail>();
      return entity;
    });
    return _mails;
  }
}
