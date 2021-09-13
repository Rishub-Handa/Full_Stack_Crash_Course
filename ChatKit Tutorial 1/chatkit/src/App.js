import React from 'react';
import MessageList from './components/MessageList'; 
import SendMessageForm from './components/SendMessageForm'; 
import RoomList from './components/RoomList'; 
import NewRoomForm from './components/NewRoomForm'; 
import { tokenUrl, instanceLocator } from './config'; 
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'; 
import './App.css';

class App extends React.Component {

  state = {
    messages: [], 
    roomId: null, 
    joinableRooms: [], 
    joinedRooms: [] 
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator, 
      userId: 'rishub', 
      tokenProvider: new TokenProvider({
        // TokenUrl may point to backend Node Server. 
        url: tokenUrl 
      })
    }); 
    chatManager.connect({
      onAddedToRoom: room => {
        console.log(`Added to room: ${room.name}`)
      }
    }) 
      .then(currentUser => {
        // CurrentUser is interface to communicate with ChatKit API. 
        this.currentUser = currentUser; 

        this.getRooms(); 

      })
      .catch(error => console.log(error)); 
  } 

  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoomMultipart({
      roomId, 
      // messageLimit: 100, 
      hooks: {
        onMessage: message => {
          console.log('Message Text: ', message); 
          this.setState({ 
            messages: [...this.state.messages, message]  
          })
        }
      }
    })
      .then(room => {
        this.setState({ roomId: room.id }); 
        this.getRooms(); 
      })
      .catch(error => console.log(error)); 
    }

  getRooms = () => {
    this.currentUser.getJoinableRooms() 
        .then(joinableRooms => {
          this.setState({
            joinableRooms, 
            joinedRooms: this.currentUser.rooms
          })
        })
        .catch(error => console.log(error)); 
  }

  sendMessage = (text) => {
    this.currentUser.sendSimpleMessage({
      text, 
      roomId: this.state.roomId 
    }); 
  }

  createRoom = (name) => {
    this.currentUser.createRoom({ 
      name 
    }) 
    .then(room => this.subscribeToRoom(room.id)) 
    .catch(error => console.log(error)); 
  }

  render() {
    return (
      <div className="app">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                  subscribeToRoom={this.subscribeToRoom}
                  roomId={this.state.roomId}/> 
        <MessageList messages={this.state.messages}
                      roomId={this.state.roomId}/> 
        <SendMessageForm sendMessage={this.sendMessage}
                          disabled={!this.state.roomId}/> 
        <NewRoomForm createRoom={this.createRoom}/> 
      </div>
    );
  } 
}

export default App;
