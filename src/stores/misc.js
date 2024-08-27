import { writable } from "svelte/store";

export const characterPairSTORE = writable(true);
export const charactersDataLEFT = writable(true);
export const charactersDataRIGHT = writable(true);
export const currSectionSTORE = writable("slash");

export const noValTooltip = writable(true);
export const semiValTooltip = writable(true);
export const yesValTooltip = writable(true);