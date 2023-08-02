const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

export default function formatDate(date: Date) {
    return date.toLocaleString("en-US", dateFormatOptions);
}