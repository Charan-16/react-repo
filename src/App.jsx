import { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration
    const [token, setToken] = useState(null);

    const handleRegister = async () => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            setIsLogin(true); // Switch to login view after successful registration
        } else {
            alert('Registration failed!');
        }
    };

    const handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setToken(data.token);
            alert('Login successful!');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-700">
                    {isLogin ? 'Login' : 'Register'}
                </h1>
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                {isLogin ? (
                    <button
                        onClick={handleLogin}
                        className="w-full bg-indigo-500 text-white font-semibold p-4 rounded-lg mt-6 hover:bg-indigo-600 transition duration-300"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={handleRegister}
                        className="w-full bg-green-500 text-white font-semibold p-4 rounded-lg mt-6 hover:bg-green-600 transition duration-300"
                    >
                        Register
                    </button>
                )}
                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-center text-indigo-500 mt-6 cursor-pointer hover:underline"
                >
                    {isLogin
                        ? "Don't have an account? Register here"
                        : 'Already have an account? Login here'}
                </p>
                {token && (
                    <p className="text-green-500 mt-4 break-words bg-gray-100 p-4 rounded-lg text-center">
                        Your token: <span className="text-gray-700">{token}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
