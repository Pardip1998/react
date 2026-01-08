import { useState } from "react";

import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(step);
  const [count, setCount] = useState(2);
  const [dateCounterText, setDateCounterText] = useState(
    "Today is, " + getDateCounterTextFormat()
  );
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [totalStep, setTotalStep] = useState(0);

  function minusStep() {
    if (step === 1) return;
    setStep((s) => {
      setCurrentStep(s - 1);
      return s - 1;
    });
  }

  function plusStep() {
    setStep((s) => {
      setCurrentStep(s + 1);
      return s + 1;
    });
  }

  function minusCount() {
    setCount((c) => c - 1);
    setTotalStep((ts) => ts - step);
    updateDateText("minus");
  }

  function plusCount() {
    setCount((c) => c + 1);
    setTotalStep((ts) => ts + step);

    updateDateText("plus");
  }

  function getDateCounterTextFormat(dateObj = new Date()) {
    const nDate = dateObj.getDate();
    const nDay = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const nMonth = dateObj.toLocaleDateString("en-US", { month: "long" });
    const nYear = dateObj.getFullYear();

    return `${nDay} ${nMonth} ${nDate} ${nYear}`;
  }

  function updateDateText(sign) {
    const currentStepValue = sign === "minus" ? -currentStep : currentStep;

    const todayDate = selectedDate || new Date();
    const newDate = new Date(selectedDate.getTime()) || new Date();
    newDate.setDate(newDate.getDate() + currentStepValue);
    setSelectedDate(newDate);

    console.log(todayDate === newDate);

    let text = "";

    // Present - Past - Future
    if (todayDate.getDate() === newDate.getDate()) {
      text += "Today is, ";
    } else if (todayDate.getDate() > newDate.getDate()) {
      text += `${Math.abs(totalStep)} days ago, `;
    } else if (todayDate.getDate() < newDate.getDate()) {
      text += `${Math.abs(totalStep)} days after, `;
    }

    text += getDateCounterTextFormat(newDate);

    setDateCounterText(text);
  }

  return (
    <div className="dcounter_sec">
      <div className="dcounter_steps">
        <button onClick={minusStep}>-</button>
        Step: {step}
        <button onClick={plusStep}>+</button>
      </div>
      <div className="dcounter_count">
        <button onClick={minusCount}>-</button>
        Count: {count}
        <button onClick={plusCount}>+</button>
      </div>
      <div className="dcounter_text">{dateCounterText}</div>
      {/* Today is Mon June 21 2025 */}
    </div>
  );
}

export default App;
