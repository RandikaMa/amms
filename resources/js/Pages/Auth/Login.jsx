import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-xs sm:text-sm font-medium text-green-600 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="w-full">
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-sm sm:text-base" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-sm sm:text-base"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        leadingIcon={<HiMail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                    />

                    <InputError message={errors.email} className="mt-2 text-xs sm:text-sm" />
                </div>

                <div className="mt-3 sm:mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-sm sm:text-base" />

                    <TextInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-sm sm:text-base"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        leadingIcon={<HiLockClosed className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                        trailingIcon={
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <HiEyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                    <HiEye className="h-4 w-4 sm:h-5 sm:w-5" />
                                )}
                            </button>
                        }
                    />

                    <InputError message={errors.password} className="mt-2 text-xs sm:text-sm" />
                </div>

                <div className="mt-3 sm:mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs sm:text-sm text-white/90 drop-shadow-md">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs sm:text-sm text-white/90 underline hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 text-center sm:text-left drop-shadow-md transition-all"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="w-full sm:w-auto sm:ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
