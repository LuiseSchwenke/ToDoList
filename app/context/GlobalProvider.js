"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalContextUpdate = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);
  const { user, isLoaded } = useUser();
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapsedMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong :(");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log("DELETING ERROR FROM GLOBAL:", error);
      toast.error("Something went wrong");
    }
  }

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Task updated")
      allTasks();
    } catch (error) {
      console.log("ERROR UPDATING: ",error);
      toast.error("Something went wrong");
    }
  }

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);


  useEffect(() => {
    if (isLoaded && user) {
      allTasks();
    }
  }, [isLoaded, user]);

  return (
    <GlobalContext.Provider value={{ 
      theme, 
      tasks, 
      deleteTask, 
      isLoading, 
      completedTasks,
      importantTasks, 
      incompleteTasks,
      updateTask,
      modal,
      openModal,
      closeModal, 
      allTasks,
      collapsed,
      collapsedMenu,
      }}>
      <GlobalContextUpdate.Provider value={setSelectedTheme}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalContextUpdate);
