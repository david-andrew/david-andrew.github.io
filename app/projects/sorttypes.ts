export const sortOptionsList = ['Recommended', 'Date (New-Old)', 'Date (Old-New)', 'Alphabetical (A-Z)', 'Alphabetical (Z-A)'] as const;
export type SortOption = typeof sortOptionsList[number];
export const isSortOption = (text: any): text is SortOption => sortOptionsList.includes(text as SortOption);