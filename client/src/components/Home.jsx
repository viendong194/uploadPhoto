import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { getImages } from '../redux/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Home extends Component {
  componentDidMount() {
    this.props.getImages();
  }
  render() {
    return (
      <Div>
        {this.props.images.map((image,i) => (
          <CardStyled key={i}>
            <Image src={image.url} />
            <Card.Content>
              <Card.Header>{image.title}</Card.Header>
              <Card.Description>{image.description}</Card.Description>
            </Card.Content>
          </CardStyled>
        ))}
      </Div>
    );
  }
}
function mapStateToPros(state) {
  return {
    images: state.images
  };
}
export default connect(
  mapStateToPros,
  { getImages }
)(Home);
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const CardStyled = styled(Card)`
  &&& {
    width: 20%;
    margin: 0 2% 2%;
  }
`;
