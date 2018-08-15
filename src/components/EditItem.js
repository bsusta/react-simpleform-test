import React, { Component } from 'react';
import '../App.css';
import firebase from 'firebase';

class editItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.itemId,
            user: '',
            title: '',
        }
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items/' + this.state.id);
        itemsRef.on('value', (snapshot) => {
            let item = snapshot.val();
            this.setState({ user: snapshot.val().user, title: snapshot.val().title });
        });

    }

    handleChangeUser(e) {
        this.setState({
            user: e.target.value
        });
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        firebase.database().ref('items/' + this.state.id).update({
            user: this.state.user,
            title: this.state.title,
        });
        this.props.history.goBack();
    }

    render() {
        return (
            <div className='addItem' >
                < header >
                    <div className='wrapper'>
                        <h1>Edit Item</h1>

                    </div>
                </header>
                <div className='container'>
                    <section className="add-item">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChangeUser} value={this.state.user} />
                            <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChangeTitle} value={this.state.title} />
                            <button>Save item</button>
                        </form>
                    </section>
                </div>
            </div >
        );
    }
}
export default editItem;
