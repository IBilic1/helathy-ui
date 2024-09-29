import {PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import {Badge} from "@mui/material";
import {Dayjs} from "dayjs";

export default function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

    const isSelected =
        !props.outsideCurrentMonth &&
        highlightedDays.indexOf(props.day.date()) >= 0;
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
        >
            <PickersDay
                {...other}
                selected={isSelected}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
            />
        </Badge>
    );
}