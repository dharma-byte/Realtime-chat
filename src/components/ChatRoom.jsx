import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Email → Display Name mapping
const USERNAME_MAP = {
  'puttadharmateja6@gmail.com': 'dharma',
  'shannon@gmail.com': 'shannon',
  'jayesh@gmail.com': 'jayesh'
};

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = auth.currentUser;

  // Load chat messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  // Send a message
  const handleSendMessage = async () => {
    if (!user) {
      alert("Please log in to send a message.");
      return;
    }

    if (message.trim() === '') return;

    const userEmail = user.email;
    const displayName = USERNAME_MAP[userEmail] || user.displayName || 'Anonymous';

    await addDoc(collection(db, 'messages'), {
      text: message,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: displayName
    });

    setMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>

      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.displayName}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
