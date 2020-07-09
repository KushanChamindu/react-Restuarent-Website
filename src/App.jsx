import React from "react";
import "./App.scss";
import {Login, Register} from "./components/login/index";
import {Auth} from "./database/auth"
import {Home} from "./components/home/home";
import Start from "./components/login/start";
import fire from "./config/firebse";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        // Auth.login_listener().then((user) => {
        //     if (user) {
        //         this.setState({user})
        //     } else {
        //         this.setState({user: null})
        //     }
        // })
        fire.auth().onAuthStateChanged(user=>{
            if (user){
                this.setState({user})
            }else{
                this.setState({user: null})
            }
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.user ? <Home/> :
                    <Start/>}
            </div>
        );
    }
}

export default App;
