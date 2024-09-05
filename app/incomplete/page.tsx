"use client";

import React from 'react'
import { useGlobalState } from '../context/GlobalProvider';
import Tasks from '../components/Tasks/Tasks';

function page () {
  const {incompleteTasks} = useGlobalState();

  return <Tasks title='Imcompleted Tasks' tasks={incompleteTasks}/>
}

export default page