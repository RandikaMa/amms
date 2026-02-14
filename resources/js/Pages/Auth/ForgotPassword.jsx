import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword({ status: initialStatus = null }) {
    const [data, setData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(initialStatus);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setStatus(null);

        try {
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('/forgot-password', {
                email: data.email,
            });

            setStatus(response.data.status || 'Password reset link sent!');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ email: ['Failed to send reset link'] });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
