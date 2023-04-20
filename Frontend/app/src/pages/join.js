import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const initialState = {
  name: '',
  room: '',
  rooms: []

};

class Join extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
      showAddRoom: false,
      newRoomName: ''
    };
  }

  clearForm() {
    this.setState({
      ...initialState
    });
  }

  inputUpdate(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSelectChange(event) {
    if (event.target.value === 'Create new room') {
      this.setState({ showAddRoom: true });
    } else {
      this.setState({ showAddRoom: false });
      this.inputUpdate(event);
    }
  }

  handleAddRoom() {
    const { newRoomName , rooms } = this.state;
    if (newRoomName) {
      this.setState({
        room: newRoomName,
        rooms : [...rooms,newRoomName],
        newRoomName: '',
        showAddRoom: false
      });
    }
  }

  join() {
    const { name, room } = this.state;
    if (name && room) {
        this.props.history.push(`/chat/${name}/${room}`)
    }
}

  render() {
    const { name, room,rooms, showAddRoom, newRoomName } = this.state;

    return (
      <div className="joinForm">
        <div id="input_field">
          {showAddRoom ? (
            <div>
              <input
                id="input"
                type="text"
                placeholder="Enter room name"
                value={newRoomName}
                onChange={(e) =>
                  this.setState({ newRoomName: e.target.value })
                }
              />
              <span
                id="add"
                style={{
                  color: 'white',
                  backgroundColor: 'grey',
                  padding: '5px',
                  margin: '12px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => this.handleAddRoom()}
              >
                Add
              </span>
            </div>
          ) : null}
        </div>
        <div className="form_wrap">
          <div className="form_row">
            <div className="form_item">
              <div className="form_input">
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={(e) => this.inputUpdate(e)}
                />
                <span className="bottom_border"></span>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_item">
              <div className="form_select">
                <select
                  name="room"
                  value={room}
                  onChange={(e) => this.handleSelectChange(e)}
                >
                    {rooms.map((room) => (
                  <option key={room}>{room}</option>
                ))}

                  <option value="">Please select a group</option>
                  <option value="React JS">React JS</option>
                  <option value="Node JS">Node JS</option>
                  <option key={room}>{room}</option>
                  <option value="Create new room">Create new room</option>
                </select>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="form_buttons">
            <button onClick={() => this.join()} className="btn">
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Join);
