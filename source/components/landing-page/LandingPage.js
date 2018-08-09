import React from "react";

// import { resetElementObjects, addElement, onScroll } from "./../scrollTransition";

import Navigation from "./../reusable/Navigation";

import Ice from "./../../../assets/ice.jpg";

export default class LandingPage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div className="landing-page">
                <Navigation
                    redirect={this.props.history.push}
                />
                <h1>Landing Page</h1>

                {/* <img
                    src={Ice}
                /> */}
            </div>
        )
    };
};
