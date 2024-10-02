import {motion, useAnimation} from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React,{useEffect, useState} from 'react';

import FadeIn from '../components/motions/FadeIn';
import PrimaryButton from '../components/PrimaryButton';

const welcome = ()=>{
    const router = useRouter();
    const controls = useAnimation();
    const [buttonClicked, setButtonClicked]= useState(false);

    useEffect(()=> {
        controls.start({
            scale:1,
            y:0,
            transition:{type: 'spring', stiffness:80, damping :15, mass:1},
        });
    }, [controls]);

    useEffect(()=>{
        if (buttonClicked){
            controls.start({
            opacity:0,
            transition:{duration:0.75}
            })
        }
    }, [buttonClicked, controls])

    const handleButtonClick=()=>{
        setButtonClicked(true);
        setInterval(()=>{
            router.push('/').catch(console.error)
        },1000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <motion.div className= "" initial ={{scale:5, y:1100,opacity:1}}>
                <motion.div>
                    <Image src='' width='' height='' alt='' className='' />
                </motion.div>
                <FadeIn>
                    <h1 className="text-5xl font-bold text-gray-900">Welcome to our site</h1>
                </FadeIn>
                <FadeIn>
                    <PrimaryButton className="px-16 font-bold" onClick= {handleButtonClick}>Get started </PrimaryButton>
                </FadeIn>
                
            </motion.div>
        </div>
    )
}