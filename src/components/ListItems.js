import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Table, Button } from 'reactstrap';




class ListItems extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: []
        }
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }


    componentDidMount() {
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


    render() {
        return (

            <div className='app'>
                <header>
                    <div className='wrapper'>
                        <h1>Todo</h1>
                    </div>
                </header>
                <div className='container'>
                    <Link to={`/additem`}>
                        <button>AddItem</button>
                    </Link>
                </div>
                <div className='container'>
                    <section className='display-item'>
                        <div className="wrapper">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>User</th>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.items.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.user}</td>
                                                <td>
                                                    <button onClick={() => this.removeItem(item.id)}>Remove</button>
                                                </td>
                                                <td>
                                                    <Link to={{ pathname: `/edititem/` + item.id }}>
                                                        <button>Edit</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                            {/*
                            <ul>
                                {this.state.items.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <h3>{item.title}</h3>
                                            <p>{item.id}</p>
                                            <p>brought by: {item.user}</p>
                                            <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                            <Link to={{ pathname: `/edititem/` + item.id }}>
                                                <button>EditItem</button>
                                            </Link>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                            */}
                        </div>
                    </section>

                </div>
            </div>
        );
    }
}
export default ListItems;
