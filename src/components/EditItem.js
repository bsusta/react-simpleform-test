import React, { Component } from 'react';
import '../App.css';
import firebase from 'firebase';

class editItem extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.itemId);
        this.state = {
            id: this.props.match.params.itemId,
            user: '',
            title: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id);
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
        
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.currentItem,
            user: this.state.username
        }
        itemsRef.push(item);
        this.setState({
            currentItem: '',
            username: ''
        });
        this.props.history.goBack();
    }
    render() {
        return (
            <div className='addItem'>
                {console.log(this.state)}
                <header>
                    <div className='wrapper'>
                        <h1>Edit Item</h1>

                    </div>
                </header>
                <div className='container'>
                    <section className="add-item">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                            <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
                            <button>Add Item</button>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}
export default editItem;
