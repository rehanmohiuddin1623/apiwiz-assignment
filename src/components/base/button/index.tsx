import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    children?: React.ReactNode;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children,className, isLoading, ...rest }) => {
    return (
        <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer ${className}`} onClick={onClick} {...rest}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
}
export default Button;