import AppFaq from "components/faq/faq.component";
import PageContent from "components/shared/page-content";
import React from "react";
import { Helmet } from "react-helmet-async";

const FaqsPage = () => {
  return (
    <>
      <Helmet>
        <title>Explore Premium FAQs - Find answers to the questions</title>
        <meta name="description" content="Find answers to the questions" />
      </Helmet>

      <PageContent
        title={"Frequently Ask Questions"}
        breadcrumb={[
          {
            title: "FAQs",
          },
        ]}
      />
      <AppFaq />
    </>
  );
};

export default FaqsPage;
