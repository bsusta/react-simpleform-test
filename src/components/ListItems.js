import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Table } from 'reactstrap';

const columns = [{
    dataField: 'id',
    text: 'ID'
}, {
    dataField: 'title',
    text: 'Title'
}, {
    dataField: 'user',
    text: 'User'
}];



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
                    <section className='display-item'>
                        <div className="wrapper">
                            <BootstrapTable keyField='id' striped
                                hover
                                condensed
                                data={this.state.items} columns={columns} />
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
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
