import React from "react";
import { Link } from "react-router-dom";

import Navigation from "./reusable/Navigation";

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Navigation
                    redirect={this.props.history.push}
                />
                <h1>Page not found :(</h1>
            </div>
        );
    };
};
