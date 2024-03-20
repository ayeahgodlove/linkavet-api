import { Carousel, Modal } from "antd";
import { useReview } from "hooks/review.hook";
import React, { useState } from "react";
import ReviewCard from "./review-card.component";
import ReactPlayer from "react-player/youtube";
import { Container } from "components/shared/container/container";
import { CaretRightOutlined } from "@ant-design/icons";
import "./testimonial.less"

const Review = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const { reviews } = useReview();

  return (
    <>
      <section id="testimonial" className="testimonial">
        <Container fluid className="testimonial__container-fluid">
          <div className="testimonial__play-button" onClick={showModal}>
            <CaretRightOutlined className="testimonial__play-icon" />
          </div>
        </Container>
        <Container className="testimonial__container">
          <Carousel
            className="testimonial__carousel"
            dotPosition="bottom"
            autoplay
          >
            {reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
          </Carousel>
        </Container>
        <Modal
          centered
          className="testimonial__modal"
          visible={visible}
          onCancel={hideModal}
          width={"auto"}
          footer={null}
          closable={false}
        >
          <ReactPlayer url="https://www.youtube.com/watch?v=cLORaUovsc4" />
        </Modal>
      </section>
    </>
  );
};

export default Review;
