import React from "react";
import loginImg from "./assets/login.svg";
import "./style/style.scss"
import {Auth} from "../../database/auth";
import $ from "jquery";


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.state = {
            email: '',
            isValidEmail: "valid",
            password: "",
            isValidPassword: "valid",
            username: "",
            isValidUsername: "valid",
        }
    }

    async signUp(e) {
        e.preventDefault();
        let email = {
            content: {
                name: 'email',
                value: this.state.email
            }
        };
        let password = {
            content: {
                name: 'password',
                value: this.state.password
            }
        };
        let username = {
            content: {
                name: 'username',
                value: this.state.username
            }
        };
        if(this.validation(email) & this.validation(password) & this.validation(username)){
            Auth.signUp(this.state.email, this.state.password, this.state.username).then((err) => {
                if (err['message'] === undefined && err['code']===undefined) {
                    console.log(err);
                } else {
                    // this.validation();
                    if(err.code.includes('email')){
                        let valueSet={content:{
                                name:'email',
                                value: 'firebase',
                                message:err.message
                            }};
                        this.validation(valueSet)
                    }else if(err.code.includes('user-not-found')){
                        let valueSet={content:{
                                name:'email',
                                value: 'firebase',
                                message:err.message
                            }};
                        this.validation(valueSet)
                    }
                    console.log(err)
                }
            });
        }
    }

    validation(valueSet) {
        if (valueSet.content.name === "email") {
            if (valueSet.content.value === 'firebase') {
                $('#emailValidator-register').removeClass('valid');
                $('#emailValidator-register').addClass('not-valid');
                this.setState({
                    isValidEmail: valueSet.content.message
                });
                return false;
            } else if (valueSet.content.value === '') {
                $('#emailValidator-register').removeClass('valid');
                $('#emailValidator-register').addClass('not-valid');
                this.setState({
                    isValidEmail: "Email should not empty"
                });
                return false;
            } else if (valueSet.content.value !== '') {
                if (!RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(valueSet.content.value)) {
                    $('#emailValidator-register').removeClass('valid');
                    $('#emailValidator-register').addClass('not-valid');
                    this.setState({
                        isValidEmail: "Email badly formatted!!"
                    });
                    return false;
                }
                $('#emailValidator-register').removeClass('not-valid');
                $('#emailValidator-register').addClass('valid');
                this.setState({
                    isValidEmail: "valid"
                });
                return true;
            }
        } else if (valueSet.content.name === "password") {
            if (valueSet.content.value === 'firebase') {
                $('#passwordValidator-register').removeClass('valid');
                $('#passwordValidator-register').addClass('not-valid');
                this.setState({
                    isValidEmail: valueSet.content.message
                });
                return false;
            } else if (valueSet.content.value === '') {
                $('#passwordValidator-register').removeClass('valid');
                $('#passwordValidator-register').addClass('not-valid');
                this.setState({
                    isValidPassword: "Password should not empty"
                });
                return false;
            } else if (valueSet.content.value !== '') {
                if (valueSet.content.value.length <= 6) {
                    $('#passwordValidator-register').removeClass('valid');
                    $('#passwordValidator-register').addClass('not-valid');
                    this.setState({
                        isValidPassword: "More than 6 characters valid "
                    });
                    return false;
                }
                $('#passwordValidator-register').removeClass('not-valid');
                $('#passwordValidator-register').addClass('valid');
                this.setState({
                    isValidPassword: "valid "
                });
                return true;
            }
        } else if (valueSet.content.name === "username") {
            if (valueSet.content.value === '') {
                $('#usernameValidator-register').removeClass('valid');
                $('#usernameValidator-register').addClass('not-valid');
                this.setState({
                    isValidUsername: "Username should not empty"
                });
                return false;
            } else if (valueSet.content.value !== '') {
                $('#usernameValidator-register').removeClass('not-valid');
                $('#usernameValidator-register').addClass('valid');
                this.setState({
                    isValidUsername: "valid"
                });
                return true;
            }
        }
    }

    handleChange(e) {
        let valueSet = {
            content: {
                name: e.target.name,
                value: e.target.value
            }
        };
        let validation = this.validation(valueSet);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="username" name="username" placeholder="username" value={this.state.username}
                                   onChange={this.handleChange}/>
                            <span id="usernameValidator-register" className="valid">{this.state.isValidUsername}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="email" value={this.state.email}
                                   onChange={this.handleChange}/>
                            <span id="emailValidator-register" className="valid">{this.state.isValidEmail}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <span id="passwordValidator-register" className="valid">{this.state.isValidPassword}</span>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn" onClick={this.signUp}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}
