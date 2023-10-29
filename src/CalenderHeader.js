import React from 'react';
import moment from 'moment';

const timezoneList = [
  {
    value: 'India Standard Time',
    abbr: 'IST',
    offset: 5.5,
    isdst: false,
    text: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    utc: 'Asia/Calcutta',
  },
  {
    value: 'Pacific Daylight Time',
    abbr: 'PDT',
    offset: -7,
    isdst: true,
    text: '(UTC-07:00) Pacific Daylight Time (US & Canada)',
    utc: 'America/Los_Angeles',
  },

  {
    value: 'Canada Central Standard Time',
    abbr: 'CCST',
    offset: -6,
    isdst: false,
    text: '(UTC-06:00) Saskatchewan',
    utc: 'America/Regina',
  },
];
function CalenderHeader({
  onPreviousWeekHandler,
  onNextWeekHandler,
  onSelectHandler,
}) {
  return (
    <>
      <div className="header">
        <div>
          <button onClick={onPreviousWeekHandler}>Previous Week</button>
        </div>
        <div>{moment().format('MMM, DD YYYY')}</div>
        <div>
          <button onClick={onNextWeekHandler}>Next Week</button>
        </div>
      </div>
      <div className='timezone'>
        <div>
          <label>Timezone</label>
        </div>
        <select onChange={onSelectHandler}>
          {timezoneList.map((v, index) => (
            <option value={v.utc} key={`option-${index}`}>
              {v.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default CalenderHeader;
