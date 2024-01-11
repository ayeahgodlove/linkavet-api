import { ColumnsType } from "antd/es/table";
import { useCourse } from "hooks/lms/course.hook";
import { useUser } from "hooks/user.hook";
import { IEnrollment } from "models/lms/enrollment";
import { format } from "utils/format";

export const useEnrollmentColumns = () => {
  const { getCourse } = useCourse();
  const { getUser } = useUser();
  const enrollmentTableColumns: ColumnsType<IEnrollment> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course",
      dataIndex: "courseId",
      key: "courseId",
      render: (_, record) => getCourse(record.courseId).title,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => getUser(record.userId).username,
    },
    {
      title: "Enrollment Date",
      dataIndex: "enrollmentDate",
      key: "enrollmentDate",
      render: (_, record) => format.date(record.enrollmentDate),
    },
    {
      title: "Completion Date",
      dataIndex: "completionDate",
      key: "completionDate",
      render: (_, record) => format.date(record.completionDate),
    },
  ];

  return {
    enrollmentTableColumns,
  };
};
