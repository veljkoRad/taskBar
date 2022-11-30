import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {
   

  return (   //ovo je prikaz liste( .map) koja nam izbacuje kompente(Task)
    <> 
       {tasks.map((task)=>(
        <Task 
          key={task.id}
          task={task} 
          onDelete={onDelete}
          onToggle={onToggle} />
       ))} 
    </>
  )
}

export default Tasks