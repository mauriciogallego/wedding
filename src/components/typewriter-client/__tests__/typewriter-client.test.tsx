import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import TypewriterClient from '../typewriter-client';

// Keep track of the props passed to the Typewriter component
let lastOptions: any = null;

jest.mock('typewriter-effect', () => {
  return {
    __esModule: true,
    default: ({ options }: { options: { strings: string[], wrapperClassName: string } }) => {
      lastOptions = options;
      return (
        <div className={options.wrapperClassName}>
          {options.strings[0]}
        </div>
      );
    },
  };
});

describe('TypewriterClient', () => {
  beforeEach(() => {
    lastOptions = null;
  });

  it('renders with the correct props', () => {
    const testStrings = ['Hello', 'World'];
    render(<TypewriterClient strings={testStrings} />);
    
    // Check if the typewriter component received the correct strings
    expect(screen.getByText('Hello')).toBeInTheDocument();
    
    // Check if the correct class is applied
    expect(screen.getByText('Hello')).toHaveClass('text-9xl font-bold');
  });

  it('passes all strings to the Typewriter component', () => {
    const testStrings = ['Hello', 'World', 'Testing'];
    render(<TypewriterClient strings={testStrings} />);
    
    // Verify that all strings are passed to the Typewriter component
    expect(lastOptions.strings).toEqual(testStrings);
    expect(lastOptions.strings.length).toBe(3);
  });

  it('sets the correct options for the Typewriter component', () => {
    const testStrings = ['Hello'];
    render(<TypewriterClient strings={testStrings} />);
    
    // Check configuration options
    expect(lastOptions.autoStart).toBe(true);
    expect(lastOptions.loop).toBe(false);
    expect(lastOptions.deleteSpeed).toBe(50);
    expect(lastOptions.wrapperClassName).toBe('text-9xl font-bold');
  });
}); 