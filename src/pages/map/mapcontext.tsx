import React, { createContext, useContext, useState } from 'react';

interface MapContextType {
    longitude: number;
    latitude: number;
    setLongitude: React.Dispatch<React.SetStateAction<number>>;
    setLatitude: React.Dispatch<React.SetStateAction<number>>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [longitude, setLongitude] = useState<number>(75);
    const [latitude, setLatitude] = useState<number>(28);

    return (
        <MapContext.Provider value={{ longitude, latitude, setLongitude, setLatitude }}>
            {children}
        </MapContext.Provider>
    );
};
