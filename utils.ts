export const formatDate = (date: string): string => {
  console.log(date)
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};

export const bufferToBase64 = (bufferData: number[] | Uint8Array): string => {
  const uint8Array =
    bufferData instanceof Uint8Array ? bufferData : new Uint8Array(bufferData);
  let binary = "";
  const chunkSize = 0x8000; // process in chunks to avoid stack overflow

  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return window.btoa(binary);
}

