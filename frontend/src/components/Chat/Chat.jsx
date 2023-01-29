import React from "react";
import './chat.css';

export class Chat extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [],
            value: ''
        };
    }
    componentDidMount () {
        this.ws = new WebSocket('ws://localhost:8001/');
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                setid: this.props.id,
                setname: `${this.props.account.first_name} ${this.props.account.last_name}`
            }));
        };
        this.ws.onmessage = (e) => {
            this.setState({
                messages: [...this.state.messages, JSON.parse(e.data)]
            });
        };
    }
    componentWillUnmount () {
        this.ws.close();
    }
    render () {
        return <div className="chat">
            <div className="chat-messages">
                <div>
                    {this.state.messages.length === 0 && (
                        <div className="message-placeholder">Messages will appear here!</div>
                    )}
                    {this.state.messages.map((m, i) => (
                        <div key={i} className="message">
                            <div className="message-author">{m.name}</div>
                            <div className="message-content">{m.message}</div>
                        </div>
                    ))}
                </div>
            </div>
            <input
                className="chat-input"
                value={this.state.value}
                autoFocus
                placeholder="Type a message..."
                onChange={(e) => {
                    this.setState({
                        value: e.target.value
                    });
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        this.ws.send(JSON.stringify({
                            message: this.state.value
                        }));
                        this.setState({
                            value: ''
                        });
                    }
                }}
            />
        </div>
    }
}

export default Chat;
