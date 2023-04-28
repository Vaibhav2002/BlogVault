import useSWR from 'swr'
import {getAuthenticatedUser} from "@/data/dataSources/UserDataSource"
import {UnauthorizedError} from "@/data/HttpErrors";

export default function useAuthenticatedUser() {
    const {data, isLoading, error, mutate} = useSWR('user', async () => {
        try {
            return await getAuthenticatedUser()
        } catch (e) {
            if (e instanceof UnauthorizedError) return null
            else throw e
        }
    })
    return {
        user: data,
        userLoading: isLoading,
        userError: error,
        mutateUser: mutate
    }
}