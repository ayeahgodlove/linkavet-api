import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEnrollmentColumns } from "./enrollment-column.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useModalContext } from "context/app-modal.context";
import { useDispatch } from "react-redux";
import { EnrollmentForm } from "./enrollment-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import { IEnrollment } from "models/lms/enrollment";
import { fetchenrollmentSuccess } from "redux/lms/enrollment.slice";
import { useCourse } from "hooks/lms/course.hook";

const { Search } = Input;

const EnrollmentTable: React.FC = () => {
  const { enrollments, setEnrollment, initialFetch } = useEnrollment();
  const { enrollmentTableColumns } = useEnrollmentColumns();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { getCourse } = useCourse();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createEnrollment = () => {
    setTitle("Create a Enrollment");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <EnrollmentForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getEnrollments = useCallback(async (): Promise<IEnrollment[]> => {
    setLoading(true);
    const response = await fetch(`/api/enrollments`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultEnrollments: IEnrollment[] = enrollments.filter((client) =>
    search(client, ["completionDate", "enrollmentDate"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (enrollment: IEnrollment) => {
    setEnrollment(enrollment);
    router(`/admin/enrollments/${getCourse(enrollment.courseId).description}`);
  };

  useEffect(() => {
    (async () => {
      const enrollmentDATas = await getEnrollments();
      dispatch(fetchenrollmentSuccess([...enrollmentDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Enrollments loading..." height="65vh" />;
  }

  return (
    <>
      {enrollments && enrollments.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IEnrollment>
            dataSource={
              resultEnrollments && resultEnrollments.length > 0
                ? resultEnrollments
                : enrollments
            }
            columns={enrollmentTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IEnrollment) => {
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
          title="No data for enrollment"
          showButton={true}
          buttonLabel="Add Enrollment"
          handleClick={createEnrollment}
        />
      )}
    </>
  );
};

export default EnrollmentTable;
