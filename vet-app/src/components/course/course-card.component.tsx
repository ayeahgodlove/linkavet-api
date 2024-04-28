import { Button, Card, List } from "antd";
import React from "react";
import "./course.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "../../components/shared/rate.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { ICourse } from "../../models/lms/course";
import { API_URL_UPLOADS_COURSES } from "../../config/constant";

const { Meta } = Card;
interface IProp {
  course: ICourse;
  onCourseClick: (courseId: any) => void;
}
const CourseCard: React.FC<IProp> = ({ course, onCourseClick }) => {
  return (
    <Card
      hoverable
      bordered={false}
      style={{ padding: 0, marginLeft: 15, marginBottom: 10 }}
      bodyStyle={{ paddingTop: 10 }}
      cover={
        <img
          alt={course.title}
          src={`${API_URL_UPLOADS_COURSES}/${course.courseImage}`}
        />
      }
      className="course-card"
    >
      <div>
        <Meta
          style={{ wordWrap: "break-word" }}
          title={
            <Link
              to={`/courses/${slugify(course.title, { lower: true })}`}
              onClick={() => onCourseClick(course.id)}
            >
              {course.title}
            </Link>
          }
          description={course.description.slice(0, 400)}
        />
        <RaterComponent />
      </div>
      <Button
        type="link"
        className="add-to-fav-btn"
        icon={<RiHeartFill size={30} className="add-to-fav" />}
      />
    </Card>
  );
};

export default CourseCard;
