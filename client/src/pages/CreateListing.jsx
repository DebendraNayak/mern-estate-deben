import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            minLength="10"
            maxLength="60"
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
          ></textarea>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
          ></input>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input id="same" type="checkbox" className="w-5"></input>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input id="rent" type="checkbox" className="w-5"></input>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input id="parkingspot" type="checkbox" className="w-5"></input>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input id="furnished" type="checkbox" className="w-5"></input>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input id="offer" type="checkbox" className="w-5"></input>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="beds"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              ></input>
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bath"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              ></input>
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              ></input>
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              ></input>
              <div className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
             <span className="font-semibold">Images:
                <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
             </span>
             <div className="flex gap-2">
               <input className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="image" accept="image/*" multiple></input>
               <button className="border border-green-600 rounded-lg p-3 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
             </div>
             <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>
      </form>
    </main>
  );
}
