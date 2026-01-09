import React, { useRef } from 'react'
import { dockApps } from '#constants/index.js' // Make sure this path is correct for your project
import { Tooltip } from 'react-tooltip';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from '#store/window.js';

function Dock() {
    const {openWindow, closeWindow, windows} = useWindowStore();
    const dockRef = useRef(null)

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const window = windows[app.id];
        if (window.isOpen){
            closeWindow(app.id);


        }else {
            openWindow(app.id);
        }
        console.log(window);
    }

    useGSAP(() => {
        // 1. Get the actual DOM element from the ref
        const dock = dockRef.current;
        if (!dock) return;

        // 2. Select all the buttons (icons) inside the dock
        // We use gsap.utils.toArray to turn the NodeList into a real Array
        const icons = gsap.utils.toArray(".dock-icon");

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;

            icons.forEach((icon) => {
                // 3. Calculate the center of THIS specific icon
                const rect = icon.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;

                // 4. Calculate distance between Mouse and Icon Center
                const distance = Math.abs(mouseX - iconCenterX);

                // 5. Your Math Logic (Gaussian curve for smooth wave)
                // I adjusted the divisor (15000) to make the wave width feel right
                const intensity = Math.exp(-(distance ** 2.5) / 15000); 
                
                // Map intensity (0 to 1) to scale (1 to 1.5)
                const scale = 1 + 0.5 * intensity; 
                const y = -10 * intensity; // Move up slightly

                gsap.to(icon, {
                    scale: scale,
                    y: y,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: true // Important: stops fighting animations
                })
            })
        };

        const resetIcons = () => {
            // Reset everything back to normal
            gsap.to(icons, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            })
        };

        // 6. Add Event Listeners to the DOCK element (not the function)
        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        // 7. Cleanup function (Corrected "removeEventListener")
        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }

    }, { scope: dockRef }) // Scope helps GSAP find ".dock-icon" inside this component only

    return (
        <section id="dock">
            {/* Added relative and z-index to make sure it sits above background */}
            <div ref={dockRef} className='dock-container relative z-50'>
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className='relative flex justify-center'>
                        <button
                            type='button'
                            className='dock-icon origin-bottom' // Added origin-bottom so it grows UP
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={`size-full object-cover transition-opacity ${canOpen ? '' : "opacity-60"}`}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place='top' className='tooltip' />
            </div>
        </section>
    )
}

export default Dock