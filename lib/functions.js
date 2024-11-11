// Function to change date from YYYY-MM to YYYY-MM-DD
export function formatDateMonthToFullDate(yearMonth)
{
      // Retrieve current YYYY and MM from string
      const [year, month] = yearMonth.split("-");
      const date = new Date(year, month, 0);
      // Get last day of on the month
      const lastDay = date.getDate();
      // Return string where the day is the LAST day of that month by default
      return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
}

// Takes a date from the database (YYYY-MM-DD) and converts to YYYY-MM
export function formatDateToShortDate(databaseDate) {
      const [year, month] = databaseDate.split("-");
      return `${year}-${month}`;
}