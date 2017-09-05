/*
 *
 * Profile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectProfile from './selectors';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import "./profile.css"


export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      msnsets: [],
      keyMatches: [],
      loading: true,
      searchTerm: this.props.params.search ? this.props.params.search : '',
    }
  }

  componentDidMount(){
    var msnsets = [];
    firebase.database().ref('meta').on("child_added", (snapshot) => {
          let set = snapshot.val();
          msnsets.push({
            id: snapshot.getKey(),
            description: set.Description,
            author: set.author,
            contact: set.contact,
            email: set.email,
            lab: set.lab,
            operator: set.operator,
            species: set.species,
            tissue: set.tissue,
            title:set.title,
            varName: set.varName,
          })

          this.setState({
            msnsets : msnsets,
            loading: false,
          })
    })
  };

  render() {
    var user = firebase.auth().currentUser;
    if (user != null) {
       var email = user.email;
       var uid = user.uid;
       var name = user.displayName;
    } else {
       var email = "not logged in";
       var uid = "not logged in";
       var name = "not logged in";
    }

    const DataSetItem = this.state.msnsets.map((detail) =>
      <DataChild key={'dataChild'+detail.id} item={detail} searchTerm={this.state.searchTerm} />
    );

    const loader =  <div className="loader">
                      <Spinner size={SpinnerSize.large} />
                    </div>;

    const flexTiles = <div> {DataSetItem} </div>;
    const itemContainer = this.state.loading == true ? loader : flexTiles;
    const keyContainer = <div> works </div>;

    return (

      <div>
        <Helmet
          title="Profile"
          meta={[
            { name: 'description', content: 'Description of Profile' },
          ]}
        />
      <div className="container">
          <div className="profileData">
             <h1> Profile </h1>
              Email: {email}
              <br/>
          </div>
          <div className="uploadData">
            upload placeholder
          </div>
          <div className="myData">
            {itemContainer}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
