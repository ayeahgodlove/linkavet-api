import {
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  Row,
  Typography,
} from "antd";
import { useCourse } from "hooks/lms/course.hook";
import { useLesson } from "hooks/lms/lesson.hook";
import { useUser } from "hooks/user.hook";
import React, { useEffect } from "react";
import "./course-detail.style.scss";
import { FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useDispatch } from "react-redux";
import { fetchLessonsAsync } from "redux/lms/lesson.slice";
import { fetchUsersAsync } from "redux/user.slice";
import { API_URL_UPLOADS_COURSES } from "config/constant";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import { useAuth } from "hooks/auth/auth.hook";
import slugify from "slugify";
import { ILesson } from "models/lms/lesson";
import PageContent from "components/shared/page-content/index";

const courseDetailPage: React.FC = () => {
  const { course } = useCourse();
  const { getUser } = useUser();
  const { user } = useAuth();
  const { courseLessons, setLesson, lesson } = useLesson();
  const { getUserCourses } = useEnrollment();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEnrollCourse = () => {
    navigate("/auth-check");
  };

  const takeCourse = (lesson: ILesson) => {
    setLesson(lesson);
    navigate(
      `/courses/${slugify(lesson.title, {
        lower: true,
        replacement: "-",
      })}/learn`
    );
  };

  useEffect(() => {
    dispatch(fetchUsersAsync() as any);
    dispatch(fetchLessonsAsync() as any);
  }, []);

  return (
    <>
      <Row
        justify={"center"}
        style={{ marginTop: "1rem", marginBottom: 20 }}
        gutter={[16, 16]}
        className="course-container"
      >
        <PageContent
          title={course.title}
          breadcrumb={[
            {
              title: "Courses",
              link: "/courses",
            },
            {
              title: "Course Details",
            },
          ]}
        />
        <Col xs={18} md={15}>
          <Card size="small">
            <div
              style={{ display: "flex", justifyContent: "flex-start" }}
              className="course-banner"
            >
              <img
                alt={course.title}
                src={`${API_URL_UPLOADS_COURSES}/${course.courseImage}`}
                style={{
                  width: "100%",
                  maxHeight: "55vh",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              className="text"
              style={{ paddingLeft: "2rem", color: "#333" }}
            >
              <Typography.Title
                level={3}
                style={{ marginTop: 30, textAlign: "center" }}
              >
                {course.title}
              </Typography.Title>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: course.description,
                  }}
                />
              </p>
              <br />
            </div>
          </Card>

          <Card
            size="small"
            title={
              <Typography.Title style={{ textAlign: "center" }} level={3}>
                Lessons
              </Typography.Title>
            }
            style={{ marginTop: 15 }}
          >
            <Collapse accordion>
              {courseLessons && courseLessons.length ? (
                courseLessons.map((lesson, index) => {
                  return (
                    <Collapse.Panel
                      header={
                        <Typography.Title level={5}>
                          {lesson.title}
                        </Typography.Title>
                      }
                      key={index}
                    >
                      <Row justify={"space-between"} align={"middle"}>
                        <Col span={2}>
                          <Button
                            type="default"
                            icon={<FiPlayCircle size={25} />}
                            onClick={() => takeCourse(lesson)}
                          />
                        </Col>
                        <Col span={22}>
                          <Typography.Text>
                            {lesson.description}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  );
                })
              ) : (
                <NoContent title="No lessons at the moment..." />
              )}
            </Collapse>
          </Card>
        </Col>
        <Col xs={6} md={7}>
          <Card
            size="small"
            title={
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                Course Progress
              </Typography.Title>
            }
          >
            {/* course obvious details */}
            <Descriptions title="Course Info" layout="horizontal" size="small">
              <Descriptions.Item label="Author" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).firstname +
                    " " +
                    getUser(course.authorId).lastname}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Telephone" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).phoneNumber}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).email}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).address}
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              disabled={getUserCourses(user.id) !== null ? true : false}
              block
              onClick={onEnrollCourse}
            >
              {getUserCourses(user.id) !== null ? (
                <>Already enrolled!</>
              ) : (
                <>Enroll for this course</>
              )}
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default courseDetailPage;
