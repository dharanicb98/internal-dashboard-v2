export const InputNames = [
  {
    type: "text",
    value: "fname",
    label: "First Name",
    style : "flex-col",
    column : true,
  },
  {
    type: "text",
    value: "lname",
    label: "Last Name",
    style : "flex-col",
    column : true,
  },
  {
    type: "text",
    value: "email",
    label: "Email",
    column : true,
    style : "flex-col",
  },
  {
    type: "phone_ext",
    value: "mobile",
    label: "Phone Number",
    column : true,
  },
];

export const InputData = [
  {
    type: "date",
    value: "checkin_dt",
    label: "Checkin",
  },
  {
    type: "date",
    value: "checkout_dt",
    label: "Checkout",
  },
  {
    type: "number",
    value: "childrens",
    label: "Childrens",
  },
  {
    type: "number",
    value: "adults",
    label: "Guests",
  },
  {
    type: "number",
    value: "pets",
    label: "Pets",
  },
  {
    type: "number",
    value: "nights",
    label: "Nights",
  },
];

export const InputCheckout = [
  {
    type: "select",
    value: "checkout_status",
    label: "Checkout Status",
    moduleName : [{name : "Completed" , value : "completed"},{name : "Pending" , value : "pending"},{name : "Cancel" , value : "empty"}],
    row : true,
    style : "w-[60%]",
  },
  {
    type: "select",
    value: "payment_status",
    label: "Payment Status",
    moduleName : [{name : "Completed" , value : 1},{name : "Pending" , value : 0},{name : "Cancel" , value : -1}],
    row : true,
    style : "w-[80%]",
  },
  {
    type: "select",
    value: "payment_type",
    label: "Payment Type",
    moduleName : [{name : "Completed" , value : 1},{name : "Pending" , value : 0},{name : "Cancel" , value : -1}],
    row : true,
    style : "w-[60%]",
  },
]


export const InputAmount = [

  {
    type: "number",
    value: "payment_gateway",
    label: "Payment Gateway",
  },
  {
    type: "number",
    value: "payment_amount",
    label: "Payment Amount",
  },
  {
    type: "number",
    value: "min_part_payment",
    label: "Minimum part payment",
  },
  {
    type: "number",
    value: "amount_paid",
    label: "Paid Amount",
  },
];



export const InputStatus = [
  {
    type: "select",
    value: "booking_status",
    label: "Booking Status",
    moduleName : [{name : "Completed" , value : "completed"},{name : "Pending" , value : "pending"},{name : "Cancel" , value : "empty"}],
    row : true,
    style : "w-[60%]",
  },
  {
    type: "select",
    value: "payment_status",
    label: "Payment Status",
    moduleName : [{name : "Completed" , value : 1},{name : "Pending" , value : 0}],
    row : true,
    style : "w-[80%]",
  },
  {
    type: "select",
    value: "agreement_status",
    label: "Agreement Status",
    moduleName : [{name : "Yes" , value : 1},{name : "No" , value : 0}],
    row : true,
    style : "w-[60%]",
  },
]

