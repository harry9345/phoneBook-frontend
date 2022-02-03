import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/react';

import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'component testing is done with me',
    important: true,
  };
  const mockHandler = jest.fn();
  const component = render(<Note note={note} />);

  //dom test
  const li = component.container.querySelector('li');
  console.log(prettyDOM(li));

  //fireEvent
  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  // debuging
  component.debug();

  //   methode 1
  expect(component.container).toHaveTextContent(
    'component testing is done with me'
  );

  //   methode 2
  const element = component.getByText('component testing is done with me');
  expect(element).toBeDefined();

  // methode 3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent('component testing is done with me');
});
