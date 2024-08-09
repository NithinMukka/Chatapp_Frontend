import React, { useState, useEffect } from 'react';
import '../src/index.css';
import imagee from '../src/image.png';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(getTimeWithAMPM());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(getTimeWithAMPM());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  function getTimeWithAMPM() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesFormatted = minutes.toString().padStart(2, '0');
    return `${hours}:${minutesFormatted} ${ampm}`;
  }

  const [messages, setMessages] = useState([
    { type: 'received', text: 'This is a received message.', time: currentTime },
    { type: 'sent', text: 'This is a sent message', time: currentTime },
  ]);

  const detectkey = (e) => {
    if (e.key === 'Enter') {
      sendButton();
    }
  };

  function sendButton() {
    let messageInput = document.getElementById('messageInput');
    let messageText = messageInput.value.trim();
    if (messageText !== "") {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'sent', text: messageText, time: getTimeWithAMPM() }
      ]);
      messageInput.value = "";
    }
  }

  return (
    <div className='container'>
      <aside style={{ background: "red" }}></aside>
      <main>
        <div id="regno">
          <h1 style={{fontSize:"50px"}}>22BCE1456</h1>
        </div>
        <div id="messages">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className={message.type}>{message.text}</div>
              <div className={`${message.type === 'sent' ? 'send' : 'receive'} time`}>{message.time}</div>
            </React.Fragment>
          ))}
        </div>
        <div id="input">
          <input type="text" id="messageInput" placeholder="Type your message..." onKeyDown={detectkey} />
          <img src={imagee} alt="Send" id="sendBtn" onClick={sendButton} />
        </div>
      </main>
    </div>
  );
};

export default Index;