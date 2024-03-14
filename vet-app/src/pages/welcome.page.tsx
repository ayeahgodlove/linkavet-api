import { HomeBanner } from "components/home-banner/home-banner.component";
import BuyInThreeSteps from "components/buy-in-three-steps/buy-in-three-steps.component";
import Review from "components/review/review.component";
import Subscribe from "components/subscribe/subscribe.component";
import { WhyLinkaVet } from "components/why-honeyman/why-linkavet.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { getConfiguration } from "redux/action/initial.action";
import { Helmet } from "react-helmet-async";
import OurServices from "components/service/service.component";
import VetDoctorsComponent from "components/vet/vet-doctor.component";

const WelcomePage: React.FC = () => {
  useEffect(() => {
    // debugger
    getConfiguration();
  }, []);
  return (
    <GeneralAppShell>
      <Helmet>
        <title>
          Comprehensive Veterinary Services and Premium Vet Products for Your
          Furry Friends and Farms
        </title>
        <meta
          name="description"
          content="Discover top-notch veterinary care and a curated selection of high-quality vet products at Linkavet. Our dedicated team of experienced veterinary doctors is committed to providing exceptional services for your beloved pets. From routine check-ups to specialized treatments, we prioritize the health and happiness of your furry companions and farm. Additionally, explore our online store for a wide range of vet products, including nutrition, grooming essentials, and wellness items. Trust Linkavet for all your veterinary needs – where compassion meets excellence in pet care."
        />
      </Helmet>
      {/* Banner */}
      <HomeBanner />

      <OurServices />

      {/* meet our team */}
      <VetDoctorsComponent />

      {/* startup in 3 steps */}
      <BuyInThreeSteps />

      {/* subscribe */}
      <Subscribe />

      {/* Why */}
      <WhyLinkaVet />
      {/* reviews */}
      <Review />

      {/* product list */}
    </GeneralAppShell>
  );
};

export default WelcomePage;
