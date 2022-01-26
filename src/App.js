import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification/Notification";
import noteService from "./services/note";
import loginService from "./services/login";
import axios from "axios";

const Footer = () => {
  const footeStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footeStyle}>
      {" "}
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2021
      </em>
    </div>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("Add new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("someERROR HAPPEND");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login with : ", userName, " <= and => ", password);
    try {
      const user = await loginService.login({ userName, password });
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        User name :
        <input
          type="text"
          name="Username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        Password :
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type="submit">ADD</button>
    </form>
  );
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is LogIn</p>
          {noteForm()}
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            logOut
          </button>
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
