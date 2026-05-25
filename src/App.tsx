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
    <div className="App">
      <header className="App-header">
        <button className="open-modal-button" onClick={openModal}>
          Open Modal
        </button>

        <MobileInputLocation opened={isModalOpen} setOpened={setIsModalOpen} />
      </header>
      <div className="App-body">
        <div className="scrollable-content">
          {/* Adding a lot of content to make it scrollable */}
          {[...Array(50)].map((_, i) => (
            <div key={i} className="content-item">
              <h3>Content Item {i + 1}</h3>
              <p>
                This is some sample content to demonstrate scrolling. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
