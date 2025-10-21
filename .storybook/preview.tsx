import type { Preview } from '@storybook/react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    docs: {
      theme: {
        base: 'light',
        brandTitle: 'Liquid Glass Design System',
        brandUrl: 'https://github.com/karpovpw/karpov-landing',
      },
    },
    backgrounds: {
      default: 'glass-light',
      values: [
        {
          name: 'glass-light',
          value: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        },
        {
          name: 'glass-dark',
          value: '#0f172a',
        },
        {
          name: 'transparent',
          value: 'transparent',
        },
      ],
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'light', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#0f172a' },
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      React.useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }, [theme]);

      return <Story />;
    },
  ],
  globals: {
    theme: 'light',
  },
};

export default preview;