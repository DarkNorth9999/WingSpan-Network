'use client';
import { DateTimePicker } from '@/components/ui/shadcn/CustomDateTime';

const DatetimePickerGranularity = ({date,setDate}:{date:any,setDate:any}) => {
  


  return (
    <div>
      <DateTimePicker granularity="minute" value={date} onChange={setDate} />
    </div>
  );
};

export default DatetimePickerGranularity;
