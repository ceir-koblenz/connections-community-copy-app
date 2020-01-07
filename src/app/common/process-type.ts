/**
 *  Enumeration für Prozesstypen, die von der App angeboten werden.
 *
 * @export
 * @enum {number}
 */
export enum ProcessType {
    copy,
    createTemplate
}

/**
 *  Dictionary, um für einen ProcessType ein Beschreibungslabel zu generieren.
 *
 * @export
 * @const {Map<number, String>}
 */
export const ProcessTypeLabels = new Map<number, String>([
    [ProcessType.copy, "Community kopieren"],
    [ProcessType.createTemplate, "Template aus Community erstellen"]
]);