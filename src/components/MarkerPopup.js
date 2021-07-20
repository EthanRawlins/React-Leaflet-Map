import React from 'react';
import {Popup} from 'react-leaflet';

const MarkerPopup = (props) => {
  const { FirstName, LastName, PhoneNumber, StreetAddress, City, StateProvince, ZipCode } = props.data;

  return  (<Popup>
    <div className='popup-text'>{`${FirstName}, ${LastName}, Phone: ${PhoneNumber}, Address: ${StreetAddress}, ${City}, ${StateProvince} ${ZipCode}`}</div>
  </Popup>);
};

export default MarkerPopup;
