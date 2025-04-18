import React, { useState } from 'react';
import styles from './message.module.css';
import SidebarChat from '../../../components/SidebarChat/SidebarChat';
import Chat from '../../../components/Chat/Chat';
import avatar1 from '../../../assets/avatar.jpg';
import avatar2 from '../../../assets/avatar_icon.png';
import Search from '../../../components/Search/Search'; // Import the Search component

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
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
  };

  const selectedChat = mockConversations.find((chat) => chat.id === selectedChatId);

  // Filter conversations based on the search query
  const filteredConversations = mockConversations.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {/* Render the Search component */}
        <div className={styles.searchWrapper}>
  <Search query={searchQuery} onSearchChange={setSearchQuery} />
</div>


        {/* Render the filtered conversations */}
        {filteredConversations.map((chat) => (
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
