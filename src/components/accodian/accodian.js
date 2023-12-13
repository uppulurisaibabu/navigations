// Accordion.js
import React, { useState, useEffect } from 'react';
import './accodian.css'; // Import custom CSS;
import faqData from '../../faqs/faq';

const Accordion = () => {
  const [faqItems, setFaqItems] = useState([]);



    useEffect(() => {
      // Set FAQ data from imported file
      setFaqItems(faqData.map((item) => ({ ...item, isOpen: false })));
    }, [faqData]);

  const toggleAccordion = (index) => {
    
  //  for(let i=0;i<faqData.length;i++){
  //   if(i==index){
  //     faqData[i].isOpen=!faqData[i].isOpen;
  //   }
    
  //  }
  //  setFaqData(faqData)
  setFaqItems((prevData) => {
    const updatedFaqData = prevData.map((item, i) => {
      if (i === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    return updatedFaqData;
  });
    
  };

  return (
    <div className="accordion">
      {faqItems.map((faqItem, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-button"
            onClick={() => toggleAccordion(index)}
          >
            {faqItem.question} {faqItem.isOpen ? '-' : '+'}
          </button>
          <div className={`accordion-content ${faqItem.isOpen ? 'open' : ''}`}>
            <p>{faqItem.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
