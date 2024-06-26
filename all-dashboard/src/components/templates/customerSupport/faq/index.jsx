import React, { useState } from "react";

const faqs = [
  {
    title: "Calendar Issues",
    qnas: [
      {
        question: `How can i change the price for the seasonal timings?`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
      {
        question: `When can i get refund if the guest cancelled the bookings??`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
    ],
  },
  {
    title: "Payment Issues",
    qnas: [
      {
        question: `When can i get refund if the guest cancelled the bookings?`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
      {
        question: `When can i get refund if the guest cancelled the bookings?`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
    ],
  },
  {
    title: "Other Issues",
    qnas: [
      {
        question: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
      {
        question: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type `,
      },
    ],
  },
];

function Faq() {
  const [expand, setExpand] = useState(false);
  return (
    <>
      {faqs.slice(0, expand ? faqs.length : 2).map((faq) => (
        <div className="flex py-4 border-b border-b-[#D9D9D9]">
          <div className="w-1/3 text-2xl font-medium">
            <span>{faq.title}</span>
          </div>
          <div className="flex flex-col gap-8 w-2/3">
            {faq.qnas.map((qna) => (
              <div className="flex flex-col gap-6">
                <p className="text-lg font-medium">{qna.question}</p>
                <p>{qna.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-10">
        {expand ? (
          <span
            className="text-base underline font-medium cursor-pointer"
            onClick={() => setExpand(false)}
          >
            Show Less
          </span>
        ) : (
          <span
            className="text-base underline font-medium cursor-pointer"
            onClick={() => setExpand(true)}
          >
            Show More
          </span>
        )}
      </div>
    </>
  );
}

export default Faq;
