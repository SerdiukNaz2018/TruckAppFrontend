import React from "react";
import UserItem from "./UserItem/UserItem";
import axios from "axios";
import { Component } from "react";

class UserList extends Component {
    state = {
        userList: null,
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
                        source={user.imagePath}
                        name={user.fullName}
                        age={user.years}
                        country={user.country}
                    />
                ));
                this.setState({ userList: userItems });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return this.state.userList;
    }
}

export default UserList;
