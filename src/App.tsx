import React, { useState } from "react";
import "./App.css";
import { Modal } from "@tui-react/modal";
import { MobileInputLocation } from "./MobileInputLocation";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="application">
      <div className="Layout">
        <header className="header">
          <h1>React App v1</h1>
        </header>
        <div className="Page">
          <div className="pageComponentBase">
              <div className="content-item">
                <h3>Пельмени со скидкой 10%</h3>
                <p>
                  This is some sample content to demonstrate scrolling. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
            <div className="content-item">
              <h3>Content Item 0</h3>
              <p>
                <MobileInputLocation
                  opened={isModalOpen}
                  setOpened={setIsModalOpen}
                />
              </p>
            </div>
            {/* Adding a lot of content to make it scrollable */}
            {[...Array(50)].map((_, i) => (
              <div key={i} className="content-item">
                <h3>Content Item {i + 1}</h3>
                <p>
                  This is some sample content to demonstrate scrolling. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
