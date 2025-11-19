export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};

export const formatTime = (time: string): string => {
  console.log("Formatting date:", time);
  const parsedDate = new Date(time);
  console.log("Parsed date:", parsedDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};

export const formatTimeForInput = (time: string): string => {
  const d = new Date(time);

  const pad = (n: number) => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const bufferToBase64 = (bufferData: number[] | Uint8Array): string => {
  const uint8Array =
    bufferData instanceof Uint8Array ? bufferData : new Uint8Array(bufferData);
  let binary = "";
  const chunkSize = 0x8000; 

  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return window.btoa(binary);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
};

export const formatInterviewTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getEndTime = (startTime: string, duration: string): string => {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + parseInt(duration) * 60000);
  return formatInterviewTime(end.toISOString());
};

export const detectInterviewOverlaps = (interviews: any[]) => {
  const overlappingIds = new Set<string>();
  const overlappingPairs = new Map<string, string[]>();

  for (let i = 0; i < interviews.length; i++) {
    for (let j = i + 1; j < interviews.length; j++) {
      const interview1 = interviews[i];
      const interview2 = interviews[j];

      const start1 = new Date(interview1.start_time);
      const end1 = new Date(
        start1.getTime() + parseInt(interview1.duration) * 60000
      );
      const start2 = new Date(interview2.start_time);
      const end2 = new Date(
        start2.getTime() + parseInt(interview2.duration) * 60000
      );

      if (
        start1 < end2 &&
        start2 < end1 &&
        start1 >= new Date() &&
        start2 >= new Date()
      ) {
        overlappingIds.add(interview1.id);
        overlappingIds.add(interview2.id);

        if (!overlappingPairs.has(interview1.id)) {
          overlappingPairs.set(interview1.id, []);
        }
        if (!overlappingPairs.has(interview2.id)) {
          overlappingPairs.set(interview2.id, []);
        }
        overlappingPairs.get(interview1.id)?.push(interview2.id);
        overlappingPairs.get(interview2.id)?.push(interview1.id);
      }
    }
  }

  return { overlappingIds, overlappingPairs };
};

