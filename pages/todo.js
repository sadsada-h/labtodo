import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Todo = ({ avatar_url, login }) => {

    const [tasks, setTasks] = useState([])
    // { id: 1, name: 'Do homework' }
    // { id: 2, name: 'Read book' }])

    const [name, setName] = useState('')

    const [idEdit, setIdEdit] = useState(0)

    useEffect(async () => {
        let ts = await getTasks();
        console.log(ts)
        setTasks(ts)
    }, [])


    const renderTasks = () => {
        if (tasks && tasks.length)
            return tasks.map((task, index) => (
                <li key={index} className="relative m-4 border-2 border-dashed p-8">
                    <div className="absolute bottom-0 right-0 text-xl mr-2 text-indigo-500">

                    </div>
                    {task.id})
                    {(idEdit !== task.id) ?
                        <div className="text-3xl text-indigo-800 drop-shadow-lg drop-shadow-lg max-w-xs">{task.name}</div> :
                        (<input
                            className="text-3xl text-indigo-800"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />)
                    }
                    <div className="absolute bottom-0 right-0 text-xl mr-2 text-indigo-500">
                        <button
                            className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg" onClick={() => deleteTask(task.id)}>Delete</button>
                        <button className="p-2 bg-pink-500 hover:text-indigo-500 rounded-lg drop-shadow-lg" onClick={() => editTask(task.id)}>Edit</button>
                    </div>
                </li>))
    }

    const editTask = (id) => {
        setIdEdit(id)
        let t = tasks.find((task) => +task.id === +id)
        setName(t.name)
        if (+idEdit === +id) { //Press Edit again
            let newTasks = tasks.map((task, index) => {
                if (+task.id === +id)
                    tasks[index].name = name
                return task
            })
            setTasks(newTasks)
            setIdEdit(0)
        }
    }

    const deleteTask = (id) => {
        console.log('delete id: ', id)
        let newTasks = tasks.filter((task) => task.id !== +id)
        setTasks(newTasks)
    }

    const addTask = (name) => {
        setTasks([...tasks, { id: tasks[tasks.length - 1].id + 1, name }])
        console.log(tasks)
    }

    return (
        <div className="h-screen bg-blue-300 border-2 flex flex-col items-center">
            <div className="m-8 text-indigo-800 text-4xl drop-shadow-lg">
                <Link href="/"><a>Home</a></Link>
            </div>
            <h1 className="m-8 text-indigo-800 text-4xl drop-shadow-lg">

                <img src={avatar_url} className="m-6 drop-shadow-lg w-20 border-2 " />
                <span>{login} </span>

            </h1>

            <div className="flex w-2/3 justify-center mb-8">
                <input
                    className="w-1/3 rounded-lg pl-2 ml-2 mr-4" type="text" name="task" onChange={e => setName(e.target.value)}
                />
                <button className="bg-indigo-600 text-indigo-200 hover:text-indigo-500 p-2 rounded-lg" onClick={addTask}>Add</button>
            </div>
            <ul className="flex flex-wrap mb-8">
                {renderTasks()}
            </ul>
        </div>
    )
}

const getTasks = async () => {
    const res = await fetch('http://localhost:8000/')
    const json = await res.json()
    console.log(json)
    return json;
}

Todo.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.github.com/users/sadsada-h')
    const json = await res.json()
    return { login: json.login, avatar_url: json.avatar_url }
}

export default Todo;
