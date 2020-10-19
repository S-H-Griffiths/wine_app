import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Intro from "./intro";
import Navigation from "./navigation";
import Hamburger from "./hamburger";
import Selection from "./selection";
import Result from "./result";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
        };
    }
    toggleUploader() {
        // console.log("I update the state and hide the uploader");
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="nav">
                        <Logo />
                        <Navigation
                            toggleUploader={() => this.toggleUploader()}
                        />
                    </div>
                    <Route exact path="/" render={() => <Intro />} />
                    <Route
                        exact
                        path="/selection"
                        render={() => <Selection />}
                    />
                    <Route path="/result" render={() => <Result />} />
                    {this.state.uploaderVisible && (
                        <Hamburger
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
                <footer className="footer">© SIÂN GRIFFITHS 2020</footer>
            </BrowserRouter>
        );
    }
}

export default App;
