export const getFormattedTime = (date: Date) => {
  let minutes: number | string = date.getMinutes();
  let hours: number | string = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}