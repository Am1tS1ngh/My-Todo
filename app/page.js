"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [taskStatus, setTaskStatus] = useState(false)
  const [mainTask, setMainTask] = useState([])
  useEffect(()=>{
    const storedTask = JSON.parse(localStorage.getItem('mainTask'));
  if (storedTask) {
   setMainTask((mainTask) => {
    if(mainTask.length === 0){
      return storedTask;
    }
    return mainTask;
   });
   console.log(storedTask);
  }
  console.log(mainTask);
  }, [])

  const submitHandler = (e)=>{
    e.preventDefault();
    setMainTask([...mainTask, {title, desc, taskStatus}])
    setTitle("")
    setDesc("")
  }
  
  const taskStatusHandler = (i) =>{
    let copyTask = [...mainTask]
    copyTask[i].taskStatus = !copyTask[i].taskStatus
    setMainTask(copyTask)
    console.log(copyTask[i]);
  }
  const deleteHandler = (i) =>{
    let copyTask = [...mainTask]
    copyTask.splice(i,1)
    setMainTask(copyTask)
  }
  let renderTask = <h2>No Task Available</h2>

  if(mainTask.length>0){
    renderTask = mainTask.map((t,i)=>{
      return (
      <li key={i}>
        <div className='flex justify-between items-center mb-5'>
        <div className='flex justify-between items-center mx-2 w-3/4'>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-xl font-semibold'>{t.desc}</h6>
        </div>
        <button onClick={()=>{taskStatusHandler(i)}} className='bg-green-600 w-30 m-3 font-bold px-2 py-2 text-white rounded'>{t.taskStatus?"Completed":"Complete task"}</button>
        <button onClick={()=>{deleteHandler(i)}} className='bg-red-600  w-30 font-bold px-2 py-2 text-white rounded'>Remove task</button>
        </div>
      </li>
      );
    })
  }

  useEffect(()=>{
    localStorage.setItem('mainTask', JSON.stringify(mainTask));
    console.log(mainTask, "Added to local storage")
  }, [mainTask])
  return (
    <>
    <h1 className='bg-black text-white p-5 text-2xl font-bold text-center '>Amit's To Do List</h1>
    <form onSubmit={submitHandler}>
      <input id="title" type='text' className='text-2xl border-zinc-800 border-2 p-2 m-5 rounded' placeholder='Add your task here' value={title} onChange={(e)=>{
setTitle(e.target.value)
      }}/>
      <input id="desc" type='text' className='text-2xl border-zinc-800 border-2 p-2 m-5 rounded' placeholder='Add Description' value={desc} onChange={(e)=>{
        setDesc(e.target.value)
      }}/>
      
      <button className='bg-black text-bold text-white rounded px-3 py-2 text-2xl m-5'>Add Task</button>
    </form>
    <hr/>
    <div className='p-8 bg-slate-200'>
      <ul>
        {renderTask}
      </ul>
    </div>    
    </>
  )
}

export default page