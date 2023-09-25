function formatDate(inputDate: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(inputDate).toLocaleDateString(undefined, options);
}

interface DateComponentProps {
	date: string;
}

function DateComponent({ date }: DateComponentProps): JSX.Element {
	const formattedDate = formatDate(date);

	return <span>{formattedDate}</span>;
}

export default DateComponent;
