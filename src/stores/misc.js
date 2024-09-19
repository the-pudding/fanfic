import { writable } from "svelte/store";

export const characterPairSTORE = writable(true);
export const charactersDataLEFT = writable(true);
export const charactersDataRIGHT = writable(true);
export const currSectionSTORE = writable("slash");
export const uTooltipVisible = writable(false);
export const annotationVisible = writable([false, 0]);
export const scrollSLASH = writable(0);
export const scrollCANON = writable(0);
export const scrollRPF = writable(0);
