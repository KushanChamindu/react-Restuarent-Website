import React from "react";
import {Auth} from "../../database/auth";

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }
signOut(){
        Auth.signOut();
}
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button type = "submit" onClick={this.signOut}>SignOut</button>
            </div>
        );
    }
}
