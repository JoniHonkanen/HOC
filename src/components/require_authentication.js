import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) { // tama nain -> requireAuth(Resources)
    class Authentication extends Component {

        static contextTypes = {   //static viittaa classiin (Authentication)
            router: React.PropTypes.object   //alempi  this.context tarvitsee maaritella eka nain
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/');
            }
        }

        render() {
            console.log(this.context);
            console.log('Rendering', ComposedComponent);
            console.log(this.props.authenticated);
            return <ComposedComponent {...this.props} /> //lähettää propsit child komponentille
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
};

