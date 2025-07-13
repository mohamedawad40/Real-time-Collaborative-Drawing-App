import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { login } from "../app/hooks";


const Login = () => {
    const { register, handleSubmit, formState: errors} = useForm()
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    useEffect(() => {
        if (isSuccess || user) {
            // navigate("/rooms");
            console.log('login succeed');
        }
    }, [user, isSuccess]);

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {isError && <p className="text-red-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input className="input" placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input className="input" type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit" className="btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;