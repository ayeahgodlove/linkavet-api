import { Button, Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { courseTableColumns } from "./course-column.component";
import CourseForm from "./course-form.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useModalContext } from "context/app-modal.context";
import { useNavigate } from "react-router-dom";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useCourse } from "hooks/lms/course.hook";
import { ICourse } from "models/lms/course";
import { fetchCourseSuccess } from "redux/lms/course.slice";
import { API_URL } from "config/constant";

const { Search } = Input;
export function CourseTable() {
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { courses, initialFetch, setCourse } = useCourse();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setTitle("Create a Course");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <CourseForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getCourses = useCallback(async (): Promise<ICourse[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/courses`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultCourses: ICourse[] = courses.filter((course) =>
    search(course, ["description"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const handleRowClick = (course: ICourse) => {
    setCourse(course);
    router(
      `/admin/courses/${slugify(course.title, {
        lower: true,
        replacement: "-",
      })}?tab=0`
    );
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const courseDATas = await getCourses();
      dispatch(fetchCourseSuccess([...courseDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Courses loading..." height="65vh" />;
  }
  return (
    <>
      {courses && courses.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(course) => onChange(course)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            columns={courseTableColumns}
            dataSource={
              resultCourses && resultCourses.length > 0
                ? resultCourses
                : courses
            }
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: ICourse) => {
              return {
                onClick: () => {
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <Empty
          style={{ backgroundColor: "#f3f3f3", padding: "2rem" }}
          description={
            <>
              <Paragraph style={{ marginBottom: 10 }}>
                No courses at this moment
              </Paragraph>
              <Button type="primary" onClick={handleClick}>
                Create Course
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
