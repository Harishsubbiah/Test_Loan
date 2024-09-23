import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    label: string;
    isPrimary: boolean;
    onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ type, label, isPrimary, onPress }) => {
    return (
        <button
            type={type}
            className={isPrimary ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={onPress}
        >
            {label}
        </button>
    );
};
