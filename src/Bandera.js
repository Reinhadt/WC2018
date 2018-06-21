import React from 'react';

const Bandera = (props) => {
    console.log(props)
    let flag = props.paises.filter( pais => {
        return pais.code === props.equipo
    })
    let banderaObj = flag[0]

    return(
        <img className="bandera" src={banderaObj.crestUrl} />
    )
}

export default Bandera;