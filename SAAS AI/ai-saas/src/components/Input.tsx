import clsx from "clsx";
import type { ChangeEvent, KeyboardEvent, ReactNode, RefObject } from "react";
import Label from './Label';
import type {toolTipProperties} from '../types';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface InputProps{
    small?: boolean;
    left?: ReactNode;
    value: string| number | undefined;
    onChange: (event: ChangeEvent<InputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    subType?: string; 
    attributes?: {[key: string]:string| number | string[]};
    toolTip?: toolTipProperties;
    inputRef?: RefObject<InputElement>;
    onKeyDown?: (e:KeyboardEvent<InputElement>)=> void;

}

const Input =(props: InputProps)=>{
    const isTypeTextArea= ()=>{
        return props.type === 'textarea';
    };
    return (
        <div className="items-left z-5 flex h-fit">
            {props.left &&(
                <Label left = {props.left} type ={props.type} toolTipProperties= {props.toolTipProperties}/>
            
            )}
            {isTypeTextArea()? (<textarea className={clsx('delay-0')}/>):(<input className={clsx('delay-0')}/>)}
            
        </div>
    )
}