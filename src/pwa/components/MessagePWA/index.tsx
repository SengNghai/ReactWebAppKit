import { useState } from "react";

export default function MessagePWA() {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = async () => {
    await fetch('http://localhost:5000/sendMessage', {
      method: 'POST',
      body: JSON.stringify({ title, message }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setTitle('');
    setMessage('');
  };


  return (
    <div>
      <h1>MessagePWA</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
}