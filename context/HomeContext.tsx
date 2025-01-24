import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '@/config/config';

type Home = {
    _id: string;
    title: string;
    description: string;
};

type HomeContextType = {
    homes: Home[];
    fetchHomes: () => void;
    updateHome: (updatedHome: Home) => void;
};

type HomeProviderProps = {
    children: ReactNode;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
    const [homes, setHomes] = useState<Home[]>([]);

    const fetchHomes = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get<{ data: Home[] }>(`${API_URL}/api/home`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHomes(response.data.data);
        } catch (error) {
            console.error('Failed to fetch homes', error);
        }
    };

    const updateHome = (updatedHome: Home) => {
        setHomes((prevHomes) =>
            prevHomes.map((home) => (home._id === updatedHome._id ? updatedHome : home))
        );
    };

    useEffect(() => {
        fetchHomes();
    }, []);

    return (
        <HomeContext.Provider value={{ homes, fetchHomes, updateHome }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHomes = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useHomes must be used within a HomeProvider');
    }
    return context;
};
