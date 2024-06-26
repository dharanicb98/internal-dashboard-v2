module.exports = {
    //listings
    getAllListings : (page, size) => `listing/list/:${page}/:${size}`,
    createListing: () => `listing/new`,
    getListingById: (id) => `listing/${id}`,

    //house-rules 
    getAllHouseRules: () => `attributes/list/houserules`,

    //amenities
    getAllAmenities: () => `attributes/list/amenities`,

    //amenitiesGroup 
    getAllAmenitiesGroup: () => `attributes/list/amenities-group`,

    getAllAmenitiesGroupQuery: () => `attributes/list/amenities-group/query`,

    //catagories
    getAllCategories: () => `attributes/list/categories`,

    //countries 
    getALLCountries: () => `attributes/list/country`,

    //destinations 
    getAllDestinations: () => `attributes/list/destinations`,

    //Regions
    getAllRegions: () =>  `attributes/list/regions`,

    //extraServices 
    getAllExtraServices: () => `attributes/list/extra-services`,

    //listing types
    getAllListingTypes: () => `attributes/list/listing-types`,

    //Offers
    getAllOffers: () => `attributes/list/offers`,

    //pets 
    getAllPets: () => `attributes/list/pets`,

    //property types 
    getAllPropertyTypes: () => `attributes/list/propertytypes`,

    //processing fee 
    getAllProcessingFee: () => `attributes/list/processing-fee`,

   
    
    //addons 
    getAllAddons: () => `attributes/list/addons`,

    
    //users 
    getAllUsers: () => `user/query`,


    //images 
    uploadSingleImage: () => `upload/image/public`,
    uploadMultipleImages: () => `upload/image/public/multi`,


    //page config
    getAllPages: () => `page-config`,
    getPageById: ( id ) => `page-config/${id}`,
    
    


}