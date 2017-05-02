import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router';
import './datasets.css';

class DataChild extends React.Component {

  render() {
    return (
          <Link to='/dataView'><div className="dataChild">
            <div className="tileText"> Sample : {this.props.item.varName} </div>
            <div className="tileText"> Lab : {this.props.item.lab} </div>
            <div className="tileText"> Species : {this.props.item.species} </div>
          </div>
        </Link>
    );
  }
}

export default DataChild;
