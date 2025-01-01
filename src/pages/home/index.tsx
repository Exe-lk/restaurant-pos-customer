import Image from "next/image";
import { FaPercent, FaShoppingBag, FaTruck, FaGift } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className=" min-h-screen ">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-neutral text-white">
        <div className="flex items-center space-x-2">
          <button className="text-lg">☰</button>
          <div>
            <h1 className="font-bold text-xl">Home</h1>
            <p className="text-sm">Address</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button>❤️</button>
          <button>🔔</button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-neutral">
        <input
          type="text"
          placeholder="Search for shops & restaurants"
          className="w-full rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="p-4 flex overflow-x-auto space-x-4 text-white">
        {[
          { icon: FaPercent, label: "Offers" },
          { icon: FaShoppingBag, label: "Meal for one" },
          { icon: FaGift, label: "pandamart" },
          { icon: FaTruck, label: "Pick-up" },
          { icon: FaTruck, label: "Pick-up" },
        ].map(({ icon: Icon, label }, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center text-sm"
          >
            <Icon className="w-8 h-8 bg-neutral p-2 rounded-full" />
            <span className="text-black">{label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 flex items-center space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded-full text-sm">
          Sort
        </button>
        <button className="px-4 py-2  bg-gray-300 rounded-full text-sm">
          Cuisines
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-full text-sm">
          pandapro
        </button>
      </div>

      {/* Order Again */}
      <div className="p-4">
        <h2 className=" font-bold mb-4">Order Again</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <Image
              src="/path-to-image-1.jpg"
              alt="Western Food"
              width={200}
              height={100}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">Western Food</h3>
              <p className="text-sm">Rice Dishes</p>
              <p className="text-sm text-gray-600">15-30 min</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <Image
              src="/path-to-image-2.jpg"
              alt="Chinese Food"
              width={200}
              height={100}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">Chinese Food</h3>
              <p className="text-sm">Coffee</p>
              <p className="text-sm text-gray-600">10-25 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
