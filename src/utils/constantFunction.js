const baseURL = import.meta.env.VITE_BASE_API_URL;

export function tokenPayload(token) {
  if (!token) return null;
  const tokenParts = token.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  return payload;
}
export function formatIndianNumber(number) {
  if (!number) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(number);
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(month, 10)} ${months[parseInt(month, 10) - 1]}, ${year}`;
}

export function formatDateMMDDYYYY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export function formatDateYYYYMMDD(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatIndianCurrency(value) {
  if (value >= 10000000) {
    const crValue = value / 10000000;
    return "₹" + crValue.toFixed(2) + "cr";
  } else if (value >= 100000) {
    const lakhsValue = value / 100000;
    return "₹" + lakhsValue.toFixed(2) + "L";
  } else {
    return Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }
}
