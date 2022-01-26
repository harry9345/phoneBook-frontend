import React, { useState, useEffect } from "react";
import Note from "./components/Note/Note";
// import Notification from "./components/Notification/Notification";
import LoginForm from "./components/LoginForm/LoginForm.js";
import NoteForm from "./components/Note/NoteForm/NoteForm.js";
import Togglable from "./components/Toggleable/Toggleable.js";
import Footer from "./components/Footer/Footer";
import loginService from "./services/login";
import noteService from "./services/note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("Add new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("someERROR HAPPEND");
  const [loginVisible, setLoginVisible] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  }, []);

  useEffect(() => {
    const logInInfo = window.localStorage.getItem("logInInfo");
    if (logInInfo) {
      const user = JSON.parse(logInInfo);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObj).then((response) => {
      setNotes(notes.concat(response));
      setNewNote(" ");
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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const noteToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login with : ", userName, " <= and => ", password);
    try {
      const user = await loginService.login({ userName, password });

      window.localStorage.setItem("logInInfo", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
      console.log("success user : ", user);
    } catch (expectation) {
      setErrorMessage("wrong credential");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem("logInInfo");
  };

  const loginForm = () => (
    <Togglable buttonLabel="log In">
      <LoginForm
        username={userName}
        password={password}
        handleUserNameChange={(e) => setUserName(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handelSubmite={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="New Note">
      <NoteForm
        onSubmit={addNote}
        value={newNote}
        handleChange={handleNoteChange}
      />
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
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notes.map((note) => (
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
