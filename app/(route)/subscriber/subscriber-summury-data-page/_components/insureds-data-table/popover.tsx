import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ trigger, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={popoverRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute bg-white border rounded shadow-md mt-2 p-2">
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;