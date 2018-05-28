import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/Actions/index';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import Apparel from './containers/Apparel/Apparel';
import Game from './containers/Game/Game';
import Toy from './containers/Toy/Toy';
import ApparelPage from './containers/Apparel/ApparelPage/ApparelPage';
import GamePage from './containers/Game/GamePage/GamePage';
import ToyPage from './containers/Toy/ToyPage/ToyPage';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Ordered from './containers/Ordered/Ordered';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }

  render() {
    let apparelRoutes = this.props.apparelItems.map(routes => {
      return <Route path={'/apparel/' + routes.name} exact component={ApparelPage} key={routes.name} />
    })

    let gameRoutes = this.props.gameItems.map(routes => {
      return <Route path={'/games/' + routes.name} exact component={GamePage} key={routes.name} />
    })

    let toyRoutes = this.props.toyItems.map(routes => {
      return <Route path={'/toys/' + routes.name} exact component={ToyPage} key={routes.name} />
    })


    return (
      <div className="App">
        <Route path='/' exact component={Main} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/apparel' exact component={Apparel} />
        <Route path='/games' exact component={Game} />
        <Route path='/toys' exact component={Toy} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/checkout' exact component={Checkout} />
        <Route path='/orders' exact component={Orders} />
        <Route path='/ordered' exact component={Ordered} />
        {apparelRoutes}
        {gameRoutes}
        {toyRoutes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    apparelItems: state.apparel.items,
    gameItems: state.game.items,
    toyItems: state.toy.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.checkAuth())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)((App)));
