import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [currentCountAction, setCurrentCountAction] = useState("");
  const [uiDate, setUIDate] = useState(() =>
    getDateCounterTextFormat(new Date())
  );
  const [uiDateObject, setUIDateObject] = useState(() => new Date());
  const [dateTense, setDateTense] = useState("Today is");

  function minusStep() {
    if (step === 1) return;
    setStep((s) => s - 1);
  }

  function plusStep() {
    setStep((s) => s + 1);
  }

  function minusCount() {
    setCount((s) => s - 1);
    setCurrentCountAction("minus");
  }

  function plusCount() {
    setCount((s) => s + 1);
    setCurrentCountAction("plus");
  }

  useEffect(() => {
    if (currentCountAction === "") return;
    updateUIDateObject();
  }, [count]);

  function updateUIDateObject() {
    if (currentCountAction === "plus") {
      uiDateObject.setDate(uiDateObject.getDate() + step);
    } else {
      uiDateObject.setDate(uiDateObject.getDate() - step);
    }
    setUIDateObject(uiDateObject);

    setUIDate(() => getDateCounterTextFormat(uiDateObject));
    updateDateTanse();
  }

  function getDateCounterTextFormat(dateObj) {
    const nDate = dateObj.getDate();
    const nDay = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const nMonth = dateObj.toLocaleDateString("en-US", { month: "long" });
    const nYear = dateObj.getFullYear();

    return `${nDay} ${nMonth} ${nDate} ${nYear}`;
  }

  function updateDateTanse() {
    const msPerDay = 24 * 60 * 60 * 1000;
    const todayDate = new Date();
    const diffDays = daysBetween(todayDate, uiDateObject);

    const utcToday = Date.UTC(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );
    const utcUIDate = Date.UTC(
      uiDateObject.getFullYear(),
      uiDateObject.getMonth(),
      uiDateObject.getDate()
    );

    if (utcToday === utcUIDate) {
      setDateTense("Today is");
    } else if (utcToday < utcUIDate) {
      setDateTense(diffDays + " days after,");
    } else if (utcToday > utcUIDate) {
      setDateTense(diffDays + " days before,");
    }
  }

  function daysBetween(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000;

    // Remove time part (set to midnight)
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    return Math.abs(Math.floor((utc2 - utc1) / msPerDay));
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
      <div className="dcounter_text">
        {dateTense} {uiDate}
      </div>
      {/* Today is Mon June 21 2025 */}
    </div>
  );
}

export default App;
