import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router';
import './datasets.css';

class DataChild extends React.Component {


  render() {

    const VarName = <div className="tileText" key={'sample' + this.props.item.id}> {this.props.item.varName} </div>;

    const lab = this.props.item.lab &&
                <div className="upperTileText" key={'lab' + this.props.item.id}> Lab : {this.props.item.lab} </div>;

    const species = this.props.item.species &&
                    <div className="upperTileText" key={'species' + this.props.item.id}> Species : {this.props.item.species} </div>;

    const description = this.props.item.description &&
                    <div className="upperTileText" key={'description' + this.props.item.id}> Description : {this.props.item.description} </div>;

    const tissue = this.props.item.tissue &&
                    <div className="upperTileText" key={'tissue' + this.props.item.id}> Tissue : {this.props.item.tissue} </div>;


    let ImgUrl = '';
    switch(this.props.item.species) {
     case "Homo sapiens":
         ImgUrl = "http://frapbot.kohze.com/SpatialMaps/human.jpg";
         break;
     case "Mouse":
         ImgUrl = "http://frapbot.kohze.com/SpatialMaps/mouse.jpg";
          break;
    case "Arabidopsis thaliana":
        ImgUrl = "http://frapbot.kohze.com/SpatialMaps/arabidopsis.jpg";
         break;
     default:
         ImgUrl = "http://frapbot.kohze.com/SpatialMaps/placeholder.jpg";
          break;
    }

    const Image = ImgUrl && <img className="speciesImage" src={ImgUrl}/>;

    const onlySearched = this.props.item.varName &&
                         this.props.item.varName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) !== -1;

    const mainContent = onlySearched ? <Link to={'/dataView/' + this.props.item.id} key={'link' + this.props.item.id}>
         <div  className="dataChild" key={'dataChild' + this.props.item.id}>
           {Image}
           <div className="upperBarChild">
             {lab}
             {species}
             {description}
             {tissue}
           </div>
             {VarName}
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
