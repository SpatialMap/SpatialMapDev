import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router';

class DataChild extends React.Component {

  render() {
    console.log(this.props.item,'item value is');
    return (
          <div style={{height: 200, width: 200, backgroundColor: 'grey'}}>
            <Link to='/dataView'><div> {this.props.item.varName} </div></Link>
          </div>
    );
  }
}

export default DataChild;
