import React, { useEffect, useState } from 'react';

const LightningFlash = () => {
    const [flashes, setFlashes] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newFlashes = Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
                id: Math.random().toString(),
                left: Math.random() * window.innerWidth + 'px',
                top: Math.random() * window.innerHeight + 'px',
                width: Math.random() * 2 + 5 + 'px', // Random width
                height: Math.random() * 100 + 150 + 'px', // Random height
                rotation: Math.random() * 60 - 30 + 'deg', // Random rotation
                skewX: Math.random() * 30 - 15 + 'deg', // Random skew for lightning effect
                skewY: Math.random() * 30 - 15 + 'deg', // Random skew for lightning effect
            }));

            setFlashes((prev) => [...prev, ...newFlashes]);

            // Remove flash after animation
            setTimeout(() => {
                setFlashes((prev) => prev.filter((flash) => !newFlashes.some((newFlash) => newFlash.id === flash.id)));
            }, 50); // Match the animation duration
        }, Math.random() * 1000 + 500); // Random interval between 0.5-1.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {flashes.map((flash) => (
                <div
                    key={flash.id}
                    className="lightning-flash"
                    style={{
                        position: 'fixed',
                        top: flash.top,
                        left: flash.left,
                        width: flash.width,
                        height: flash.height,
                        transform: `rotate(${flash.rotation}) skew(${flash.skewX}, ${flash.skewY})`,
                        backgroundColor: 'white',
                        opacity: 0.8,
                    }}
                ></div>
            ))}
        </>
    );
};

export default LightningFlash;
