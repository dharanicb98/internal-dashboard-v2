import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
const TOKEN = "AIzaSyC8DuXEQ8kS9ZteOicKDqYBzmfapH4qRNc";

function Map() {
  // console.log('map component rendered')
  const [payload, setPayload] = useState({
    location_latitude: "",
    location_longitude: "",
    address: [
      {
        country: "",
        region: "",
        destination: "",
        house: "",
        area: "",
        street: "",
        landmark: "",
        city: "",
        pin: "",
      },
    ],
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace(place);
      // console.log("Selected Place:", place);
    }
  };
  return (
    <div className="mt-8">
      <LoadScript googleMapsApiKey={TOKEN} libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={{ height: "800px", width: "450px" }}
          zoom={5}
          center={{ lat: 23.4241, lng: 53.8478 }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Autocomplete
            onLoad={(autocomplete) => {
              // console.log("Autocomplete loaded:", autocomplete);
              autocompleteRef.current = autocomplete; // Assign the Autocomplete instance to the ref
            }}
            onPlaceChanged={handlePlaceSelect} // Use the handler directly
          >
            <input
              type="text"
              placeholder="Search for a location"
              style={{
                boxSizing: "border-box",
                border: "1px solid transparent",
                width: "240px",
                height: "32px",
                padding: "0 12px",
                borderRadius: "3px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                outline: "none",
                textOverflow: "ellipses",
                position: "absolute",
                left: "50%",
                marginTop: "20px",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
