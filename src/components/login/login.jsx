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
            email: "",
            isValidEmail:"valid",
            password: "",
            isValidPassword:"valid"
        }
    }
    componentDidMount() {

    }

    login(e) {
        e.preventDefault();
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
    validation(valueSet) {
        if(valueSet.content.name === "email"){
            if(valueSet.content.value=== 'firebase'){
                $('#emailValidator').removeClass('valid');
                $('#emailValidator').addClass('not-valid');
                console.log('asdad');
                this.setState({
                    isValidEmail: valueSet.content.message
                })
            }else  if(valueSet.content.value=== ''){
                $('#emailValidator').removeClass('valid');
                $('#emailValidator').addClass('not-valid');
                this.setState({
                    isValidEmail:"Email should not empty"
                });
            }else if(valueSet.content.value!== ''){
                $('#emailValidator').removeClass('not-valid');
                $('#emailValidator').addClass('valid');
                this.setState({
                    isValidEmail:"valid"
                })
            }
        }else if(valueSet.content.name === "password"){
            if(valueSet.content.value=== 'firebase'){
                $('#passwordValidator').removeClass('valid');
                $('#passwordValidator').addClass('not-valid');
                console.log('asdad');
                this.setState({
                    isValidEmail: valueSet.content.message
                })
            }else if(valueSet.content.value=== ''){
                $('#passwordValidator').removeClass('valid');
                $('#passwordValidator').addClass('not-valid');
                this.setState({
                    isValidPassword:"Password should not empty"
                });
            }else if(valueSet.content.value!== ''){
                $('#passwordValidator').removeClass('not-valid');
                $('#passwordValidator').addClass('valid');
                this.setState({
                    isValidPassword:"valid "
                })
            }
        }
    }

    handleChange(e){
        let valueSet={content:{
                name:e.target.name,
                value: e.target.value
            }};
        this.validation(valueSet);
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
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" placeholder="email" value={this.state.email}
                                   onChange={this.handleChange}/>
                            <span id="emailValidator" className="valid">{this.state.isValidEmail}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <span id="passwordValidator" className="valid">{this.state.isValidPassword}</span>
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
