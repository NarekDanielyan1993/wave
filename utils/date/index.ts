import { yyyy_MM_dd } from '@constant/date';
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

interface IDateFns {
    parseToHumanReadableFormat: (date: string) => string;
    formatDate(date: Date | string, formatString: string): string;
}

export class DateFns implements IDateFns {
    parseToHumanReadableFormat(date: string): string {
        const parsedDate = parseISO(date);
        let dateInString = '';
        if (isValid(parsedDate)) {
            dateInString = formatDistanceToNow(parsedDate, {
                addSuffix: true,
            });
        }
        return dateInString;
    }

    formatDate(date: Date | string, formatString: string = yyyy_MM_dd): string {
        if (!(date instanceof Date || isValid(new Date(date)))) {
            throw new Error('Invalid date object');
        }
        return format(new Date(date), formatString);
    }
}
