import React from 'react'
import { Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
    userInfo: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        userInfo : state.user.loginUserInfo
    }
}

export default connect(mapStateToProps,null)(ProtectedRoute);
