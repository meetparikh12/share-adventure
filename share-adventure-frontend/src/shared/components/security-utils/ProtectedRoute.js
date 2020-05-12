import React from 'react'
import { Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function ProtectedRoute({component:Component, userInfo, ...otherProps}) {
    return <Route {...otherProps} render = { (props) => {
        if(userInfo.userId) {
        return <Component {...props}/> }
        else{
            return <Redirect to="/"/> 
        }
    }}
    />
}

const mapStateToProps = state => {
    return {
        userInfo : state.user.loginUserInfo
    }
}

export default connect(mapStateToProps,null)(ProtectedRoute);
