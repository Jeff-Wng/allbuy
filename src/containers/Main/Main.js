import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import MainContent from '../../components/MainContent/MainContent';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Main extends Component {
    componentDidMount() {
        this.props.reset();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <MainContent />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(actions.reset())
    }
}

export default connect(null, mapDispatchToProps)(Main);