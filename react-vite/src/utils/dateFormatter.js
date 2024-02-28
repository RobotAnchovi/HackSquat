export const formattedDate = (inputDate) => {
  const parts = inputDate.split(' ');
  if (parts.length !== 2) return;
  const date = parts[0];
  const [year, month, day] = date.split('-');
  return `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
};

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
