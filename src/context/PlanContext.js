"use client";
import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [planItems, setPlanItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("today");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToastNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const addToPlan = (workout) => {
    if (planItems.some((item) => item.id === workout.id)) {
      showToastNotification("Already added to today's plan!", "alert");
    } else {
      setPlanItems([...planItems, workout]);
      showToastNotification("Successfully added to today's plan!", "success");
    }
  };

  const addToSaved = (workout) => {
    if (savedItems.some((item) => item.id === workout.id)) {
      showToastNotification("Already saved for later!", "alert");
    } else {
      setSavedItems([...savedItems, workout]);
      showToastNotification("Successfully saved for later!", "success");
    }
  };

  const removeFromPlan = (id) => {
    setPlanItems(planItems.filter((item) => item.id !== id));
    showToastNotification("Deleted from today's plan!", "error");
  };

  const removeFromSaved = (id) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
    showToastNotification("Deleted from saved workouts!", "error");
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        activeTab,
        setActiveTab,
        toast,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
      {toast.show && (
        <div className="toast toast-bottom toast-end z-50 font-oswald uppercase tracking-wider text-xs">
          <div className={`alert ${
            toast.type === "success" ? "alert-success bg-[#ccff00] text-black" :
            toast.type === "error" ? "alert-error bg-red-600 text-white" :
            "alert-warning bg-yellow-500 text-black"
          } border-none shadow-lg rounded px-4 py-3 font-bold`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
