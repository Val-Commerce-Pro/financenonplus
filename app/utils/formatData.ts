type FormatData = {
  [k: string]: FormDataEntryValue;
};

export const formatData = (
  values: FormatData,
  hasBoolean: boolean = false,
): {
  [key: string]: string | boolean;
} => {
  const booleanKeys = ["appMode"];
  const castedValues = Object.entries(values).reduce(
    (acc, [key, value]) => {
      if (hasBoolean && booleanKeys.includes(key)) {
        acc[key] = value.toString() === "true";
      } else {
        acc[key] = value.toString();
      }
      return acc;
    },
    {} as { [key: string]: string | boolean },
  );
  return castedValues;
};

export type OptionsMethodData = Array<{
  id: string;
  labelValue: string;
  selected?: boolean;
}>;

export function appendUniqueNote(
  existingNotes: string,
  newNote: string,
): string {
  if (!existingNotes) return newNote;
  if (!existingNotes.includes(newNote)) return `${existingNotes}\n${newNote}`;
  return existingNotes;
}

export function createNoteMessage(status: string, action?: string): string {
  if (!action) return `Consors EFI client request, current status: ${status}`;
  return `Consors EFI has been notified of the ${action} request, current status: ${status}.`;
}
