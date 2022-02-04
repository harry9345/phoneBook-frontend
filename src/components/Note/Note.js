import './note.css';

const Note = ({ note, toggelingImportant }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggelingImportant}>{label}</button>
    </li>
  );
};
export default Note;
