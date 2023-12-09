import {get, writable} from "svelte/store"

export const themeMenu = writable(false)

export function toggleThemeMenu() {
    const state = get(themeMenu)
    if(state) {
        themeMenu.set(false)
    } else {
        themeMenu.set(true)
    }
}