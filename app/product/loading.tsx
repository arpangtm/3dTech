import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="mt-12 mx-2 sm:mx-12 lg:mx-32 animate-pulse">
      {/* Product Title Skeleton */}
      <div className="h-8 sm:h-10 lg:h-16 bg-slate-200 rounded-md w-3/4 mb-12"></div>

      {/* Tab Navigation Skeleton */}
      <div className="mt-12 flex flex-wrap border-b border-slate-200">
        {[1, 2, 3, 4].map((tab) => (
          <div key={tab} className="mr-2 mb-2">
            <div className="h-12 w-24 bg-slate-200 rounded-t-lg"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row space-x-0 lg:space-x-6">
        {/* Content Area Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="mt-12 space-y-4">
            {/* Simulating text content */}
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>

        {/* Right Side - Product Viewer and Buttons */}
        <div className="w-full md:w-1/2">
          {/* Product Viewer Skeleton */}
          <div className="h-64 md:h-80 bg-slate-200 rounded-lg mb-14"></div>
          
          {/* Action Buttons Skeleton */}
          <div className="flex space-x-4">
            <div className="h-12 w-28 bg-slate-200 rounded-lg"></div>
            <div className="h-12 w-36 bg-slate-200 rounded-lg"></div>
            <div className="h-12 w-32 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Toast Skeleton (hidden by default) */}
      <div className="fixed -bottom-[10%] left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-min p-4 space-x-4 rounded-lg shadow-lg bg-slate-100 border border-slate-200">
        <div className="w-6 h-6 bg-slate-200 rounded"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

// Demo component to show skeleton and loaded states
const ProductSkeletonDemo = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsLoading(!isLoading);
  };

  if (isLoading) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-10">
          <button
            onClick={handleToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Loaded State
          </button>
        </div>
        <ProductSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={handleToggle}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Skeleton
        </button>
      </div>
      
      {/* Simulated loaded content */}
      <div className="mt-12 mx-2 sm:mx-12 lg:mx-32">
        <h1 className="text-lg sm:text-xl lg:text-5xl font-semibold tracking-tight text-slate-800">
          Sample Product Name
        </h1>

        <ul className="mt-12 flex flex-wrap text-sm font-medium text-center border-b border-slate-200 text-slate-600">
          <li className="mr-2">
            <a href="#" className="text-blue-600 bg-blue-50 border-b-2 border-blue-600 inline-block p-4 rounded-t-lg">
              Info
            </a>
          </li>
          <li className="mr-2">
            <a href="#" className="inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800">
              About Product
            </a>
          </li>
          <li className="mr-2">
            <a href="#" className="inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800">
              Reviews
            </a>
          </li>
          <li className="mr-2">
            <a href="#" className="inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800">
              Specification
            </a>
          </li>
        </ul>

        <div className="flex flex-col-reverse md:flex-row space-x-0 lg:space-x-6">
          <div className="w-full md:w-1/2">
            <p className="mt-12 text-slate-700 leading-relaxed">
              This is sample product information that would be loaded from your API. 
              It includes details about the product features, benefits, and usage instructions.
              The skeleton screen provides a smooth loading experience while this content loads.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="h-64 md:h-80 bg-slate-100 rounded-lg mb-14 flex items-center justify-center">
              <span className="text-slate-500">Product Image/Viewer</span>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Buy Now
              </button>
              <button className="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-3 px-6 border border-blue-600 hover:border-transparent rounded-lg transition-all duration-200">
                Add To Cart
              </button>
              <button className="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-3 px-6 border border-blue-600 hover:border-transparent rounded-lg transition-all duration-200">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeletonDemo;