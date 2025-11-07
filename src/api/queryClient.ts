import { QueryClient } from '@tanstack/react-query'
import axios from "axios"

export const IS_DEV_ENV = import.meta.env.MODE === "development"

const API_URL = IS_DEV_ENV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PRO

const GITLAB_API = import.meta.env.VITE_API_GITLAB_URL


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 20,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      throwOnError: true
    },
    mutations: {
      retry: 0
    }
  }
})


export const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})

export const gitlabClient = axios.create({
  baseURL: GITLAB_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})


