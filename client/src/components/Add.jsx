import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { postImage } from '../redux/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Add extends Component {
  state = {
    title: this.props.image ? this.props.image.title : '',
    description: this.props.image ? this.props.image.description : '',
    src: this.props.image ? this.props.src : '',
    error: {},
    loading: false,
    done: false
  };
  /**
   * handle input value
   */
  handleChange = (e) => {
    let value = e.target.name === 'src' ? e.target.files[0] : e.target.value;
    if (this.state.error[e.target.name]) {
      let error = Object.assign({}, this.state.error);
      delete error[e.target.name];
      this.setState({ [e.target.name]: value, error });
    } else {
      this.setState({ [e.target.name]: value });
    }
  };
  /**
   * handle submit event
   */
  handleSubmit = (e) => {
    e.preventDefault();

    let error = {};
    if (this.state.title === '') error.title = 'title can not be empty';
    if (this.state.description === '')
      error.description = 'description can not be empty';
    if (this.state.src === '') error.src = 'src can not be empty';
    this.setState({ error });

    let validate = Object.keys(error).length === 0;
    if (validate) {
      const { title, description, src } = this.state;
      this.setState({ loading: true });
      this.props.postImage({ title, description, src }).then(
        () => {
          this.setState({ done: true });
        },
        (err) =>
          err.response.json().then(({ error }) => {
            console.log(error);
            this.setState({ error, loading: false });
          })
      );
    }
  };
  render() {
    const form = (
      <FormStyled
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
        encType="multipart/form-data">
        <Form.Input
          label="Title"
          placeholder={
            this.state.error.title && true ? this.state.error.title : 'Title'
          }
          onChange={this.handleChange}
          name="title"
          error={this.state.error.title && true}
        />
        <Form.Input
          label="Picture"
          type="file"
          accept="image/png, image/jpeg"
          placeholder="Choose your picture"
          onChange={this.handleChange}
          name="src"
          error={this.state.error.src && true}
        />
        <Form.TextArea
          label="Description"
          placeholder={
            this.state.error.description && true
              ? this.state.error.description
              : 'Tell something about your picture'
          }
          onChange={this.handleChange}
          name="description"
          error={this.state.error.description && true}
        />
        <Form.Button>Submit</Form.Button>
      </FormStyled>
    );
    return <Div>{this.state.done ? <Redirect to="/" /> : form}</Div>;
  }
}
export default connect(
  null,
  { postImage }
)(Add);
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormStyled = styled(Form)`
  &&& {
    width: 90%;
    margin: 0 auto;
  }
`;
