import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { notes, auth } from "../actions";

class PonyNote extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  state = {
    text: "",
    updateNoteId: null
  };

  resetForm = () => {
    this.setState({ text: "", updateNoteId: null });
  };

  selectForEdit = id => {
    let note = this.props.notes[id];
    this.setState({ text: note.text, updateNoteId: id });
  };

  submitNote = e => {
    e.preventDefault();
    if (this.state.updateNoteId === null) {
      this.props.addNote(this.state.text).then(this.resetForm);
    } else {
      this.props
        .updateNote(this.state.updateNoteId, this.state.text)
        .then(this.resetForm);
    }
    // this.resetForm() <-- moved to a callback for addNote
  };

  render() {
    return (
      <div>
        <h2>Welcome fucktard, to this great NoteApp.</h2>
        <p>
          <Link to="/contact">Click Here</Link> to contact me
        </p>
        <hr />
        <div style={{ textAlign: "right" }}>
          {this.props.user.username}(
          <a onClick={this.props.logout}>log the fuck out</a>)
        </div>

        <h3>Notelists</h3>
        <table>
          <tbody>
            {this.props.notes.map((note, id) => (
              <tr key={`note_${note.id}`}>
                {/* 이걸 {note.id} 로 안하고 {id} 로만 해서 에러 떳음 */}
                <td>{note.text}</td>
                <td>
                  <button onClick={() => this.selectForEdit(id)}>edit</button>
                </td>
                <td>
                  <button onClick={() => this.props.deleteNote(id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>add new Notelist</h3>
        <form onSubmit={this.submitNote}>
          <input
            value={this.state.text}
            placeholder="Enter yo mothafucking note"
            onChange={e => this.setState({ text: e.target.value })}
            required
          />
          <button onClick={this.resetForm}>Reset</button>
          <input type="submit" value="Save Note" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => {
      dispatch(notes.fetchNotes());
    },
    addNote: text => {
      return dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      return dispatch(notes.updateNote(id, text));
      // 이걸 그동안 addNote로 해놓고 잇었어...ㅅㅂ
    },
    deleteNote: id => {
      dispatch(notes.deleteNote(id));
    },
    logout: () => dispatch(auth.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);
