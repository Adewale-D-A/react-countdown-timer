
export function formatDateToString(date: Date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // JS months are 0-indexed
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatTimeForInput(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function localDateToIsoFormat(date: Date) {
  const dateElement = formatDateToString(date);
  const timeElement = formatTimeForInput(date);
  return `${dateElement}T${timeElement}`;
}
