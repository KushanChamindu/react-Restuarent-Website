import React from "react";
import loginImg from "./assets/login.svg";
import "./style/style.scss"
import {Auth} from "../../database/auth"

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }
    login(e) {
        e.preventDefault();
        Auth.login(this.state.email, this.state.password).then((err)=>{
            if (err['message'] === undefined && err['code']===undefined) {
                console.log(err);
            } else {
                console.log(err['message'])
            }
        });

    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className="overlay popup base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" placeholder="email" value={this.state.email}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn" onClick={this.login}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
