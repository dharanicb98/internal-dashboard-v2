import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateListings from '../../components/forms/createListings'
import CreateListing from '../../components/createListing.js'
import {getExtraServices,  getCategories, getAmenitiesGroup,getProcessingFee, getAmenities, getHouseRules, getOffers, getAddons } from '../../store/reducers/listingAttributesSlice'
import { useDispatch } from 'react-redux'
import { getListingById } from '../../services/listingsServices'
import { getRegions } from '../../store/reducers/regionSlice'
import { getDestionations } from '../../store/reducers/destinationSlice'
import { getUsers } from '../../store/reducers/userSlice'


function ListingDetails() {
  const [payload, setPayload] = useState({
    permalink:'',
    title:'',
    description:'',
    address:{ country:'', country_id:'', region:'', destination:'', house:'', area:'', street:'', landmark:'', city:'', pin:''},
    location_latitude:23.4241,
    location_longitude:53.8478,
    currency:'USD',
    currency_symbol:'$',
    is_custom_rule:false,
    custom_rule:'',
    check_in_time:'12:00 AM',
    check_out_time:'12:00 AM',
    is_quite_hours:false,
    quite_hours_from:'12:00 AM',
    quite_hours_to:'12:00 AM',
    rules:[],
    categories:[],
    offers:[],
    add_ons:[],
    amenities:[],
    extra_services:[],
    long_term_discount:[],
    no_of_guests_max:0,
    no_of_bedrooms_max:0,
    no_of_beds_max:0,
    no_of_washroom_max:0,
    max_allowed_guests:0,
    max_free_guests:0,
    max_bookings_days:0,
    no_of_pets_allowed:0,
    price_per_additional_guest:0,
    is_self_checkin:false,
    is_instant_book:false,
    wifi_network_name:'',
    wifi_network_password:'',
    wifi_upload_speed:0,
    wifi_download_speed:0,
    extra_guests: {max_free:0, additional_cost:0, blocks:[]},
    reservation_length: {min_days:0, max_days: 0, blocks:[]},
    basic_pricing:{ base_price: 0, weekend_price: 0, security_deposit: 0, blocks: []},
    guests: {children: 0, adults: 0, infants: 0},
    processing_fee:'',
    host_id:'2',
    media: []
  })
  const [createListing, setCreateListing] = useState( true )
  
  
  const params = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    if ( params?.id === 'create' ) {
        setCreateListing(true)
        console.log('params', params)
    }
    else {
      const data = await getListingById(params?.id)
      if (data) {
        let obj = {
          permalink: data?.permalink || '',
          title: data?.title || '',
          description: data.description || '',
          location_latitude: data?.location_latitude || 0,
          location_longitude: data?.location_longitude || 0,
          currency: data?.currency ||  'USD',
          currency_symbol: data?.currency_symbol || '$',
          is_custom_rule: data?.is_custom_rule || false,
          custom_rule: data?.custom_rule || '',
          check_in_time: data?.check_in_time || '12:00 AM',
          check_out_time: data?.check_out_time || '12:00 AM',
          is_quite_hours: data?.is_quite_hours || false,
          quite_hours_from: data?.quite_hours_from || '12:00 AM',
          quite_hours_to: data?.quite_hours_to || '12:00 AM',
          no_of_guests_max:data?.no_of_guests_max || 0,
          no_of_bedrooms_max: data?.no_of_bedrooms_max || 0,
          no_of_beds_max: data?.no_of_beds_max || 0,
          no_of_washroom_max: data?.no_of_washroom_max || 0,
          max_allowed_guests: data?.max_allowed_guests || 0,
          max_free_guests: data?.max_free_guests || 0,
          max_bookings_days: data?.max_bookings_days || 0,
          no_of_pets_allowed: data?.no_of_pets_allowed || 0,
          price_per_additional_guest: data?.price_per_additional_guest || 0,
          is_self_checkin: data?.is_self_checkin || false,
          is_instant_book: data?.is_instant_book || false,
          wifi_network_name: data?.wifi_network_name || '',
          wifi_network_password: data?.wifi_network_password || '',
          wifi_upload_speed: data?.wifi_upload_speed || 0,
          wifi_download_speed: data?.wifi_download_speed || 0,
          processing_fee: data?.processing_fee || '',
          host_id: data?.host_id || 0,
          rules: data?.rules || [],
          categories: data?.categories || [], 
          offers: data?.offers || [],
          add_ons: data?.add_ons || [],
          amenities: data?.amenities || [],
          extra_services: data?.extra_services || [],
          long_term_discount: data?.long_term_discount || [],
          address:{ 
           country: data?.address?.country || '',
           country_id: data?.address?.country_id || '', 
           region: data?.address?.region || '', 
           destination: data?.address?.destination || '', 
           house: data?.address?.house || '', 
           area: data?.address?.area || '', 
           street: data?.address?.street || '', 
           landmark: data?.address?.landmark || '', 
           city: data?.address?.city ||  '', 
           pin: data?.address?.pin || ''
          },
          extra_guests: {
            max_free:data?.extra_guests?.max_free || 0, 
            additional_cost:data?.extra_guests?.additional_cost || 0, 
            blocks: data?.extra_guests?.blocks || []
          },
          reservation_length: {
            min_days: data?.reservation_length?.min_days || 0, 
            max_days: data?.reservation_length?.max_days || 0, 
            blocks: data?.reservation_length?.blocks || []
          },
          basic_pricing:{
            base_price: data?.basic_pricing?.base_price || 0, 
            weekend_price: data?.basic_pricing?.weekend_price || 0, 
            security_deposit: data?.basic_pricing?.security_deposit || 0, 
            blocks: data?.basic_pricing?.blocks || []
          },
          guests: {
            children: data?.guests?.children ||  0, 
            adults: data?.guests?.adults || 0, 
            infants: data?.guests?.infants || 0
          },
          media: data?.media || []
        }
        setPayload(obj)
      }
      
    }
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getAmenitiesGroup())
    dispatch(getAmenities())
    dispatch(getHouseRules())
    dispatch(getOffers())
    dispatch(getAddons())
    dispatch(getExtraServices())
    dispatch(getRegions())
    dispatch(getDestionations())
    dispatch(getUsers())
    dispatch(getProcessingFee())
  }, [])


  
  


  return (
    <div className='p-10'>
        {/* <CreateListings/> */}
        <CreateListing isDefault={createListing} payload={payload} setPayload={setPayload}  />
    </div>
  )
}

export default ListingDetails