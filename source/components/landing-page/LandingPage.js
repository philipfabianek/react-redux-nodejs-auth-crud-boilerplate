import React from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__content">
                    <h1>NODEJS BOILERPLATE</h1>

                    <div>
                        <Link
                            className="landing-page__content__register"
                            to="/register"
                        >
                            REGISTER
                        </Link>

                        <Link
                            className="landing-page__content__login"
                            to="/login"
                        >
                            LOGIN
                        </Link>
                    </div>
                </div>
            </div>
        )
    };
};
