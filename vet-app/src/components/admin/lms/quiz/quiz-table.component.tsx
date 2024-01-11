import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useQuizColumns } from "./quiz-column.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useModalContext } from "context/app-modal.context";
import { useDispatch } from "react-redux";
import { QuizForm } from "./quiz-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useQuiz } from "hooks/lms/quiz.hook";
import { IQuiz } from "models/lms/quiz";
import { fetchquizSuccess } from "redux/lms/quiz.slice";

const { Search } = Input;

const QuizTable: React.FC = () => {
  const { quizs, setQuiz, initialFetch } = useQuiz();
  const { quizTableColumns } = useQuizColumns();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createQuiz = () => {
    setTitle("Create a Quiz");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <QuizForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getQuizs = useCallback(async (): Promise<IQuiz[]> => {
    setLoading(true);
    const response = await fetch(`/api/quizes`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultQuizs: IQuiz[] = quizs.filter((client) =>
    search(client, ["question"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (quiz: IQuiz) => {
    setQuiz(quiz);
  };

  useEffect(() => {
    (async () => {
      const quizDATas = await getQuizs();
      dispatch(fetchquizSuccess([...quizDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Quizes loading..." height="65vh" />;
  }

  return (
    <>
      {quizs && quizs.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by question"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IQuiz>
            dataSource={
              resultQuizs && resultQuizs.length > 0 ? resultQuizs : quizs
            }
            columns={quizTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IQuiz) => {
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
          title="No data for quiz"
          showButton={true}
          buttonLabel="Add Quiz"
          handleClick={createQuiz}
        />
      )}
    </>
  );
};

export default QuizTable;
