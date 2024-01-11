import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

interface IDateFns {
    parseToHumanReadableFormat: (date: string) => string;
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
}
