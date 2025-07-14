import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomAction } from "../features/roomSlice";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
    const { rooms } = useSelector(state => state.room);
    const [form, setForm] = useState({ name: '', roomType: 'public' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJoinRoom = async (roomId) => {
        await dispatch(roomAction.joinRoom(roomId));
        navigate(`/room/${roomId}/join`);
    }

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(roomAction.createRoom(form)).unwrap().then(() => setForm({ name: '', roomType: 'public' }));
    };

    useEffect(() => {
        dispatch(roomAction.fetchRooms());
        // return () => dispatch(roomAction.resetRooms());
    }, [dispatch]);

    const renderRoomList = rooms.map((room) => {
        return (
            <li key={room._id} className="flex justify-between items-center border p-3 rounded">
            <span className="font-medium">{room.name}</span>
            <button
                onClick={() => handleJoinRoom(room._id)}
                className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
                Join
            </button>
        </li>
        )
    })

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">
            <section className="border p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Create a Room</h2>
                <form onSubmit={handleCreate} className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="flex-1">
                    <label className="block text-sm">Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-sm">Type</label>
                    <select
                        value={form.roomType}
                        onChange={e => setForm(f => ({ ...f, roomType: e.target.value }))}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    </div>
                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Create
                    </button>
                </form>
            </section>
            <h1 className="text-xl font-bold mb-2">Public Rooms</h1>
            <ul className="space-y-2">{renderRoomList}</ul>
        </div>
    )
}


export default Rooms;