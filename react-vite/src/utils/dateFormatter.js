//^ For Dates: 2021-10-01 00:00:00.000000
//^ Returns 2021-10-01
export const formattedDate = (inputDate) => {
  const parts = inputDate.split(' ');
  if (parts.length !== 2) return;
  const date = parts[0];
  const [year, month, day] = date.split('-');
  return `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
};

//^ For Dates: 10-01-2021
//^ Returns 2021-10-01
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//^ Parses ISO date string & creates a UTC date object
export const parseISODate = (inputDate) => {
  const date = new Date(inputDate);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
};

//^ For Times: 00:00:00.000000
//^ Returns 00:00:00
export const formattedTime = (inputDate) => {
  const parts = inputDate.split(' ');
  if (parts.length !== 2) return;
  const time = parts[1].split('.')[0];
  const [hour, min, sec] = time.split(':');
  return `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(
    2,
    '0'
  )}`;
};
