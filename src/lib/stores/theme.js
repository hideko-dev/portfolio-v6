import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const key = '@theme';
export const theme = writable('light');
const validThemes = ['dark', 'light', 'system'];

const updateLocalStorage = (value) => {
    if (browser) {
        localStorage.setItem(key, value);
    }
};

export function setTheme(value) {
    if (validThemes.includes(value)) {
        if(value === 'system') {
            setThemeData(getSystemTheme())
        } else {
            setThemeData(value)
        }
    } else {
        console.error(`Invalid theme: ${value}`);
    }
};

export function setThemeData(value) {
    updateLocalStorage(value);
    document.querySelector(':root')?.setAttribute('data-theme', value);
    theme.set(value);
}

export const toggleTheme = () => {
    theme.update((currentTheme) => {
        const themes = ['dark', 'light', 'system'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        setTheme(nextTheme);

        return nextTheme;
    });
};

export const onHydrated = () => {
    const storedTheme = localStorage.getItem(key);
    const systemTheme = getSystemTheme();
    if(storedTheme === 'system') {
        setTheme(systemTheme)
    } else {
        setTheme(storedTheme)
    }
};

export const getSystemTheme = () => {
    if (window.matchMedia) {
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const initialTheme = darkMediaQuery.matches ? 'dark' : 'light';
        setThemeData(initialTheme);
        darkMediaQuery.addListener((e) => {
            const systemTheme = e.matches ? 'dark' : 'light';
            setThemeData(systemTheme);
        });

        return initialTheme;
    } else {
        return 'light';
    }
};