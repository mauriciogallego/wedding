import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranslationsProvider from '../translation-provider';
import initTranslations from '@/app/i18n';

// Mock the initTranslations function
jest.mock('@/app/i18n', () => {
  return jest.fn().mockImplementation((locale, namespaces, i18n, resources) => {
    // Mock implementation that just returns the i18n instance
    return Promise.resolve({
      i18n,
      resources: {},
      t: jest.fn()
    });
  });
});

// Mock the I18nextProvider component
jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18next-provider">{children}</div>
  )
}));

describe('TranslationsProvider', () => {
  const mockChildren = <div data-testid="test-child">Test Child</div>;
  const mockLocale = 'en';
  const mockNamespaces = ['common'];
  const mockResources = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <TranslationsProvider
        locale={mockLocale}
        namespaces={mockNamespaces}
        resources={mockResources}
      >
        {mockChildren}
      </TranslationsProvider>
    );

    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('calls initTranslations with the correct parameters', () => {
    render(
      <TranslationsProvider
        locale={mockLocale}
        namespaces={mockNamespaces}
        resources={mockResources}
      >
        {mockChildren}
      </TranslationsProvider>
    );

    expect(initTranslations).toHaveBeenCalledWith(
      mockLocale,
      mockNamespaces,
      expect.any(Object),
      mockResources
    );
  });

  it('renders the I18nextProvider with the i18n instance', () => {
    const { getByTestId } = render(
      <TranslationsProvider
        locale={mockLocale}
        namespaces={mockNamespaces}
        resources={mockResources}
      >
        {mockChildren}
      </TranslationsProvider>
    );

    expect(getByTestId('i18next-provider')).toBeInTheDocument();
  });
}); 