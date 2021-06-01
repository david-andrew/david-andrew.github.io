//return a string of the format <Month YYYY>
export const toMonthYearString = (date: Date): string => date.toLocaleDateString('default', { month: 'long', year: 'numeric' })

//return a string of the format <Month DD, YYYY>
export const toMonthDayYearString = (date: Date): string => date.toLocaleDateString('default', { day: '2-digit', month: 'long', year: 'numeric' })
