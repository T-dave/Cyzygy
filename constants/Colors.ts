/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useThemeColor } from "@/hooks/useThemeColor";

const tintColorLight = '#DB3022';
const tintColorDark = '#fff';
export const textColor2 = '#64748B';
export const primary = '#6200ee';
export const disabled = '#F1F5F9';
export const innerText={ light: '#FFFFFF', dark: '#000000' };
export const text2={ light: '#9B9B9B', dark: '#FFF' };

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F9F7F7',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    box:"#222222",
    box2:"#FFF"
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    box:"#F9F7F7",
    box2:"#000"
  },
};
