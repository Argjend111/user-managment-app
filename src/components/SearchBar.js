function SearchBar({ onSearch }) {
    function handleChange(e) {
        onSearch(e.target.value);
    }

    return (
        <div className="flex justify-center my-4">
            <input 
                type="text" 
                placeholder="Search by name or email" 
                onChange={handleChange}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}

export default SearchBar;