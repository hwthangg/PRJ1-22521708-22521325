// src/socket/index.js
import { io } from 'socket.io-client';

const baseURL = 'http://localhost:5000';

export const connectSocket = io(`${baseURL}`, {
  autoConnect:false,
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
});