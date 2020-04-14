export interface Sound {
    name: string;
    name_l10n?: { [key: string]: string; };
    file: string | string[];
    type: string;
}
