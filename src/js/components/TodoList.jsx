import React, { useState, useEffect } from 'react';

// Helper function to generate random IDs
const randomId = () => Math.floor(Math.random() * 10000);

// Main component
const TodoList = () => {
    const [list, setList] = useState([]);
    const [item, setItem] = useState('');
    const [placeholderRandom, setPlaceholderRandom] = useState("An empty list? I don't believe it… 😏")



    useEffect(() => {
        if (list.length === 0) {
            setList([{ id: randomId(), label: 'Practice!    ' }]);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.trim() !== '') {
            setList([...list, { label: item, id: randomId() }]);
            setItem('');
        }
    };

    const handleDelete = (id) => {
        const aux = list.filter((el) => el.id !== id);
        setList(aux);
    };

    const todayDate = `${new Date().toLocaleDateString('en-US', { weekday: 'long' })}, ${new Date().getDate()}`

    const cosasRandom = (arra) => Math.floor(Math.random()* arra.length)


    const cambiarInput = () => {
        const arrayInput =
            [                 
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
                    "Productivity is calling, what’s next on the list?",
                    "Are you serious or just pretending to work?",
                    "Your list is hungry for more tasks!",
                    "Is it the end of tasks? Or the start of an excuse?",
                    "Let’s go for more wins! Write your next task here.",
                    "What now? Be brave, write it down.",
                    "Empty list? Miracle or oversight?",
                    "Each completed task is one step closer to glory.",
                    "Write something down, c’mon, good ideas don’t bite."
                
            ]

            const cambiarMensajeInput = arrayInput[cosasRandom(arrayInput)];
            setPlaceholderRandom(prev=> prev=cambiarMensajeInput)
    }


   

    

    return (

        <div container className='todo'>

            <h2 className='date'>Today is: {todayDate}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className='inputTask mt-3 input-group-text bg-body-tertiary'
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder={   placeholderRandom}
                    maxLength="50"

                />
                <input onClick={cambiarInput}  className="btn btn-success my-2" type="submit" value="Add Task" />
            </form>

            <ul className=" list-group ">
                {list.map((el) => (
                    <li className=" tareas list-group-item rounded-2 list-group-item-dark " key={el.id}>
                        <span className='tareasCreadas'>
                            {el.label}
                        </span>

                        <span style={{ marginLeft: '10px' }}> {/* Esto agrega espacio sin salto de línea */}
                            {todayDate}
                        </span>

                        <span
                            onClick={() => handleDelete(el.id)}
                            style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>
                            <span class="delete fa-solid fa-delete-left"></span>


                        </span>
                    </li>
                ))}
            </ul>
            <h2 className="tareasPendientes ">Pending Tasks: {list.length}</h2>

           <div className='matrix-container mb-5'>
             <h5 className='motivational'>
                Wake, up Neo.... <br></br>
              The Matrix has you...<br></br>
              Follow the white rabbit..<br></br>
              Knock, knock, Neo</h5>
              {/* Quiza los br que he utilizado para el salto de linea no es lo mas apropiado,
                  ya que si añado solo la etiqueta de apertura me da error,
                  me gustaria recibir de parte del orcaulo ^^ feedback por este lado de como se podria realizar con mejores practicas  */}
           </div>

        </div>



    );
};

export default TodoList;