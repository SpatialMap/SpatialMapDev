import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router';
import './datasets.css';

class DataChild extends React.Component {

  render() {
    const lab = this.props.item.lab &&
                <div className="tileText" key={'lab' + this.props.item.id}> Lab : {this.props.item.lab} </div>;

    const species = this.props.item.species &&
                    <div className="tileText" key={'species' + this.props.item.id}> Species : {this.props.item.species} </div>;

    const onlySearched = this.props.item.varName &&
                         this.props.item.varName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) !== -1;

    const mainContent = onlySearched ? <Link to={'/dataView/' + this.props.item.id} key={'link' + this.props.item.id}>
         <div  className="dataChild" key={'dataChild' + this.props.item.id}>
           <div className="tileText" key={'sample' + this.props.item.id}> Sample : {this.props.item.varName} </div>
           {lab}
           {species}
         </div>
     </Link> : null;

    return (
      <div>
       {mainContent}
     </div>
    );
  }
}

export default DataChild;
