import AppFaq from "components/faq/faq.component";
import React from "react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    key: "1",
    question: "How can I find out about upcoming discounts on LinkaVet.com?",
    answer:
      "Stay updated with our latest discounts by subscribing to our newsletter and following us on social media. We regularly post information about sales, special offers, and exclusive discounts for our community.",
  },
  {
    key: "2",
    question: "How do I add items to my Wish List?",
    answer: `You can add items to your Wish List by clicking the "Add to Wish List" button found on every product page. This feature helps you save and track products you're interested in`,
  },
  {
    key: "3",
    question:
      "What steps do I need to follow to make a purchase on LinkaVet.com?",
    answer: (
      <>
        To buy on LinkaVet.com, simply:
        <ol>
          <li>
            Browse our product categories or use the search bar to find what you
            need.{" "}
          </li>
          <li>Add the desired products to your cart.</li>
          <li>
            Proceed to checkout, enter your shipping information, and choose
            your payment method.
          </li>
          <li>
            Review your order and click on "Place Order" to complete your
            purchase.
          </li>
        </ol>
      </>
    ),
  },
  {
    key: "4",
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the Orders section.",
  },
  {
    key: "5",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all items. Products must be returned unused and in their original packaging.",
  },
  {
    key: "6",
    question: "Do you provide international shipping?",
    answer:
      "Yes, we provide international shipping. Shipping costs will vary based on your location and will be calculated at checkout.",
  },
  // Add more FAQs as needed
];

const FaqsPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Explore Premium FAQs - Find answers to the questions
        </title>
        <meta
          name="description"
          content="Find answers to the questions"
        />
      </Helmet>
      <AppFaq />
    </>
  );
};

export default FaqsPage;
