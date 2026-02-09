import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, leadingIcon = null, trailingIcon = null, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative">
            {leadingIcon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {leadingIcon}
                </div>
            )}
            <input
                {...props}
                type={type}
                className={
                    'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                    (leadingIcon ? 'pl-10 ' : '') +
                    (trailingIcon ? 'pr-10 ' : '') +
                    className
                }
                ref={localRef}
            />
            {trailingIcon && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {trailingIcon}
                </div>
            )}
        </div>
    );
});
