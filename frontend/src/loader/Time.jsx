import { format } from 'date-fns';
import React from "react";

function Time({ time }) {

  const date = new Date(0);
  date.setSeconds(time); // Sets time in seconds
  const videoTime = format(date, 'H:mm:ss');
  
  return (
    <div>
      <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-md">
        {videoTime}
      </span>
    </div>
  );
}

export default Time;