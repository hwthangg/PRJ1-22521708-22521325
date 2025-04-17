import React, { useState } from 'react';
import styles from './message.module.css';
import SidebarChat from '../../../components/SidebarChat/SidebarChat';
import Chat from '../../../components/Chat/Chat';
import avatar1 from '../../../assets/avatar.jpg';
import avatar2 from '../../../assets/avatar_icon.png';


const mockConversations = [
  {
    id: 1,
    name: 'Chi đoàn KP A',
    message: 'Bạn cho mình hỏi thông tin liên hệ của chú A được không?',
    avatar: avatar1,
  },
  {
    id: 2,
    name: 'Chi đoàn KP  B',
    message: 'Bạn cho mình hỏi thông tin liên hệ của chú A được không?',
    avatar: avatar2,
  },
  {
    id: 3,
    name: 'Chi đoàn KP C',
    message: 'Đây là thông tin liên hệ của mình, Zalo: 0123456789',
    avatar: avatar1,
  },
];

function Message() {
  const [selectedChatId, setSelectedChatId] = useState(mockConversations[0].id);

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
  };

  const selectedChat = mockConversations.find((chat) => chat.id === selectedChatId);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {mockConversations.map((chat) => (
          <SidebarChat
            key={chat.id}
            name={chat.name}
            message={chat.message}
            avatar={chat.avatar}
            isActive={chat.id === selectedChatId}
            onClick={() => handleSelectChat(chat.id)}
          />
        ))}
      </div>
      <div className={styles.chat}>
        <Chat chat={selectedChat} />
      </div>
    </div>
  );
}

export default Message;
