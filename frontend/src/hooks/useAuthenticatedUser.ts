import useSWR from 'swr'
import {getAuthenticatedUser} from "@/data/dataSources/AuthDataSource"

export default function useAuthenticatedUser() {
    const { data, isLoading, error, mutate } = useSWR('user', getAuthenticatedUser)
    return {
        user: data,
        userLoading:isLoading,
        userError: error,
        mutateUser: mutate
    }
}