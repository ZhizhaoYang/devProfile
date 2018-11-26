import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Checkbox,
  Button,
  Form,
  Container,
  Grid,
  Header,
  Icon
} from "semantic-ui-react";

import {
  createProfile,
  getCurrentUserProfile
} from "../../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileUserName: "",
      location: "",
      jobStatus: "",
      phone: "",
      bio: "",
      skills: [],
      errors: []
    };
  }

  componentDidMount = () => {
    document.title = "Edit Profile Page";
    this.props.getCurrentUserProfile();
  };

  render() {
    return (
      <Container className="EditProfile" as="div">
        <Grid style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" textAlign="center">
                <Icon name="edit outline" />
                Edit Your Profile
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Form>
                <Form.Field width={16}>
                  <label>Profile User Name:</label>
                  <input placeholder="Enter your user name" />
                </Form.Field>

                <Form.Field>
                  <label>Status</label>
                  <input placeholder="Enter job status" />
                </Form.Field>

                <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>

                <Button type="submit" color="teal">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserProfile: () => {
    dispatch(getCurrentUserProfile());
  },
  createProfile: (profileData, history) => {
    dispatch(createProfile(profileData, history));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
