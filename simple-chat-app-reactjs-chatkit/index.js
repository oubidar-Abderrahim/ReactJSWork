/** my own API keys, username and roomId from Chatkit API */

const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c735b2e9-d2f9-4ad0-a29b-f9bc70a596d0/token"
const instanceLocator = "v1:us1:c735b2e9-d2f9-4ad0-a29b-f9bc70a596d0"
const roomId = 11472330
const username = 'satityr'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 
    
	/** the method you should use when connecting React.js components to API’s is componentDidMount */
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {

                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
      })
    }
    
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }
    
    render() {
        return (
            <div className="app">
              <Title />
              <MessageList 
                  roomId={this.state.roomId}
                  messages={this.state.messages} />
              <SendMessageForm
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                      <li  key={message.id} className="message">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                      </li>
                    )
                })}
            </ul>
        )
    }
}

/** We’re doing two things:

	- Listening for user inputs with the onChange event listener, so that we can trigger the handleChange method
	- Setting the value of the input field explicitly using this.state.message

	The connection between these two steps is found inside the handleChange method. It simply updates the state to whatever the user types into the input field 
	
	We need to bind the handleChange method so that we’ll have access to the this keyword inside of it. That’s how JavaScript works: the this keyword is by default undefined inside the body of a function.
	
*/
class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}
/** 
	It’s a good practice to use functional components, as they have more constrains than class components, which makes them less prone to bugs.
*/
function Title() {
  return <p className="title">Satityr chat app</p>
}

ReactDOM.render(<App />, document.getElementById('root'));