import moment from "moment";
import React, { useEffect, useState } from "react";

const Calender = ({ weeks, onCheckboxHandler, selectedSlot }) => {
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const result = weeks.filter((day) => {
      const getDayName = moment(day).format("ddd");
      if (getDayName === "Sat" || getDayName === "Sun") {
        return false;
      }
      return true;
    });
    setWeekData(result);
  }, [weeks]);

  function generateTimeSlot() {
    const slotConfig = {
      slotInterval: 30,
      openTime: "08:00",
      closeTime: "23:00",
    };
    const startTime = moment(slotConfig.openTime, "HH:mm");
    const endTime = moment(slotConfig.closeTime, "HH:mm");
    const allTimes = [];
    while (startTime <= endTime) {
      allTimes.push(startTime.format("HH:mm"));
      startTime.add(slotConfig.slotInterval, "minutes");
    }
    return allTimes;
  }

  function onCheckboxChangeHandler(event, date) {
    // console.log("event ", event, " data ", date);
    onCheckboxHandler(event, date);
  }

  function getAvailableTime(date, dayName, getMonth, getDay) {
    const diff = moment(date).diff(moment(), "days");
    if (diff < 0) {
      return "Past";
    }
    const timeSlot = generateTimeSlot();

    return timeSlot.map((slot) => {
      const generateId = `${dayName}${getMonth}${getDay}${slot}`;

      const findIndex = selectedSlot.findIndex(
        (item) => item.id === generateId
      );

      return (
        <div key={slot} className="checkbox-block">
          <label>
            <input
              value={slot}
              id={generateId}
              name={`${dayName} ${getMonth} ${getDay}`}
              type="checkbox"
              checked={findIndex === -1 ? false : true}
              onChange={(event) => onCheckboxChangeHandler(event, date)}
            />{" "}
            {moment(slot, ["HH:mm"]).format("hh:mm A")}
          </label>
        </div>
      );
    });
  }

  if (!weeks.length) {
    return null;
  }

  return (
    <div className="calender-container">
      {weekData.map((date) => {
        const dayName = moment(date).format("ddd");
        const getMonth = moment(date).format("MM");
        const getDay = moment(date).format("DD");
        return (
          <div key={`${dayName}-${getMonth}`} className="calender-block">
            <div>
              <div>{dayName}</div>
              <div>{`${getMonth}/${getDay}`}</div>
            </div>
            <div>{getAvailableTime(date, dayName, getMonth, getDay)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Calender;
