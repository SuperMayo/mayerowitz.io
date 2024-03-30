type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string, locales = "en") {
    // Safari is mad about dashes in the date
    const dateToFormat = new Date(date.replaceAll("-", "/"));
    const dateFormatter = new Intl.DateTimeFormat(locales, {
        month: "short", // You can change this to 'numeric' or '2-digit' if you prefer
        day: "numeric", // You can also use '2-digit' here
    });
    return dateFormatter.format(dateToFormat);
}

