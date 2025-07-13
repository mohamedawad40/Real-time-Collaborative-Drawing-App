import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import  { register as registerUser } from '../app/hooks';
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const onSubmit = data => {
        console.log(data);
        dispatch(registerUser(data));
    };

    useEffect(() => {
        // if (isSuccess) navigate('/rooms');
        if (isSuccess) console.log('register succeed....');
    }, [isSuccess]);

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {isError && <div className="text-red-500 mb-4">{message}</div>}
            {isLoading && <div className="text-blue-500 mb-4">Loading...</div>}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        {...register("name")} />
                    {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" {...register("email")} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" {...register("password")} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                </div>
                
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
            </form>
        </div>
    );
}

export default Register;