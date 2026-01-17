import React from 'react';

const DealsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Hot Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add your deal items here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-500 font-semibold mb-2">30% OFF</div>
            <h3 className="text-lg font-semibold mb-2">Special Offer</h3>
            <p className="text-gray-600">Limited time deal on selected items</p>
          </div>
          {/* Add more deal items as needed */}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
