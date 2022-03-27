import { useEffect, useState } from "react"

const TodoList=()=>
{
    const [todoValue,setTodoValue]=useState()
    const [TodoData,setTodoData]=useState([])
    const [count,setCount]=useState(1)

 useEffect(()=>{
    loadTodoData()   
 },[])


useEffect(()=>{
    loadTodoData();
    if(count===0)
    {
        setCount(1)
        document.getElementById("prev").style.display="none" 
    }

    if(TodoData.length!==0)
    {
        document.getElementById("next").style.display="block"
        document.getElementById("prev").style.display="block" 
    }

},[count]);



 const loadTodoData=()=>{
     fetch(`http://localhost:3004/todoData?_page=${count}&_limit=3`).then(res=>res.json())
     .then(json=>setTodoData(json))
 }

    const addData=()=>{

        const todoObject={
            title:todoValue
        }

        let todoData=JSON.stringify(todoObject)

        fetch("http://localhost:3004/todoData",{
            method:"POST",
            body:todoData,
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((json)=>console.log(json))
       
        loadTodoData()
    }


    return( <div>
        <input type="text" name="" id=""  value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
        />
        <button onClick={addData}>add</button>
        {
            TodoData.map((item)=>{
                return <div>{item.title}</div>
            })
        }
        <div>
         <button id="prev" onClick={()=>setCount(count-1)}>prev</button>
        <button id="next" onClick={()=>setCount(count+1)}>next</button>
        </div>
       
    </div> 
    )
}

export {TodoList}