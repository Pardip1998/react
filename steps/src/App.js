import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  function handledlePrevious() {
    if (step === 1) return;
    setStep((s) => s - 1);
  }

  function handledleNext() {
    if (step === messages.length) return;
    setStep((s) => s + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((io) => !io)}>
        &times;
      </button>
      <div hidden={isOpen} className="steps">
        <div className="content-wrapper">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step: {step} {messages[step - 1]}
          </p>
        </div>

        <div className="buttons">
          <button
            onClick={handledlePrevious}
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            Previous
          </button>
          <button
            onClick={handledleNext}
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
