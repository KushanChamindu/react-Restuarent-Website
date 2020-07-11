import React from "react";
import loginImg from "../login/assets/login.svg";
import {Pizza} from "../loading/loading"

export class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let pizza = new Pizza('pizza')

        ;(function update() {
            requestAnimationFrame(update);
            pizza.update()
        }())
    }

    render(){
        return (
            <div className="">
                <canvas id="pizza" style={{width: "54px",height:"54px", overflow:"hidden",}}/>
            </div>
        );
    }
}