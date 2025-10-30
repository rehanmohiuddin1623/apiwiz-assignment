
import React, { forwardRef } from 'react';

interface TextBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
    label: string;
    error: string;
    caption?: string;
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'> {
    label: string;
    error: string;
    caption?: string;
}

const InputText = forwardRef<HTMLInputElement, TextBoxProps>((props, ref) => (
    <input
        ref={ref}
        {...props}
    />
));

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
    <textarea
        ref={ref}
        {...props}
    />
));

const withTextBox = <T extends HTMLInputElement | HTMLTextAreaElement>(
    Component: React.ForwardRefExoticComponent<any>
) => {
    return forwardRef<T, TextBoxProps | TextAreaProps>((props, ref) => (
        <div className='p-2 border-2 border-gray-300 rounded-md'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {props.label}
            </label>
            <Component 
                ref={ref} 
                className='w-full outline-none focus:none border-none' 
                {...props} 
            />
            {props.error && <p className="text-red-500 text-xs italic">{props.error}</p>}
            {props.caption && <p className="text-gray-600 text-xs mt-1">{props.caption}</p>}
        </div>
    ));
};

const TextBoxComponent = withTextBox<HTMLInputElement>(InputText);
const TextAreaComponent = withTextBox<HTMLTextAreaElement>(TextArea);

const TextBox = {
    Input: TextBoxComponent,
    TextArea: TextAreaComponent,
}


export default TextBox;
