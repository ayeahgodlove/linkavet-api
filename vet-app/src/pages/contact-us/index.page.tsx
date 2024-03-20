import { ContactForm } from "components/contact/contact.component";
import React from "react";
import { Helmet } from "react-helmet-async";

const ContactUsPage = () => {

  return (
    <>
      <Helmet>
        <title>Connect with Linkavet - Your Pet's Wellbeing Starts Here</title>
        <meta
          name="description"
          content="Have a question, need assistance, or simply want to reach out? We're here for you at Linkavet. Contact our friendly team of veterinary experts to discuss your pet's needs, inquire about our products, or schedule an appointment. Your pet's wellbeing is our priority, and we're dedicated to providing prompt and personalized support. Reach out via phone, email, or through our convenient online form. Connect with Linkavet – where every interaction is a step towards ensuring a happy and healthy life for your furry friends."
        />
      </Helmet>
      <ContactForm />
    </>
  );
};

export default ContactUsPage;
