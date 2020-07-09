import React from "react";
import {Login} from "./login";
import {Register} from "./register";
import pizza from "./assets/pizza.svg";
import "../../App.scss";

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
        const { isLogginActive } = this.state;

        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }
    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";
        return (
            <div className="background">
                <div className="login">
                    <div className="container" ref={ref => (this.container = ref)}>
                        {isLogginActive && (
                            <Login containerRef={ref => (this.current = ref)} />
                        )}
                        {!isLogginActive && (
                            <Register containerRef={ref => (this.current = ref)} />
                        )}
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
                <img className="transsionImage" src={pizza} />
            </div>
        </div>
    );
};

export default Start;