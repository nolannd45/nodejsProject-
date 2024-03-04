import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

export default function DateRangeCalendarValue() {
    let date = new Date()
    let fDate = date.toLocaleDateString();
    // console.log();
    const [value, setValue] = React.useState([
        dayjs(fDate),
        dayjs(fDate),
    ]);

    return (
        <div className={`w-full overflow-hidden bg-blue-200`}>

            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
                    {/* <DemoItem label="Uncontrolled calendar">
                    <DateRangeCalendar
                    defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                    />
                </DemoItem> */}
                    <DemoItem label="Select Date">
                        <DateRangeCalendar
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}
