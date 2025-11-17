export default function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 animate-pulse">
      
      {/* Title + Priority */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
      </div>

      {/* Footer (Date + Buttons) */}
      <div className="flex justify-between items-center mt-5">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>

        <div className="flex gap-3">
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
