import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <TransitionContext.Provider value={{ isAnimating, setIsAnimating }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => useContext(TransitionContext);
