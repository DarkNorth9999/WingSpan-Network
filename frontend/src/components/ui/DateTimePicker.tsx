'use client';
import React, { useEffect } from 'react';
import { DateTimePicker } from '@/components/ui/shadcn/CustomDateTime';

const DatetimePickerGranularity = ({date,setDate}) => {
  


  return (
    <div>
      <DateTimePicker granularity="minute" value={date} onChange={setDate} />
    </div>
  );
};

export default DatetimePickerGranularity;
