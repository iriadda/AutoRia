import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {userService} from "../services/userService";


const RegisterComponent = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
            profile: {
                first_name: data.first_name,
                last_name: data.last_name
            }
        };
        try {
            await userService.register(payload);
            alert('Реєстрація успішна!');
            navigate('/login');
        }catch (error) {
            if (error.response?.status === 400 && error.response.data?.email) {
                alert('Користувач з таким email вже існує. Перейдіть до входу.');
                navigate('/login');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    {...register('email', {required: 'Email обов’язковий'})}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    {...register('password', {required: 'Пароль обов’язковий'})}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Ім’я:</label>
                <input
                    {...register('first_name', {required: 'Ім’я обов’язкове'})}
                />
                {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>

            <div>
                <label>Прізвище:</label>
                <input
                    {...register('last_name', {required: 'Прізвище обов’язкове'})}
                />
                {errors.last_name && <p>{errors.last_name.message}</p>}
            </div>

            <button type="submit">Зареєструватися</button>
        </form>
    );
};

export default RegisterComponent;
