import { hasProperty } from "../../shared/utils";
import { AvailableLangs, LangDefinition } from "@jsverse/transloco";

export function isLabeledLanguageConfig(
    availableLangs: AvailableLangs | undefined
): availableLangs is LangDefinition[] {
    return Array.isArray(availableLangs) && (availableLangs as unknown[]).every(isLangDefinition);
}

function isLangDefinition(value: unknown): value is LangDefinition {
    return (
        typeof value === "object" &&
        value !== null &&
        hasProperty(value, "id") &&
        typeof value.id === "string" &&
        hasProperty(value, "label") &&
        typeof value.label === "string"
    );
}
