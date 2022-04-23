import React, {useState} from 'react';
import "./BlocoLeitura.css"

const BlocoLeitura = ({title, position, onChangeInput, onClickButton}) => {
    return (
        <div className="container">
            <p className="title">{title}</p> 
            <div className="inputBox">
                <input type="file" onChange={onChangeInput}/>
            </div>
            <button className="button" onClick={onClickButton} >Avançar</button>
            <div className="positionRow">
                <div className={`circle ${position == "1" ? 'activeCircle' : ''}`} />
                <div className={`circle ${position == "2" ? "activeCircle" : ''}` } />
                <div className={`circle ${position == "3" ? 'activeCircle' : ''}`} />
            </div>
        </div>
    );
}

export {BlocoLeitura};