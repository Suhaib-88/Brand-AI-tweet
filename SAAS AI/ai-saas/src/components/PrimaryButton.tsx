import clsx from 'clsx';
import React from 'react';
import { Button } from './ui/button';

type PrimaryButtonProps ={
    className?: string;
    children?: React.ReactNode|string;
    icon?: React.ReactNode;
    onClick?: ()=> void | Promise<void>
}

export default function PrimaryButton({children, onClick, icon, className}: PrimaryButtonProps){
    return (
        <Button onClick={onClick} className={clsx('group rounded-full border border-blue-500',className)}>
            {icon}
            {children}
        </Button>
    )
}