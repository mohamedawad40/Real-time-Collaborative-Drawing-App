import API from "../api/axios";

const getPublicRoomList = async () => {
    const data = await API.get('/room/public');
    console.log('data',data);
    if (data) return data.data.rooms; 
}

const joinRoom = async (roomId) => {
    const res = await API.post(`/room/${roomId}/join`);
    console.log('res', res);
    return res.data;
}

const createRoom = async (roomData) => {
    const res = await API.post('/room', roomData);
    console.log('res', res);
    return res.data.data.room;
}

export const roomService = { getPublicRoomList, joinRoom, createRoom };