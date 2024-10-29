import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { cn } from "@/lib/utils";

const Calendar = ({ showControls = false }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => (
    <div
      className={cn(
        "flex justify-between w-full items-center p-4",
        !showControls && "justify-center items-center self-center"
      )}
    >
      {showControls ? (
        <button
          onClick={prevMonth}
          className="text-blue-500 hover:text-blue-700"
        >
          {"<"}
        </button>
      ) : null}
      <h2 className="text-xl text-center font-bold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      {showControls ? (
        <button
          onClick={nextMonth}
          className="text-blue-500 hover:text-blue-700"
        >
          {">"}
        </button>
      ) : null}
    </div>
  );

  const renderDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-center ">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-md text-gray-500 p-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            key={day.getTime()}
            className={`p-2 min-h-12 flex justify-center items-center text-sm  text-center ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, new Date())
                ? "bg-blue-600 font-bold text-white rounded-full"
                : ""
            }`}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.getTime()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-sm mx-auto pb-2  rounded-lg  ">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
