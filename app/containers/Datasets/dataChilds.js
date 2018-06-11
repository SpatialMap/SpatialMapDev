import React         from 'react';
import * as firebase from 'firebase';
import { Link }      from 'react-router';
import './datasets.css';

class DataChild extends React.Component {

  render() {
    const VarName = <div className="tileText" key={'sample' + this.props.item.id}> {this.props.item.varName} </div>;

    const lab = this.props.item.lab &&
                    <div className="upperTileText" key={'lab' + this.props.item.id}>         Lab : {this.props.item.lab} </div>;

    const species = this.props.item.species &&
                    <div className="upperTileText" key={'species' + this.props.item.id}>     Species : {this.props.item.species} </div>;

    const description = this.props.item.description &&
                    <div className="upperTileText" key={'description' + this.props.item.id}> Description : {this.props.item.description} </div>;

    const tissue = this.props.item.tissue &&
                    <div className="upperTileText" key={'tissue' + this.props.item.id}>      Tissue : {this.props.item.tissue} </div>;

    let ImgUrl = '';
    switch(this.props.item.species) {
     case "Homo sapiens":
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fhuman.jpg?alt=media&token=dbb2d4eb-a74e-427b-9098-aa384daea8c7";
            break;
     case "Mouse":
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fmouse.jpg?alt=media&token=b4894eca-5bc8-483e-a698-e57e793ead24";
            break;
     case "Arabidopsis thaliana":
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Farabidopsis.jpg?alt=media&token=e8c318fd-f6b4-47dc-850d-ae193ad64366";
            break;
     case "Gallus gallus":
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fgallus.jpg?alt=media&token=6d4001bf-b66b-4d09-b0d8-418ad34acf25";
            break;
     case "Drosophila melanogaster":
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fdrosophila.jpg?alt=media&token=9aaa5686-b3db-42c1-8590-1e391fe4dbd9";
            break;
     default:
            ImgUrl = "https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fplaceholder.jpg?alt=media&token=260ddb34-2820-47e2-a216-fce8abdf77b1";
            break;
    }

    const Image = ImgUrl && <img className="speciesImage iconFadeIn" src={ImgUrl}/>;
    const onlySearched = this.props.item.varName && this.props.item.public &&
                         Object.values(this.props.item).toString().toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) !== -1 &&
                         Object.values(this.props.item).toString().toLowerCase().indexOf(this.props.organelleSelection.toLowerCase()) !== -1 &&
                         Object.values(this.props.item).toString().toLowerCase().indexOf(this.props.speTisSelection.toLowerCase()) !== -1;

    console.log(onlySearched);
    const mainContent = onlySearched ?
    <Link to={'/dataView/' + this.props.item.id} key={'link' + this.props.item.id}>
         <div className="dataChild divFadeIn" key={'dataChild' + this.props.item.id}>
           <div className="col-sm-9 description">
             {lab}
             {species}
             {description}
             {tissue}
           </div>
           <div className="col-sm-2" style={{backgroundColor: "#fff", textAlign: "left", padding: 2}}>
             {VarName}
           </div>
           <div className="col-sm-1" style={{padding: 0}}>
             {Image}
           </div>
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
