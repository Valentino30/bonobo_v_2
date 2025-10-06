/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native'

const matchaGreenLight = '#98C96A' // medium matcha
const matchaGreenDark = '#4B6C4B' // deep matcha
const matchaCream = '#F6F5EC' // matcha foam/cream
const matchaBrown = '#B7A16A' // subtle brown accent
const matchaShadow = 'rgba(168, 198, 134, 0.15)' // soft green shadow
const matchaBorder = '#D6E3C3' // border for light
const matchaBorderDark = '#5A7D5A' // border for dark

export const theme = {
  light: {
    primary: matchaGreenLight,
    background: matchaCream,
    card: '#E6F0D5',
    text: '#2C3A2C',
    buttonText: '#fff', // light for contrast on matcha green
    muted: '#7D927D',
    border: matchaBorder,
    shadow: matchaShadow,
    surface: '#fff',
    icon: matchaGreenLight,
    accent: matchaBrown,
    tint: matchaGreenLight,
    tabIconDefault: matchaGreenLight,
    tabIconSelected: matchaGreenLight,
  },
  dark: {
    primary: matchaGreenDark,
    background: '#232B23',
    card: '#324C32',
    text: '#F6F5EC',
    buttonText: '#F6F5EC', // light for contrast on dark matcha
    muted: '#A8C686',
    border: matchaBorderDark,
    shadow: 'rgba(75, 108, 75, 0.25)',
    surface: '#2C3A2C',
    icon: matchaGreenDark,
    accent: matchaBrown,
    tint: matchaGreenDark,
    tabIconDefault: matchaGreenDark,
    tabIconSelected: matchaGreenDark,
  },
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
