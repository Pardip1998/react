import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PizzaData from "./data.js";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Pizza(props) {
  return (
    <li className={`pizza ${props.data.soldOut ? "sold-out" : ""}`}>
      <img src={props.data.photoName} alt="" />
      <div>
        <h3>{props.data.name}</h3>
        <p>{props.data.ingredients}</p>
        <span>{props.data.price}</span>
      </div>
    </li>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  console.log(PizzaData);

  return (
    <main className="menu">
      <h2>Our menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>
      {!!PizzaData.length && (
        <ul className="pizzas">
          {PizzaData.map((pizza, i) => {
            return <Pizza data={pizza} key={i} />;
          })}
        </ul>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closedHour = 22;
  const isOpen = hour >= openHour && hour <= closedHour;

  return (
    <footer className="footer">
      {isOpen && (
        <div className="order">
          <p>
            We're open until {closedHour}:00. Come visit us or order online.
          </p>
          <button className="btn">Order</button>
        </div>
      )}
    </footer>
  );
}

const rootEl = document.getElementById("root");
const reactTRoot = ReactDOM.createRoot(rootEl);
reactTRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
