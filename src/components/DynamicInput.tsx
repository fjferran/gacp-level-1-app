'use client';

import { useState, useEffect } from 'react';
import { getFormData, saveFormData } from '@/lib/progress';

interface DynamicInputProps {
    fieldKey: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export default function DynamicInput({ fieldKey, label, placeholder, required }: DynamicInputProps) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const data = getFormData();
        if (data[fieldKey]) {
            setValue(data[fieldKey]);
        }
    }, [fieldKey]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        saveFormData(fieldKey, newValue);
    };

    return (
        <div className="text-left w-full max-w-md mx-auto mb-4">
            <label htmlFor={fieldKey} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="text"
                id={fieldKey}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}
