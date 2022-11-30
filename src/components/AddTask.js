import { useState } from "react"; //ovo mi je component level state,a ne app state

const AddTask = ({onAdd}) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit=(e) => {
    e.preventDefault()
    //ako ne stavim ovo ucitace mi ponovo celu stranu kad stisnem submit

    if(!text) {
      alert('Please add a task')
      return
    }

    onAdd({text, day, reminder}) 

    setText('')
    setDay('')
    setReminder(false)  //nakon sto kliknem submit,zelim da mi vrati pocetne vrednosti forme

  }
  
  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input 
              type="text" 
              placeholder="Add Task" 
              value={text} 
              onChange={(e)=> { //onChange,cim krenemo da kucamo ukljucujemo ovu funkciju
                setText(e.target.value)  //menja varijablu text u event.value(ono sto trenutno  kucamo)
              }}
              
            />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input 
              type="text" 
              placeholder="Add Day & Time"
              value={day}
              onChange={(e)=>{   
                setDay(e.target.value)  
              }} 
            />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input 
              type="checkbox"
              checked={reminder}
              value={reminder}
              onChange={(e)=>{   
                setReminder(e.currentTarget.checked) 
                //target-ondosi se na element koji je pokrenuo event(dugme)
                //currentTarget-odnosi se na dugme (event listener)
                //.checked odnosi se na checkbox(da li je stiklirana ili nije true/false)
              }} 
            />
        </div>
        <input type="submit" value='Save Task' className="btn btn-block" />
    </form>
  )
}

export default AddTask