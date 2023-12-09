function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function isLightMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

export function getSystemTheme() {
    if (isDarkMode()) {
        return 'dark';
    } else if (isLightMode()) {
        return 'light';
    } else {
        return 'idk';
    }
}