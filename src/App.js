import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note/Note';
// import Notification from './components/Notification/Notification';
import LoginForm from './components/LoginForm/LoginForm.js';
import NoteForm from './components/Note/NoteForm/NoteForm.js';
import Togglable from './components/Toggleable/Toggleable.js';
import Footer from './components/Footer/Footer';
import loginService from './services/login';
import noteService from './services/note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('someERROR HAPPEND');

  const noteFormRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  }, []);

  useEffect(() => {
    const logInInfo = window.localStorage.getItem('logInInfo');
    if (logInInfo) {
      const user = JSON.parse(logInInfo);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggelingImportant = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(
          notes.map((eachNote) => (eachNote.id !== id ? eachNote : res))
        );
      })
      .catch((error) => {
        setErrorMessage(`the ${note.content} has already deleted`);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const noteToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      noteService.setToken(user.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem('logInInfo');
  };

  const loginForm = () => (
    <Togglable buttonLabel='log In'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel='New Note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );
  return (
    <div>
      <h1>Notes</h1>
      {/* <Notification message={errorMessage} /> */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is LogIn</p>
          {noteForm()}
          <button onClick={logOut}>logOut</button>
        </div>
      )}
      <h2>Notes :</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            id={note.id}
            toggelingImportant={() => toggelingImportant(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
