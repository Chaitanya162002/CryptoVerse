import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    'x-rapidapi-key': 'db731a69bdmsh79ced0d84b2b1a8p18fb3fjsn8327a163d152',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'

}

const baseUrl = 'https://coinranking1.p.rapidapi.com/'
const createRequest = (url) => ({url,headers:cryptoHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`),
        }),

        getExchanges:builder.query({
            query:()=>createRequest('/exchanges')

        }),
        getCryptoDetails:builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timeperiod})=>createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
}=cryptoApi;