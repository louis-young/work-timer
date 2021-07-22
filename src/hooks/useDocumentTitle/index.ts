import type { UseDocumentTitleParameters } from "./types";

export const useDocumentTitle = ({
  isWorking,
  time,
}: UseDocumentTitleParameters) => {
  const interval = isWorking ? "Work" : "Break";

  const newTitle = `${interval} • ${time} • Work Timer`;

  document.title = newTitle;
};
