import React from 'react';
import {useState, useEffect} from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';


function App() {
  const[showAddTask, setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
    const getTasks=  async () => {
     const tasksFromServer = await fetchTasks() //ovo ce nam vratiti data iz fetch tasks.Mozda ce mi jos negde trebati fetchTasks zato sam ga u app definisao
     setTasks(tasksFromServer) // u useEfects stavljamo funkcije iz useStates
    }

     getTasks()
  },[])

  //Fetch Tasks
  const fetchTasks= async()=>{
    const respons =await fetch('http://localhost:5000/tasks')  //ovako izvlacim niz  sa servera
    const data = await respons.json()   //ovako menjam json syntax u niz
    
    return data
  }

    //Fetch Task
    const fetchTask= async(id)=>{
      const respons =await fetch(`http://localhost:5000/tasks/${id}`)  
      const data = await respons.json()   
  
      return data
    }

  // Delete Task
  const deleteTask=async (id)=>{ 
  //ova funkcija ce biti na vise dugmeta,zato nam treba argument (id),koji se odnosi na komponenti koju smo kliknuli(onClick)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })  //sa ovim brisemo odabrani task iz niza sa servera

  setTasks(tasks.filter( (task)=>task.id !== id
  //koristimo useEfect jer uticemo na tasks u odgovarajucoj komponenti
    ))
  }

  //Toggle Reminder
  const toggleReminder= async (id) => {
const taskToToggle = await fetchTask(id)
const upTask = {...taskToToggle, reminder:!taskToToggle.reminder}

const res=await fetch(`http://localhost:5000/tasks/${id}`,{
  method:'PUT',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(upTask)
})

const data= await res.json()

    setTasks(tasks.map((task)=>task.id===id ? {...task, reminder:data.reminder} : task))
  }

  //addTask
  const addTask= async (task) => {
    const res= await fetch ('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data=await res.json()
    setTasks([...tasks,data])


    // const id=Math.floor(Math.random() *10000) + 1
    // const newTask={id,...task}
    // setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/pop'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask}/>}     {/* &&  je skraceno od if showTask is true then return..else nothing */}
                {tasks.length > 0 ?
                  (<Tasks 
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}/>) : ("No Tasks to show")} 
              </>
            }
          />       
         
                  <Route path='/' element={<About />}  />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// 1:26:47 nakon pravljenja json servera na local host (5000) pocinjem sa useEffect

//Kad zavrsim pravljenje stranice
//BUILD FOLDER: u konzoli: 
  //npm run build
  //npm i -g serve     g je za globalu,ovako cu da instaliram static serve
 //serve -s build -p 8000
 //sada u chrome mogu da vidim da reactDevelop tool pokazuje da smo u production site(HTTP server)
 //isto mogu da prekinem server sa ctrl+c i ako opet zelim da se povezem serve -s build...
 
 
//JSON SERVER - u konzoli:
  //npm i json-server
//u package.json ukucam novu script :
  //"server":"json-server --watch db.json --port 5000"
  //sada kad mi poveze stranicu umesto 3000 kucam 5000/tasks(jer mi se tako zove objekat)
  //prebacio sam tasks u db.json i promenio ih u json syntax (stavio duple navodnike na values i strings)


//REACT ROUTER DOM  u konzoli:
  // npm i react-router-dom