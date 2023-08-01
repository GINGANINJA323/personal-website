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

export const getDate = (date: Date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const capitalise = (string: String) => {
  return `${string.charAt(0).toLocaleUpperCase()}${string.slice(1)}`;
}