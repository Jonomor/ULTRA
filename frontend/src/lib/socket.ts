import { io } from 'socket.io-client';

const socket = io(
  import.meta.env.PROD
    ? "https://your-production-server.com"  // Replace with real backend
    : "http://localhost:4000"
);

export default socket;