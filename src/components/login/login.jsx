import React from "react";
import loginImg from "./assets/login.svg";
import "./style/style.scss"
import {Auth} from "../../database/auth"
import $ from "jquery";
import {LoadingComponent} from "../loading/loadingComponent"

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
            isValidPassword:"valid",
            loadingStatus:false
        }
    }
    componentDidMount() {
    }

    async login(e) {
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
        if (this.validation(email) & this.validation(password)) {
            this.setState({loadingStatus: true});
            Auth.login(this.state.email, this.state.password).then((err) => {
                if (err['message'] === undefined && err['code'] === undefined) {
                    console.log(err);
                } else {
                    // this.validation();
                    if (err.code.includes('email')) {
                        let valueSet = {
                            content: {
                                name: 'email',
                                value: 'firebase',
                                message: err.message
                            }
                        };
                        this.validation(valueSet)
                    } else if (err.code.includes('user-not-found')) {
                        let valueSet = {
                            content: {
                                name: 'email',
                                value: 'firebase',
                                message: err.message
                            }
                        };
                        this.validation(valueSet)
                    }
                    console.log(err)
                }
                this.setState({loadingStatus: false});
            });
        }
        //
        // await setTimeout(
        //     function () {
        //         console.log("kushan");
        //         this.setState({loadingStatus: false});
        //     }
        //         .bind(this),
        //     1000
        // );

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
                if (!RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(valueSet.content.value)) {
                    $('#emailValidator-login').removeClass('valid');
                    $('#emailValidator-login').addClass('not-valid');
                    this.setState({
                        isValidEmail: "Email badly formatted!!"
                    });
                    return false;
                }
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
                <div style={{marginTop:"20px"}}/>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                        <div style={{marginTop:"20px"}}/>
                    </div>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" placeholder="email" value={this.state.email}
                                   onChange={this.handleChange}/>
                            <span id="emailValidator-login" className="valid">{this.state.isValidEmail}</span>
                        </div>
                        <div style={{marginTop:"20px"}}/>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <span id="passwordValidator-login" className="valid">{this.state.isValidPassword}</span>
                        </div>
                    </form>
                </div>
                <div className="footer">
                    {(!this.state.loadingStatus && <button type="submit" className="btn" onClick={this.login}>
                        Login
                    </button>)}
                    {(this.state.loadingStatus && <LoadingComponent/>)}
                </div>
            </div>
        );
    }
}
