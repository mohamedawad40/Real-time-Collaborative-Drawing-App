import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Arrow, Rect, Circle } from 'react-konva';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useSelector } from 'react-redux';

export default function RoomDetail() {
    const socket = useSocket();
    const { id: roomId } = useParams();
    const { user } = useSelector(state => state.auth);

    const [strokes, setStrokes] = useState([]);
    const [tool, setTool] = useState('line'); // 'line' | 'arrow' | 'rect' | 'circle'
    const isDrawing = useRef(false);

    useEffect(() => {
        if (!socket) return;
        socket.emit('join-room', roomId, user._id);

        socket.on('drawing', ({ stroke }) => {
            setStrokes(prev => [...prev, stroke]);
        });
        return () => socket.off('drawing');
    }, [socket, roomId, user._id]);

    const handleMouseDown = e => {
        isDrawing.current = true;
        const { x, y } = e.target.getStage().getPointerPosition();
        const newStroke = { type: tool, color: 'black', strokeWidth: 2 };

        if (tool === 'line') {
            newStroke.points = [x, y];
        } else if (tool === 'arrow') {
            newStroke.points = [x, y, x, y];
        } else if (tool === 'rect') {
            newStroke.x = x; newStroke.y = y;
            newStroke.width = 0; newStroke.height = 0;
        } else if (tool === 'circle') {
            newStroke.x = x; newStroke.y = y;
            newStroke.radius = 0;
        }

        setStrokes(prev => [...prev, newStroke]);
    };

    const handleMouseMove = e => {
        if (!isDrawing.current) return;
        const { x, y } = e.target.getStage().getPointerPosition();

        setStrokes(prev => {
            const last = prev[prev.length - 1];
            if (!last) return prev;

            switch (last.type) {
                case 'line':
                last.points = last.points.concat([x, y]);
                // live‐emit lines
                socket.emit('drawing', { roomId, stroke: last });
                break;
                case 'arrow': {
                    const [sx, sy] = last.points;
                    last.points = [sx, sy, x, y];
                    break;
                }
                case 'rect':
                    last.width = x - last.x;
                    last.height = y - last.y;
                    break;
                case 'circle': {
                    const dx = x - last.x, dy = y - last.y;
                    last.radius = Math.sqrt(dx * dx + dy * dy);
                    break;
                }
            }
            // only re‐render locally for non‐lines
            return [...prev.slice(0, -1), last];
        });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        // broadcast final arrow/rect/circle once
        const last = strokes[strokes.length - 1];
        if (last && last.type !== 'line') {
            socket.emit('drawing', { roomId, stroke: last });
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, padding: 8, background: '#eee', borderBottom: '1px solid #ccc' }}>
                {['line','arrow','rect','circle'].map(t => (
                    <button
                        key={t}
                        onClick={() => setTool(t)}
                        style={{ fontWeight: tool === t ? 'bold' : 'normal' }}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 48}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ cursor: 'crosshair' }}
            >
                <Layer>
                {strokes.map((s, i) => {
                    switch (s.type) {
                        case 'line':
                            return (
                            <Line
                                key={i}
                                points={s.points}
                                stroke={s.color}
                                strokeWidth={s.strokeWidth}
                                tension={0.5}
                                lineCap="round"
                            />
                            );
                        case 'arrow':
                            return (
                            <Arrow
                                key={i}
                                points={s.points}
                                stroke={s.color}
                                strokeWidth={s.strokeWidth}
                                pointerLength={10}
                                pointerWidth={10}
                            />
                            );
                        case 'rect':
                            return (
                            <Rect
                                key={i}
                                x={s.x}
                                y={s.y}
                                width={s.width}
                                height={s.height}
                                stroke={s.color}
                                strokeWidth={s.strokeWidth}
                            />
                            );
                        case 'circle':
                            return (
                            <Circle
                                key={i}
                                x={s.x}
                                y={s.y}
                                radius={s.radius}
                                stroke={s.color}
                                strokeWidth={s.strokeWidth}
                            />
                            );
                        default:
                            return null;
                    }
                })}
                </Layer>
            </Stage>
        </div>
    );
}
