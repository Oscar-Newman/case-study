
export function formatDateMonthToFullDate(yearMonth)
{
      const [year, month] = yearMonth.split("-");
      const date = new Date(year, month, 0);

      const lastDay = date.getDate();
      return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
}