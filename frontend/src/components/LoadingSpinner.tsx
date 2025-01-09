import { ClipLoader } from "react-spinners"

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 transition-opacity duration-700 opacity-100 ease-out border-white-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export const Spinner = () => {
  return <ClipLoader size={20} color={"white"} />
}
