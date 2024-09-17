import { writable } from "svelte/store";

export const characterPairSTORE = writable(true);
export const charactersDataLEFT = writable(true);
export const charactersDataRIGHT = writable(true);
export const currSectionSTORE = writable("slash");
export const uTooltipVisible = writable(false);
export const annotationVisible = writable([false, 0]);