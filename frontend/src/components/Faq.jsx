import React, { useState } from "react";
import "../assets/css/Faq.css";
import { LuPlus, LuMinus } from "react-icons/lu";
const Faq = () => {
  const faqData = [
    {
      question: "What service we provide?",
      answer:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.",
    },
    {
      question: "How does useState work?",
      answer:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.",
    },
    {
      question: "What is JSX?",
      answer:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.",
    },
  ];

  // Set up a state to track which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function to open or close the FAQ item
  const toggleFAQ = (index) => {
    // Set the index of the open FAQ item or close it if it’s already open
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="faq">
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{item.question}</span>
            {/* Toggle + or - based on whether the item is open */}
            <div className="faq-toggle">
              {openIndex === index ? <LuMinus /> : <LuPlus />}
            </div>
          </div>
          {/* Conditionally render the answer if the item is open */}
          <div
            className={`faq-answer-wrapper ${
              openIndex === index ? "open" : ""
            }`}
          >
            <div className="faq-answer">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Faq;
