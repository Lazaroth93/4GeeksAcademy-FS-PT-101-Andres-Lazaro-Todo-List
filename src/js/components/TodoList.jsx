import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const randomId = () => Math.floor(Math.random() * 10000);
const STORAGE_LIST_KEY = 'todo-list-v2';
const STORAGE_DESC_KEY = 'todo-descriptions-v2';

const TodoList = () => {
    const [list, setList] = useState(() => {
        const storedList = JSON.parse(localStorage.getItem(STORAGE_LIST_KEY) || '[]');
        return storedList.length > 0 ? storedList : [{ id: randomId(), label: 'Practice!' }];
    });

    const [descriptions, setDescriptions] = useState(() => {
        return JSON.parse(localStorage.getItem(STORAGE_DESC_KEY) || '{}');
    });

    const [item, setItem] = useState('');
    const [placeholderRandom, setPlaceholderRandom] = useState("An empty list? I don't believe it… 😏");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        localStorage.setItem(STORAGE_DESC_KEY, JSON.stringify(descriptions));
    }, [descriptions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.trim() !== '') {
            const newId = randomId();
            setList([...list, { label: item, id: newId }]);
            setItem('');
        }
    };

    const handleDelete = (id) => {
        setList(list.filter(el => el.id !== id));
        setDescriptions(prev => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const handleEditClick = (id) => {
        setEditingId(id);
        setEditValue(descriptions[id] || '');
    };

    const saveDescription = (id) => {
        setDescriptions(prev => ({ ...prev, [id]: editValue.trim() }));
        setEditingId(null);
        setEditValue('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
    };

    const cambiarInput = () => {
        const frases = [
            "Are you sure you didn’t forget something? Let’s go, you got this!",
            "Add something else to your list... or are you done already?",
            "Procrastination isn’t an option. What’s next?",
            "Your tasks won’t do themselves, what’s on the agenda now?",
            "Alright, genius, what’s left to do?",
            "Do you really have nothing else pending?",
            "Time to conquer the world! Or at least your to-do list.",
            "Be honest... did you forget something?",
            "Add another task... or celebrate if you’re really finished.",
            "Nothing pending today... or is there? 🤔",
            "Time for more wins! Write your next task here.",
            "What now? Be brave, write it down."
        ];
        setPlaceholderRandom(frases[Math.floor(Math.random() * frases.length)]);
    };

    const todayDate = new Date();

    return (
        <div className='todo'>
            <h2 className='date'>Today is: {todayDate.toLocaleDateString('en-US', { weekday: 'long' })}, {todayDate.getDate()}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className='inputTask mt-3 input-group-text bg-body-tertiary'
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder={placeholderRandom}
                    maxLength="45"
                />
                <input
                    onClick={cambiarInput}
                    className="btn btn-success my-2"
                    type="submit"
                    value="Add Task"
                />
            </form>

            <ul className="list-group">
                {list.map((el) => (
                    <li
                        className="tareas list-group-item rounded-2 list-group-item-dark"
                        key={el.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            padding: '8px',
                            minHeight: '50px',
                        }}
                    >
                        {/* Fila principal */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minHeight: '24px',
                        }}>
                            <span className='tareasCreadas'>{el.label}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {/* Fecha en dos líneas */}
                                {/* Fecha en dos líneas */}
                                <div style={{
                                    fontSize: '0.85rem',
                                    opacity: 0.8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}>
                                    <span>{todayDate.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                                    <span>{todayDate.getDate()}/{todayDate.getMonth() + 1}/{todayDate.getFullYear()}</span>
                                </div>

                                <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleEditClick(el.id)}
                                    title="Edit task"
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(el.id)}
                                    title="Delete task"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>

                        {/* Editor de descripción */}
                        {editingId === el.id && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="form-control"
                                    placeholder="Add a description…"
                                />
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => saveDescription(el.id)}>Save</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* Descripción guardada, sin ocupar altura extra */}
                        {descriptions[el.id] && editingId !== el.id && (
                            <div style={{
                                marginTop: '4px',
                                fontSize: '0.9rem',
                                color: '#ccc',
                                display: 'none',
                            }}>
                                {descriptions[el.id]}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <h2 className="tareasPendientes">Pending Tasks: {list.length}</h2>

            <div className='matrix-container mb-5'>
                <h5 className='motivational'>
                    Wake, up Neo.... <br />
                    The Matrix has you...<br />
                    Follow the white rabbit..<br />
                    Knock, knock, Neo
                </h5>
            </div>
        </div>
    );
};

export default TodoList;
