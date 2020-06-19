import React from 'react';
import {} from 'react-bootstrap';

var CustomHeading = (props) => {

    const H = 'h' + (props.level ? props.level : '1');
    // console.log(H);
    return( 
        <H> {props.text || props.children}  </H>
    );
}

export default CustomHeading;