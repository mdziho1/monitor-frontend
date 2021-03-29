import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { RouteLink } from "../../store/modules/menu/menu";
import classnames from "classnames";
import { connect } from "react-redux";
import Devices from "../../pages/Devices/Devices";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Reporting from "../../pages/Reporting/Reporting";
import ManageDevice from "../../pages/ManageDevice/ManageDevice";
import TwoFactorAuthentication from "../TwoFactorAuthentication/TwoFactorAuthentication";
import { Spinner } from "../Spinner/Spinner";

const Layout = ({ isMenuExpanded, loginAsync, userAsync, user }) => {
    if (loginAsync || userAsync) {
        return <Spinner/>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={classnames("layout", { "menu-expanded": isMenuExpanded })}>
            <Header/>

            <div className='main-view'>
                <Switch>
                    <Route exact path={RouteLink.Dashboard} component={Dashboard}/>
                    <Route path={RouteLink.Devices} component={Devices}/>
                    <Route path={RouteLink.Reporting} component={Reporting}/>
                    <Route path={RouteLink.ManageDevice} component={ManageDevice}/>
                    <Route path={RouteLink.TwoFactorAuthentication} component={TwoFactorAuthentication}/>
                </Switch>
            </div>
        </div>
    )
};

export default connect(
    (state) => ({
        isMenuExpanded: state.menu.isMenuExpanded,
        loginAsync: state.login.loginAsync,
        userAsync: state.login.userAsync,
        user: state.login.user,
    }),
    {}
)(Layout);
