import '@emotion/react';
import { MainThemeTypes } from 'styles/theme';

declare module '@emotion/react' {
    export interface Theme extends MainThemeTypes {}
}
