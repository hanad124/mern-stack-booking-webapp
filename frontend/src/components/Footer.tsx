const Footer = () => {
  return (
    <div className="bg-blue-600 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-wight cursor-pointer">
          Booking.com
        </span>{" "}
        <div className="text-white tracking-tight font-medium flex gap-4">
          <p className="cursor-pointer">privacy policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
