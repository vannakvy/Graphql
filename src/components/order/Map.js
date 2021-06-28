import React from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import "./Map.css";
import {GET_ONE_ORDER} from '../../graphql/order'
import { UPDATE_CUSTOMER_BY_ID } from "../../graphql/customer";
import {useQuery,useMutation} from '@apollo/client'
import PopUpInMap from './PopUpInMap'
import {Button} from '@material-ui/core'
function Map() {
  const {id} = useParams()

  const [updateCustomer,{data:abc}] = useMutation(UPDATE_CUSTOMER_BY_ID)

console.log(abc)
    const call = () => {
      updateCustomer({
        variables: {
          id: "60cd6cb44dbbcc32d8b29e26",
          name: "Vichet updated",
          tel: "0124578",
          email: "vicheddt@gmail.com",
          customerImage: "gsdfgasdfsadfd.jpg",
        },
      });

    };


  const {data, error, loading} = useQuery(GET_ONE_ORDER,{variables:{
    id: id
  }})

  return (
    <div className="map">
      <Button onClick={()=>call()}>Click</Button>
      <LeafletMap center={[0,0]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
     
        <Marker position={[0,0]}>
    <Popup>
     <PopUpInMap/>
    </Popup>
  </Marker>
      </LeafletMap>
    </div>
  );
}

export default Map;
