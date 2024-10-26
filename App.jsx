const App = () => (
    <header className="w-full p-4 z-10 bg-[#2F3448] h-16 flex items-center shadow-md">
        <nav className="flex items-center justify-between w-full">
            <a href="#" className="p-12">
                <img src="https://s3-alpha-sig.figma.com/img/cca1/7e31/2bee18e5d653e385bd9677296c1f041d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jzPdKcdGJj2i0SCCm2RACuV7-VbpjHok0qgqf0VjI21BZQqqx7uE2WZZ1THLjMxnAmGgDBTfhoyTCRJSuzyarS0zXIMMiCEbfsy3gvHZtcraS9-54GUYfttFpe9sHZh-aiuvAKQI7Sf3HzOP7bLXWXJP5VQxWE5n-H~vaRJQwJEds4NhlkRTX17OBX07Lui2P9C7nF5yLfXXOJ39kozHH-HKEqg1N-~IudCJv2N9rQqJjnZVVzVap0DhyFGklQnjkboSry9PSDpWeSTAzHFqXqIKmclOJsTktm9I7Ry9iGR-nEeeYSOr7C12-CIzKgRvLm0cv71x-SjTWNrlB~Zhlg__" alt="logo" 
                className=" w-16" style={{ transform: 'rotate(30deg)' }}/>
            </a>
            <ul className="flex items-center p-14 m-4 space-x-8 text-white">
                <input
                    placeholder="Search categories"
                    className="p-2 rounded-md w-40"
                />
                <a href="#">Our Products</a>
                <div className="flex space-x-4">
                    <button className="p-2 rounded-md bg-white text-[#2F3448] w-24">Log in</button>
                    <button className="p-2 rounded-md bg-[#6ABDDB] text-[#2F3448] w-24">Sign up</button>
                </div>
            </ul>
        </nav>
    </header>
);

export default App;
