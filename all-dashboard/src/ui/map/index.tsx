import React, { useState } from "react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";

import {
  setDefaults,
  geocode,
  RequestType,
  GeocodeOptions,
  OutputFormat,
} from "react-geocode";
import Image from "next/image";
import LocationIcon from "assets/icons/location.png";
import LocationPinIcon from "assets/icons/location-pin.png";
import { GoogleMapAPI } from "src/constants";
import Loading from "../loading";
import TransparentInput from "../input/transparentInput";
import { MapStyles } from "./styles";

export default function Map(props: MapProps) {
  const { initialLocation, value: coordinates, onChange } = props;
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [searchText, setSearchText] = React.useState("");
  const [selectedPlace, setSelectedPlace] = React.useState<string | null>(null);
  const libraries: Library[] = ["places"];
  // const [markers, setMarkers] = useState([]);

  const { isLoaded: isScriptLoaded } = useLoadScript({
    googleMapsApiKey: GoogleMapAPI,
    libraries,
  });

  // const onMapClick = (e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //     },
  //   ]);
  //   console.log(markers);
  // };

  const defaultSettings: GeocodeOptions = {
    key: GoogleMapAPI,
    language: "en",
    region: "es",
    outputFormat: OutputFormat.JSON,
  };

  setDefaults(defaultSettings);

  const handleChange = (value: any) => {
    map?.panTo({ lat: value.lat, lng: value.lng });
    onChange(value);
  };

  React.useEffect(() => {
    if (selectedPlace && map) {
      //       const service = new google.maps.places.PlacesService(map);
      console.clear();
      // if(service?.findPlaceFromQuery){
      //       service.findPlaceFromQuery({query: String(selectedPlace), fields: ["ALL"]}, (results, status) => {
      //         console.log('mapmapmap resultsresults', results);
      //         console.log('mapmapmap resultsresults', status);
      //       });
      //     }
      //       console.log('mapmapmap', map);
      //       console.log('mapmapmap selectedPlace', selectedPlace);
      geocode(RequestType.ADDRESS, selectedPlace)
        .then((response) => {
          const address_components = response.results[0].address_components;
          const formatted_address = response.results[0].formatted_address || "";

          const landmark = address_components.filter(e => e.types.includes("sublocality"))?.[0]?.long_name;
          const city = address_components.filter(e => e.types.includes("administrative_area_level_3"))?.[0]?.long_name;
          const postal_code = address_components.filter(e => e.types.includes("postal_code"))?.[0]?.long_name;
          const country = address_components.filter(e => e.types.includes("country"))?.[0]?.long_name;
          const { lat, lng } = response.results[0].geometry.location;
          handleChange({ lat, lng, formatted_address, landmark, city, postal_code, country });
        })
        .catch(console.error);
    }
  }, [selectedPlace, map]);

  if (!isScriptLoaded) return <Loading />;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
        }}
        onClick={e => handleChange({ lat: e?.latLng?.lat(), lng: e?.latLng?.lng() })}
        center={coordinates}
        zoom={13}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: MapStyles,
        }}
        onLoad={(map) => setMap(map)}
      // onClick={onMapClick}
      >
        {/* {markers.map((marker) => (
          <MarkerF
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ))} */}
        <MarkerF position={coordinates} />
        {/* <MarkerF position={{lat: 0.00, lng: 0.00}} */}
        <div className="flex items-center gap-2 absolute top-2 left-3 md:left-0 md:right-0 md:mx-2 md:justify-center">
          <div className="flex flex-row items-center border-solid border-black rounded-[22px] bg-white px-4 py-2 shadow-md">
            <Image src={LocationPinIcon} alt="location-pin" />
            <Autocomplete
              onLoad={(autocomplete) => {
                autocomplete.addListener("place_changed", () => {
                  const place = autocomplete.getPlace();
                  if (place.formatted_address) {
                    console.log('placeplace', place);
                    setSearchText(place.formatted_address);
                    setSelectedPlace(place.formatted_address);
                  }
                });
              }}
            >
              <TransparentInput
                placeholder="Enter location manually"
                value={searchText}
                onChange={(value) => setSearchText(value)}
              />
            </Autocomplete>
          </div>
          <button
            onClick={() => {
              handleChange(initialLocation);
            }}
            className="p-2 bg-white rounded-md shadow-md"
          >
            <Image src={LocationIcon} alt="location" />
          </button>
        </div>
      </GoogleMap>
    </div>
  );
}

interface MapProps {
  initialLocation: LatLng;
  value: LatLng;
  onChange: (value: LatLng) => void;
}
