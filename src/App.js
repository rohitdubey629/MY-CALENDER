import moment from "moment";
import momentTimezone from "moment-timezone";
import { useEffect, useState } from "react";

import "./App.css";
import Calender from "./Calender";
import CalenderHeader from "./CalenderHeader";

function App() {
  const [startDate, setStartDate] = useState(moment());
  const [timezone, setTimezone] = useState("Asia/Calcutta");
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const weeks = getWeekDays(startDate);
    setWeeks(weeks);
  }, [startDate]);

  const getWeekDays = (startDate) => {
    const currentDate = momentTimezone(startDate).tz(timezone);
    const week = [];
    for (let i = 1; i <= 7; i++) {
      const first = currentDate.date() - currentDate.day() + i;
      const day = moment(currentDate.set("date", first));
      week.push(day);
    }
    return week;
  };

  const onPreviousWeekHandler = () => {
    const startWeek = weeks[0];
    var new_date = moment(startWeek).subtract(7, "days");
    setStartDate(new_date);
  };

  const onNextWeekHandler = () => {
    const startWeek = weeks[weeks.length - 1];
    setStartDate(startWeek);
  };

  const onSelectHandler = (event) => {
    setTimezone(event.target.value);
    setStartDate(momentTimezone(startDate).tz(event.target.value));
  };

  const onCheckboxHandler = (event, date) => {
    const { id, value, name, checked } = event.target;
    const getDate = date.format("YYYY-MM-DD");
    const data = {
      id,
      name,
      date: getDate,
      time: value,
    };
    const store = [...selectedSlot];
    const findIndex = store.findIndex((item) => item.id === id);
    if (checked && findIndex === -1) {
      store.push(data);
    } else {
      store.splice(findIndex, 1);
    }
    setSelectedSlot(store);
  };

  return (
    <div>
      <CalenderHeader
        onPreviousWeekHandler={onPreviousWeekHandler}
        onNextWeekHandler={onNextWeekHandler}
        onSelectHandler={onSelectHandler}
      />
      <div>
        <Calender
          weeks={weeks}
          onCheckboxHandler={onCheckboxHandler}
          selectedSlot={selectedSlot}
        />
      </div>
      {selectedSlot.length ? (
        <div className="output">{JSON.stringify(selectedSlot, null, 3)}</div>
      ) : null}
    </div>
  );
}

export default App;
