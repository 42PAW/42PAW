const useParseDate = () => {
  const parseDate = (rawDate: string | Date) => {
    const parsedDate = new Date(rawDate);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}.${month}.${day}`;

    return formattedDate;
  };
  return { parseDate };
};

export default useParseDate;
