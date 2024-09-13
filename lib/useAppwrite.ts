import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

export const useAppwrite = (func: () => Promise<any>) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await func() as [];
            setData(response)
        } catch (error) {
            Alert.alert('Error', String((error as Error).message))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = async () => fetchData()
    return { data, isLoading, refetch }
}