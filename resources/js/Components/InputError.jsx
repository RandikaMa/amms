export default function InputError({ message, className = '', ...props }) {
    // Handle both string and array messages (Laravel returns arrays)
    const errorMessage = Array.isArray(message) ? message[0] : message;

    return errorMessage ? (
        <p
            {...props}
            className={'text-sm text-red-900 ' + className}
        >
            {errorMessage}
        </p>
    ) : null;
}
