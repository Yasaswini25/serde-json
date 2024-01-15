import { KEY_VALUE_SEPARATOR, ENTRY_SEPARATOR } from "@/constants";

/**
 * Serializes a non-object value into its wired representation.
 *
 * @param value The non-object value to serialize.
 * @returns The serialized non-object value.
 */
function serializeOthers(value: unknown): string {
  return JSON.stringify(value);
}

/**
 * Serializes an object to its wired representation.
 *
 * @param obj The object to serialize.
 * @returns The serialized object.
 */
function serializeObject(obj: Record<string, unknown>): string {
  let serializedKeys = "";
  let serializedValues = "";

  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    const serializedValue = serialize(value);

    serializedValues += serializedValue;
    serializedKeys +=
      key +
      KEY_VALUE_SEPARATOR +
      serializedValue.length.toString() +
      ENTRY_SEPARATOR;
  }

  const serializedObject = "{" + serializedKeys + serializedValues + "}";
  return serializedObject;
}

/**
 * Serializes a value into its wired representation.
 *
 * @param value The value to serialize.
 * @returns The serialized value.
 */
export default function serialize(value: unknown): string {
  if (
    value === undefined ||
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return serializeOthers(value);
  }

  const obj = value as Record<string, unknown>;
  return serializeObject(obj);
}
