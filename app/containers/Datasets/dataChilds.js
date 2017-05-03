import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router';
import './datasets.css';

class DataChild extends React.Component {

  render() {
    return (
          <Link to={'/dataView/' + this.props.item.id} key={'link' + this.props.item.id}>
            <div className="dataChild" key={'dataChild' + this.props.item.id}>
              <div className="tileText" key={'sample' + this.props.item.id}> Sample : {this.props.item.varName} </div>
              <div className="tileText" key={'lab' + this.props.item.id}> Lab : {this.props.item.lab} </div>
              <div className="tileText" key={'species' + this.props.item.id}> Species : {this.props.item.species} </div>
              <div className="tileText" key={'id' + this.props.item.id}> id : {this.props.item.id} </div>
            </div>
        </Link>
    );
  }
}

export default DataChild;
