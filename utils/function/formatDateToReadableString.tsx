function formatDateToReadableString(dateString: string): string {
  const date = new Date(dateString);

  // Get date components
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const year = date.getUTCFullYear();

  // Determine ordinal suffix
  const ordinalSuffix = (n: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}

export default formatDateToReadableString;
