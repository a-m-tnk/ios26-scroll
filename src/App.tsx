import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import scrollLock from 'scroll-lock';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    scrollLock.disablePageScroll();
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
      </header>
      <div className="App-body">
        <div className="scrollable-content">
          {/* Adding a lot of content to make it scrollable */}
          {[...Array(50)].map((_, i) => (
            <div key={i} className="content-item">
              <h3>Content Item {i + 1}</h3>
              <p>
                This is some sample content to demonstrate scrolling. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore 
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Full Screen Modal <input type='text'></input></h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-scrollable-content">
                {/* Adding scrollable content inside the modal */}
                {[...Array(100)].map((_, i) => (
                  <div key={i} className="modal-content-item">
                    <h3>Modal Content Item {i + 1}</h3>
                    <p>
                      This is content inside the modal. This area also has its own scrolling behavior. 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
