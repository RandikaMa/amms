import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail({ status: initialStatus = null }) {
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/email/verification-notification');
            setStatus('verification-link-sent');
        } catch (error) {
            console.error('Failed to send verification email', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/logout');
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <GuestLayout>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <button
                        onClick={handleLogout}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Log Out
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
