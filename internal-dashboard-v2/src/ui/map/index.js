import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Autocomplete,   MarkerF, useLoadScript } from "@react-google-maps/api";
import { setDefaults, geocode, RequestType, GeocodeOptions, OutputFormat,} from "react-geocode";
import { INPUT_STYLE } from "../../constants";

const TOKEN = "AIzaSyC8DuXEQ8kS9ZteOicKDqYBzmfapH4qRNc";

function Map({payload, setPayload,onChange }) {
  const [selectedPlace, setSelectedPlace] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const libraries = ['places']

  const { isLoaded: isScriptLoaded } = useLoadScript({ googleMapsApiKey: TOKEN, libraries});

  const [map, setMap] = useState(null)

  const defaultSettings = {
    key: TOKEN,
    language: "en",
    region: "es",
    outputFormat: OutputFormat.JSON,
  };

  setDefaults(defaultSettings);

  useEffect(() => {
    if ( selectedPlace && map ) {
      
      geocode('address',  selectedPlace)
      .then((response) => {
        const address_components = response.results[0].address_components;
        const formatted_address = response.results[0].formatted_address || "";
  
        const landmark = address_components.filter(e => e.types.includes("sublocality"))?.[0]?.long_name;
        const city = address_components.filter(e => e.types.includes("administrative_area_level_3"))?.[0]?.long_name;
        const postal_code = address_components.filter(e => e.types.includes("postal_code"))?.[0]?.long_name;
        const country = address_components.filter(e => e.types.includes("country"))?.[0]?.long_name;
        const { lat, lng } = response.results[0].geometry.location;
  
        handleMapOnChange({ lat, lng, formatted_address, landmark, city, postal_code, country,  })

        // setPayload((prev) => {return {
        //   ...prev,
        //   location_latitude: lat,
        //   location_longitude: lng,
        //   address: {...prev.address, pin:postal_code, city:city, landmark:landmark  }
        // }})
      })
      .catch(e => {
        console.log(e)
      })
    }

    console.log('selectedPlace', selectedPlace)

    


  }, [map, selectedPlace])
  
  const handleMapOnChange = (value) => {
    map?.panTo({ lat: value.lat, lng: value.lng });
    onChange(value);

  //  console.log('latitude', latitude, 'longitudel',longitude)
  //  setPayload((prev) => {return {...prev, location_latitude:latitude,location_longitude:longitude }})

  }

  if (!isScriptLoaded) return 'loading....';

  return (
    <div className="overflow-hidden relative mt-4">
      <GoogleMap
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          // styles: MapStyles,
        }}
       center={{lat:payload?.location_latitude, lng:payload?.location_longitude}}
       mapContainerStyle={{ height: "670px", width:'450px'}}
       onClick={e => handleMapOnChange({ lat: e?.latLng?.lat(), lng: e?.latLng?.lng() })}
       zoom={5}
       onLoad={(map) => setMap(map)}
     
      >
      <MarkerF position={{lat:payload?.location_latitude, lng:payload?.location_longitude}}/>

      <div className="flex items-center absolute top-4 left-0 right-0 ml-3 ">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if ( place?.formatted_address ) {
                  setSearchLocation( place?.formatted_address )
                  setSelectedPlace( place.formatted_address )
                }
              })
            }}
            >
              <input
                className={`${INPUT_STYLE}`}
                placeholder="Enter Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
          </Autocomplete>
      </div>

      </GoogleMap>
    </div>
  );
}

export default Map;
