import React from "react";
import loginImg from "./assets/login.svg";
import "./style/style.scss"
import {Auth} from "../../database/auth"
import $ from "jquery";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.validation=this.validation.bind(this);
        this.state = {
            email: '',
            isValidEmail:"valid",
            password: "",
            isValidPassword:"valid"
        }
    }
    componentDidMount() {

    }

    login(e) {
        e.preventDefault();
        let email={content:{
                name:'email',
                value: this.state.email
            }};
        let password={content:{
                name:'password',
                value: this.state.password
            }};
        if(this.validation(email) & this.validation(password)){
            Auth.login(this.state.email, this.state.password).then((err)=>{
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
        if(valueSet.content.name === "email"){
            if(valueSet.content.value=== 'firebase'){
                $('#emailValidator-login').removeClass('valid');
                $('#emailValidator-login').addClass('not-valid');
                this.setState({
                    isValidEmail: valueSet.content.message
                });
                return false;
            }else  if(valueSet.content.value=== ''){
                $('#emailValidator-login').removeClass('valid');
                $('#emailValidator-login').addClass('not-valid');
                this.setState({
                    isValidEmail:"Email should not empty"
                });
                return false;
            }else if(valueSet.content.value!== ''){
                $('#emailValidator-login').removeClass('not-valid');
                $('#emailValidator-login').addClass('valid');
                this.setState({
                    isValidEmail:"valid"
                });
                return true;
            }
        }
        else if(valueSet.content.name === "password"){
            if(valueSet.content.value=== 'firebase'){
                $('#passwordValidator-login').removeClass('valid');
                $('#passwordValidator-login').addClass('not-valid');
                this.setState({
                    isValidEmail: valueSet.content.message
                });
                return false;
            }else if(valueSet.content.value=== ''){
                $('#passwordValidator-login').removeClass('valid');
                $('#passwordValidator-login').addClass('not-valid');
                this.setState({
                    isValidPassword:"Password should not empty"
                });
                return false;
            }else if(valueSet.content.value!== ''){
                $('#passwordValidator-login').removeClass('not-valid');
                $('#passwordValidator-login').addClass('valid');
                this.setState({
                    isValidPassword:"valid "
                });
                return true;
            }
        }
    }

    handleChange(e){
        let valueSet={content:{
                name:e.target.name,
                value: e.target.value
            }};
        let validation=this.validation(valueSet);
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return (
            <div className="overlay popup base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" placeholder="email" value={this.state.email}
                                   onChange={this.handleChange}/>
                            <span id="emailValidator-login" className="valid">{this.state.isValidEmail}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <span id="passwordValidator-login" className="valid">{this.state.isValidPassword}</span>
                        </div>
                    </form>
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
