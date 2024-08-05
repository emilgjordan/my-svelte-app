import { writable } from 'svelte/store';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/chat', {
	auth: {
		token: `Bearer ${accessToken}`
	}
});

const socketStore = writable(socket);

socket.on('connect', () => {
	console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
	console.log('Disconnected from WebSocket server');
});

socket.on('message', (message) => {
	console.log('Received message:', message);
	// Handle incoming messages here
});

export default socketStore;
