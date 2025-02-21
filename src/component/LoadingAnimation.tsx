export function LoadingAnimation() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
                </div>
            </div>
        </div>
    );
}