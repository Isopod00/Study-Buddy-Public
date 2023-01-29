import { useEffect, useState, useRef } from "react";

const Swipe = props => {
    const [position, setPosition] = useState({
        x: 0
    });
    const [isSwiping, setSwiping] = useState(false);
    const [swipedAway, setSwipedAway] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleMove = (e) => {
            if (!isSwiping) {
                return;
            }
            setPosition({
                x: position.x + e.movementX
            });
        };
        const handleUp = () => {
            if (Math.abs(position.x) > maxSwipe * 0.5) {
                setSwipedAway(true);
                setTimeout(() => {
                    if (position.x > 0) {
                        props.onSwipeRight();
                    } else {
                        props.onSwipeLeft();
                    }
                }, 250);
            } else {
                setSwiping(false);
                setPosition({
                    x: 0
                });    
            }
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [position, isSwiping]);

    const distanceFromOrigin = Math.abs(position.x);
    const maxSwipe = 500;
    const relativeDragProgress = distanceFromOrigin / maxSwipe;

    return <div onMouseDown={(e) => {
        e.preventDefault();
        setSwiping(true);
    }} style={{
        transform: `translate(${position.x}px, 0) scale(${1 - relativeDragProgress})`,
        transformOrigin: 'center',
        opacity: swipedAway ? 0 : 1 - relativeDragProgress,
        transition: 'transform .05s, opacity 0.05s',
        cursor: isSwiping ? 'grabbing' : 'grab'
    }} ref={ref}>
        {props.children}
    </div>
};

export default Swipe;
