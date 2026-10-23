import { themeToCssVars } from './to-css';

export const colors = {
  primary: '145 70% 55%',
  accent: '145 60% 88%',
  background: '0 0% 100%',
  foreground: '215 20% 10%',
  success: '116 78% 65%',
  error: '0 100% 60%',
  warning: '40 100% 60%',
  info: '220 70% 45%',
  contrast: {
    100: '215 12% 93%',
    200: '215 10% 82%',
    300: '215 8% 70%',
    400: '215 7% 54%',
    500: '215 10% 34%',
  },
  primaryMix: {
    white: {
      75: '145 60% 89%',
    },
    black: {
      75: '145 50% 14%',
    },
  },
};

export const BaseColors = () => (
  <style data-makeswift="theme-base-colors">{`:root {
      ${themeToCssVars(colors).join('\n')}
    }
  `}</style>
);
