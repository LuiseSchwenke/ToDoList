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

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong :(");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log("DELETING ERROR FROM GLOBAL:", error);
      toast.error("Something went wrong");
    }
  }


  useEffect(() => {
    if (isLoaded && user) {
      allTasks();
    }
  }, [isLoaded, user]);

  return (
    <GlobalContext.Provider value={{ theme, tasks, deleteTask, isLoading }}>
      <GlobalContextUpdate.Provider value={setSelectedTheme}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalContextUpdate);
