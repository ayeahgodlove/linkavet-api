import { Button, Card, List } from "antd";
import React from "react";
import "./course.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { ICourse } from "models/lms/course";

const { Meta } = Card;
interface IProp {
  course: ICourse;
  onCourseClick: (courseId: any) => void;
}
const CourseCard: React.FC<IProp> = ({ course, onCourseClick }) => {
  return (
    <List.Item
      key={course.id}
      className="course-list-item"
      style={{ padding: "4px 8px" }}
    >
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        cover={
          <img
            alt={course.title}
            src={`https://linkavet-api.onrender.com/uploads/courses/${course.courseImage}`}
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
    </List.Item>
  );
};

export default CourseCard;
