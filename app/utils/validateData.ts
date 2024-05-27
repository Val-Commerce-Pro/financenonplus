import { z } from "zod";

const customAttributesSchema = z.array(
  z.object({
    name: z.literal("Commerce-Pro"),
    value: z.literal("Consors-EFI"),
  }),
);

type NoteAttributes = Array<{
  name: string;
  value: string;
}>;

export function validateCustomAttributes(data: NoteAttributes): boolean {
  try {
    customAttributesSchema.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}
