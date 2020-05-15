import React from "react";
import UserItem from "./UserItem/UserItem";
import classes from './UserList.module.css';
import axios from "axios";
import { Component } from "react";
import Spinner from '../../../components/UI/Spinner/Spinner';

class UserList extends Component {
    state = {
        userList: <Spinner/>,
    };

    componentDidMount() {
        let users = null;

        axios
            .get("http://localhost:8088/api/user")
            .then(response => {
                console.log(response.data);
                users = response.data;
                let userItems = users.map((user, index) => (
                    <UserItem
                        key={index}
                        userId = {user.id}
                        isActive = {user.isActive}
                        source={user.imagePath}
                        name={user.fullName}
                        age={user.age}
                        country={user.country}
                        trucks = {user.truck}
                    />
                ));
                this.setState({ userList: userItems });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
    return (
        <div className = {classes.UserList}>
            <h2>Users</h2>
            {this.state.userList}
        </div>
    );
        
    }
}

export default UserList;
