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
  console.log("formated data", castedValues)
  return castedValues;
};

export type OptionsMethodData = Array<{
  id: string;
  labelValue: string;
  selected?: boolean;
}>;
