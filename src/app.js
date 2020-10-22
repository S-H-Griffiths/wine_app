import React, { useEffect } from "react";
import axios from "./axios";
import Logo from "./logo";
import Intro from "./intro";
import Navigation from "./navigation";
import Hamburger from "./hamburger";
import Selection from "./selection";
import Result from "./result";
import Saved from "./saved";
import Wines from "./wine-list";
import Add from "./add";
import Registration from "./registration.js";
import Login from "./login";
import ResetPassword from "./reset";
import Shop from "./new-shop";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            wineList: {},
            loggedIn: false,
            userType: "",
        };
    }
    componentDidMount() {
        (async () => {
            let resp = await axios.get("/api-login");
            console.log("from db", resp.data);
            this.setState({
                loggedIn: resp.data.loggedIn,
                userType: resp.data.userType,
            });
        })();
    }
    // componentDidUpdate() {
    //     (async () => {
    //         let resp = await axios.get("/api-login");
    //         console.log("from db", resp.data);
    //         this.setState({
    //             loggedIn: resp.data.loggedIn,
    //             userType: resp.data.userType,
    //         });
    //     })();
    // }

    toggleUploader() {
        // console.log("I update the state and hide the uploader");
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }
    wineList(arg) {
        // console.log("I am trying to save the winelist", arg);
        this.setState({
            wineList: arg,
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
                            loggedIn={this.state.loggedIn}
                            userType={this.state.userType}
                        />
                    </div>
                    <Route exact path="/" render={() => <Intro />} />
                    <Route
                        exact
                        path="/selection"
                        render={() => (
                            <Selection wineList={(arg) => this.wineList(arg)} />
                        )}
                    />
                    <Route
                        path="/result"
                        render={() => (
                            <Result
                                wineList={this.state.wineList}
                                wineFunction={(arg) => this.wineList(arg)}
                            />
                        )}
                    />
                    <Route
                        path="/saved"
                        render={() => (
                            <Saved
                                wineFunction={(arg) => this.wineList(arg)}
                                loggedIn={this.state.loggedIn}
                                userType={this.state.userType}
                            />
                        )}
                    />
                    <Route
                        path="/all-wines"
                        render={() => (
                            <Wines
                                wineFunction={(arg) => this.wineList(arg)}
                                loggedIn={this.state.loggedIn}
                            />
                        )}
                    />
                    <Route
                        path="/add-wines"
                        render={() => (
                            <Add
                                loggedIn={this.state.loggedIn}
                                userType={this.state.userType}
                            />
                        )}
                    />
                    <Route
                        path="/register"
                        render={() => (
                            <Registration loggedIn={this.state.loggedIn} />
                        )}
                    />
                    <Route
                        path="/new-shop"
                        render={() => <Shop loggedIn={this.state.loggedIn} />}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
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
