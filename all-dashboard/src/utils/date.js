import moment from "moment";

export const formatDate = (date) => {
    // return moment(new Date(date)).format("ddd MMM D, YYYY");
     return moment(date).format('ddd MMM D, YYYY');
};

export const formatBookingCreatedAt = ( date ) => {
    const timeStamp = moment(date)
    return timeStamp?.format('DD/MM/YYYY')
}

export const formatRecentMessageLatestMessage = ( timestamp ) => {
   const formattedDate = moment(timestamp).format('MMMM D [at] h:mm A');
   return formattedDate
}