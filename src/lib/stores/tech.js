import {get, writable} from "svelte/store";

export const techState = writable(0);
export const techOverlay = writable({
    status: false,
    text: "",
    web: "",
    state: ""
});

export function toggleTechOverlay(text, web, state) {
    const stv = get(techOverlay)
    if(stv.status) {
        techOverlay.set({
            status: false,
            text: "",
            web: "",
            state: ""
        })
    } else {
        techOverlay.set({
            status: true,
            text, web, state
        })
    }
}