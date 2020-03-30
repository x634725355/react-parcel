import React, { useEffect, useState } from 'react';

export default function HookImage({ src, dataImg }) {

    const [img = src, setImg] = useState('');
    let imgRef = null;

    const option = {
        root: null,
        threshold: [0.01]
    }

    useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setImg((img) => img = dataImg);
                io.unobserve(entries[0].target);
            }
        });
        io.observe(imgRef);
    }, [])

    return (
        <img ref={el => imgRef = el} src={img} alt="" />
    )
}

