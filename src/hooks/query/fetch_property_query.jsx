import {useQuery} from '@tanstack/react-query'

export const fetchAllProperty = (apiFucntion)=> useQuery(['getAllProperties'],apiFucntion)