import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, isSuccess, isError, message, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/rooms');
        }
    }, [isSuccess, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {isError && (
            <p className="text-red-600 text-center mb-4">{message}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                />
                {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>)}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                />
                {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>)}
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
                {isLoading ? "Loading..." : "Login"}
            </button>
            </form>
        </div>
        </div>
    );
};

export default Login;