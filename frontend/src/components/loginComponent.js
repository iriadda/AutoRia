import {useForm} from "react-hook-form";
import {authService} from "../services/authService";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ResetPasswordRequest} from "./ResetPasswordRequest";

const LoginComponent = () => {
    const {handleSubmit, register} = useForm()
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const onSubmit = async (user) => {
        try {
            await authService.login(user)
            navigate('/profile')
            window.location.reload();
        } catch (err) {
            if (err.response?.status === 401) {
                const data = err.response;
                console.log(data)
                setError(data.data.detail);

            }

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>login</button>
            </form>
            {error && <p>{error}</p>}
            <button onClick={() => navigate('/register')}>register</button>


            <ResetPasswordRequest/>
        </div>
    );
}
export default LoginComponent;