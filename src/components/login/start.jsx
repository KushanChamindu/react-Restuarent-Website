import React from "react";
import {Login} from "./login";
import {Register} from "./register";
import pizza from "./assets/pizza.svg";
import "../../App.scss";
import $ from "jquery";

export class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true,
        };
    }

    componentDidMount() {
        //Add .right by default
        this.rightSide.classList.add("right");

    }

    changeLoginState() {
        const {isLogginActive} = this.state;
        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
            $('#login-container').removeClass('appearance-true');
            $('#login-container').addClass('appearance-false');
            $('#register-container').addClass('appearance-true');
            $('#register-container').removeClass('appearance-false');

        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
            $('#register-container').removeClass('appearance-true');
            $('#register-container').addClass('appearance-false');
            $('#login-container').addClass('appearance-true');
            $('#login-container').removeClass('appearance-false');

        }
        this.setState(prevState => ({isLogginActive: !prevState.isLogginActive}));
    }

    render() {
        const {isLogginActive} = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";
        return (
            <div className="background">
                <div className="login">
                    <div className="container" ref={ref => (this.container = ref)}>
                        <div className="appearance-true" id='login-container'>
                            <Login containerRef={ref => (this.current = ref)}/>
                        </div>
                        <div className="appearance-false" id='register-container'>
                            <Register containerRef={ref => (this.current = ref)}/>
                        </div>
                    </div>
                    <RightSide
                        current={current}
                        currentActive={currentActive}
                        containerRef={ref => (this.rightSide = ref)}
                        onClick={this.changeLoginState.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
                <img className="transsionImage" src={pizza}/>
            </div>
        </div>
    );
};

export default Start;