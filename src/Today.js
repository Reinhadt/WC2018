import React, {Component} from  'react';
import axios from 'axios';
import Partido from './Partido';


class Today extends Component{
    constructor(props){
        super(props);

        this.state = {
            hoy: null,
            current: []
        }

        this.getToday = this.getToday.bind(this);
    }

    getToday() {
        axios.get('https://worldcup.sfg.io/matches/today')
            .then( response  => {

              //console.log(response.data);
              if(response.data.length > 0){
                this.setState({ hoy: response.data })
              }else{
                this.setState({ hoy: null })
              }
            })
    }

    componentDidMount(){
        //console.log(this.props)
        this.getToday();
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log(nextProps.c)
        return this.props.f === true || nextProps.c !== this.props.c || this.props.c !== null
    }

    render(){
    //console.log("TODAY")
    let today;
    if(this.state.hoy !== null && this.props.e !== null){

        if(this.props.f === false){
          today = this.state.hoy.filter( e => {
            return e.fifa_id !== this.props.c.fifa_id
          }).map( h => {
            return (
              <Partido partido={h} paises={this.props.e} />
            )
          })
        }else if(this.props.f === true){
          today = this.state.hoy.map( h => {
            return (
              <Partido partido={h} paises={this.props.e} />
            )
          })
        }


    }

        return(
            <div className="flexContainer today">
                {this.state.hoy!==null?today:<p>No matches for today :(</p>}
            </div>
        )
    }

}


export default Today


//HAZ EL AXIOS.GET DE TODAY AQUÍ EN EL COMPONENT DID MOUNT
//CADA QUE ACTUALICE EL STATE COMO EN CURRENT===NULL SE ACTUALIZA ESTE COMPONENTE
//Y TIENES EL TODAY ACTUALIZADO(?)
//SI EL FLAG ES TRUE, ACTUALIZAS, SI NO POS NO(?)


//HACER COMPONENT SHOULD UPDATE?
