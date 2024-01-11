import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { NoContent } from "components/shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useLessonColumn } from "./lesson-column.component";
import { useLesson } from "hooks/lms/lesson.hook";
import { LessonService } from "services/lms/lesson.service";
import { ILesson } from "models/lms/lesson";
import { fetchLessonSuccess } from "../../../../redux/lms/lesson.slice";
import { useModalContext } from "context/app-modal.context";
import { LessonForm } from "./lesson-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useCourse } from "hooks/lms/course.hook";

const LessonTable: React.FC = () => {
  const { getCourseLessons, setLesson, initialFetch } = useLesson();
  const router = useNavigate();
  const { lessonTableColumns } = useLessonColumn();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { course } = useCourse();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getLessons = useCallback(async (): Promise<ILesson[]> => {
    setLoading(true);
    const response = await LessonService.list();
    const { data } = response;

    return data;
  }, []);

  const resultLessons: ILesson[] = getCourseLessons(course.id).filter(
    (lesson) =>
      search(lesson, ["title", "description", "difficulty"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (lesson: ILesson) => {
    setLesson(lesson);
    router(`/admin/lessons/${slugify(lesson.title, "-")}?tab=0`);
  };

  const createLesson = () => {
    setTitle("Create a Lesson");
    setWidth("50rem");
    setShow(true);
    setContent(
      <>
        <LessonForm formMode={UpdateMode.ADD} />
      </>
    );
  };
  useEffect(() => {
    (async () => {
      const lessonDATas = await getLessons();
      dispatch(fetchLessonSuccess([...lessonDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Lessons loading..." height="65vh" />;
  }

  return (
    <>
      {getCourseLessons(course.id) && getCourseLessons(course.id).length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by name"
                onChange={(lesson) => onChange(lesson)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<ILesson>
            dataSource={
              resultLessons && resultLessons.length > 0
                ? resultLessons
                : getCourseLessons(course.id)
            }
            columns={lessonTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: ILesson) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <NoContent
          title="No data for lesson"
          showButton
          buttonLabel="Add Lesson"
          handleClick={createLesson}
        />
      )}
    </>
  );
};

export default LessonTable;
