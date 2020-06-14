import { monthNames } from '../Constants/dateConstants';

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
}

const isThisYear = (someDate) => {
    const today = new Date()
    return someDate.getFullYear() === today.getFullYear();
}

export const dateFormating = dateString => {
    const date = new Date(dateString);
    if (isToday(date))
        return (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes());
    else if (isThisYear(date)) {
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const dayPostfix = date.getDate() % 10 === 1 ? 'st' : date.getDate() % 10 === 2 ? 'nd' : date.getDate() % 10 === 3 ? 'rd' : 'th';
        return month + " " + day + "" + dayPostfix;
    }
    else 
        return date.toLocaleDateString();
}