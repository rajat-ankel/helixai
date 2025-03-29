export type ColorTheme = {
  name: string;
  value: string;
  hue: number;
};

export const colorThemes: ColorTheme[] = [
  { name: 'Default', value: 'default', hue: 0 },
  { name: 'Blue', value: 'blue', hue: 210 },
  { name: 'Green', value: 'green', hue: 142 },
  { name: 'Purple', value: 'purple', hue: 262 },
  { name: 'Orange', value: 'orange', hue: 24 },
  { name: 'Pink', value: 'pink', hue: 330 },
  { name: 'Teal', value: 'teal', hue: 180 },
];
