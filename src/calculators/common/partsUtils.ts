import type {Part} from "./partTypes.ts";

export function calculatePartsCost(parts: Part[]) {
    return parts.reduce(
        (sum, part) => sum + part.unitCost * part.quantity,
        0
    );
}