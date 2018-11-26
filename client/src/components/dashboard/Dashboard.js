import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Button, Container } from "semantic-ui-react";

import { getCurrentUserProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

import isEmpty from "../../toolKit/isEmpty";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  componentDidMount = () => {
    document.title = "Dashboard Page";
    this.props.getCurrentUserProfile();
  };

  render() {
    let dashboardContent;
    const { userProfile, loading } = this.props.profile;

    if (isEmpty(userProfile)) {
      dashboardContent = "Go to Create Your Profile";
    } else {
      if (userProfile === null || loading) {
        dashboardContent = <Spinner />;
      } else {
        if (Object.keys(userProfile).length > 0) {
          dashboardContent = (
            <Container>
              <h1>Dashboard Page</h1>
              <Link to="/userProfile">
                <Button color="blue">Go to current profile</Button>
              </Link>
              <Link to="/editProfile">
                <Button color="blue">Edit Profile</Button>
              </Link>
            </Container>
          );
        }
      }
    }

    return <div className="dashboard">{dashboardContent}</div>;
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
  }
});

Dashboard.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  getCurrentUserProfile: propTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
