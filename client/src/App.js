import React, { Component } from 'react';
import { Link,Route,Switch} from 'react-router-dom';
import { Menu,Icon } from 'semantic-ui-react';
import Home from './components/Home';
import Add from './components/Add';
import styled  from 'styled-components';


class App extends Component {
  render() {
    return (
      <Div>
        <MenuWrapper>
          <Menu.Item as={Link} to="/"><Icon name="home"/>Home</Menu.Item>
          <Menu.Item as={Link} to="/add"><Icon name="plus"/>Add</Menu.Item>
        </MenuWrapper>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/add" component={Add}/>
        </Switch>
      </Div>
    );
  }
}

export default App;
const Div = styled.div`
  width:100%;
  max-width: 1000px;
  min-width: 800px;
  margin: 0 auto;
`
const MenuWrapper = styled(Menu)`
  &&&{
    margin:30px 0 !important;
  }
`