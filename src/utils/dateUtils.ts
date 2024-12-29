import { format } from 'date-fns';

export const formatDate = (dateString: string): string => {
  // Handle dates in DD-MM-YYYY format
  if (dateString.includes('-')) {
    const [day, month, year] = dateString.split('-');
    return format(new Date(Number(year), Number(month) - 1, Number(day)), 'dd MMM');
  }
  
  // Handle dates in YYYY-MM-DD format (from input type="date")
  return format(new Date(dateString), 'dd MMM');
};

export const formatDisplayDate = (dateString: string): string => {
  if (dateString.includes('-')) {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  const date = new Date(dateString);
  return format(date, 'dd-MM-yyyy');
};