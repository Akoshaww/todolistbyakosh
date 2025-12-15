
import './App.css'
import { useState , useEffect} from 'react'

function App() {
  
  const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
        });

  const [input,setInput] = useState("")
  
  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]); 

  function addTask(){
    if(input.trim())
    setTodos([...todos,{id:Date.now(),done:false,text:input}])
    setInput("")
  }
  return (
    <div className=' p-5 w-87.5 md:w-150 overflow-x-hidden text-center sm:text-left bg-linear-to-br overflow-y-auto shadow-2xl  shadow-black from-gray-400 via-gray-600 to-gray-300 rounded-4xl flex gap-2 flex-col'>
      
          <h1 className=' flex font-bold text-3xl mt-4'>To-do list app </h1>
          <p className='text-[8px] text-gray-800'>Made by akosh/Herobrine;)</p>
      
      
      <div className="flex items-center justify-between m-2.5 flex-col sm:flex-row gap-3">
            <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Write your tasks" className="py-4 px-4 rounded-4xl text-[18px] text-black outline-none  border-y-2 border-slate-400 "/>
            <button onClick={addTask} className="py-4.5 px-20 rounded-4xl text-[16px]  cursor-pointer border-none outline-none backdrop-blur-[10px] bg-linear-to-r from-gray-200 via-sky-50 to-gray-400 transition-transform duration-200 hover:scale-110"> Add+</button>
       
      </div>
      <ul className='space-y-2 flex-1 overflow-y-auto overflow-x-hidden'>
        {todos.map((todo)=>(
          <li
          key={todo.id}
          className='flex items-center justify-between py-2'>
            <input type="checkbox" checked={todo.done} 
            onChange={()=>{setTodos(
              todos.map((t)=>(
                t.id === todo.id ? {...t,done:!t.done} : t
            ))
            )
            }} 
            className=' bg-blue-500 text-black h-5 w-5'/>
            <span className={`text-2xl ${todo.done ? "line-through text-white" : "text-black font-bold"}`} > {todo.text}</span>
            <button onClick={()=>setTodos(todos.filter((t)=>t.id !==todo.id))} className='p-2 cursor-pointer border-none outline-none 
            backdrop-blur-[10px] bg-linear-to-r from-gray-200 rounded-4xl 
             via-sky-50 to-gray-400 transition-transform duration-200 hover:scale-110'>❌</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
