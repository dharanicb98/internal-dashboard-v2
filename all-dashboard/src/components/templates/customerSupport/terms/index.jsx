const terms = [
  {
    title: "Terms & Conditions 1.2",
    details: `The use of the HolidayKeepers website and its services are provided by HolidayKeepers Holdings LLC, with mailing address PO Box 850 Blakeslee PA 18610 (hereinafter “HolidayKeepers”) through its registered users and are subject to the following Terms & Conditions (hereinafter the “Agreement”), all parts and sub-parts of which are specifically incorporated by reference here. This Agreement shall govern the use of HolidayKeepers website hereinafter referred to as “website” and any content and services provided by or on HolidayKeepers website`,
  },
  {
    title: "References",
    details: `The parties which have been referred to in this agreement are:
  HolidayKeepers, Us, We: HolidayKeepers as the creator, operator, and publisher of the website provides the services through its registered users, the user booking and availing the services shall be referred to as the Guests, and the User providing their listings for bookings on the HolidayKeepers website shall be referred to as the Hosts. HolidayKeepers, Us, We, Our, Ours and other first-person pronouns will refer to HolidayKeepers. You, being the user will be referred to as the Guest, Host, and collectively User or Parties in this agreemen`,
  },
  {
    title: "Guest Covenants and Conditions",
    details: `The parties which have been referred to in this agreement are:
  HolidayKeepers, Us, We: HolidayKeepers as the creator, operator, and publisher of the website provides the services through its registered users, the user booking and availing the services shall be referred to as the Guests, and the User providing their listings for bookings on the HolidayKeepers website shall be referred to as the Hosts. HolidayKeepers, Us, We, Our, Ours and other first-person pronouns will refer to HolidayKeepers.You, being the user will be referred to as the Guest, Host, and collectively User or Parties in this agreemen`,
  },
];

function Terms() {
  return (
    <div className="flex flex-col gap-8">
      {terms.map((term) => (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium">{term.title}</p>
          <p className="text-[#000000B2]">{term.details}</p>
        </div>
      ))}
    </div>
  );
}

export default Terms;
