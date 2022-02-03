import React from 'react';
import '../note.css';

export default function Notification({ message }) {
  if (message === null) {
    return null;
  }
  return <div className='error'>{message}</div>;
}
