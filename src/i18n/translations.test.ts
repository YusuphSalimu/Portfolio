import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import sw from "../../messages/sw.json";
import fr from "../../messages/fr.json";

function getKeys(obj: Record<string, any>, prefix = ""): string[] {
  return Object.keys(obj).reduce((res: string[], key: string) => {
    if (key === "_comment") return res;
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      res.push(...getKeys(value, newPrefix));
    } else {
      res.push(newPrefix);
    }
    return res;
  }, []);
}

describe("Translations", () => {
  it("should have matching keys across all locales", () => {
    const enKeys = getKeys(en).sort();
    const swKeys = getKeys(sw).sort();
    const frKeys = getKeys(fr).sort();

    expect(swKeys).toEqual(enKeys);
    expect(frKeys).toEqual(enKeys);
  });
});
