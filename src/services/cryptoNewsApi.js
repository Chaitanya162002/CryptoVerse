import axios from "axios";

const API_KEY = "12f54c42e89442909cdbf013dc69c97d"


const fetchCryptoNews  = async ()=>{
    try{
        const response = await axios.get('https://newsapi.org/v2/everything',{
            params:{
                q: 'cryptocurrency',
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 10,
                apiKey: API_KEY,
            }
        })

        return response.data.articles

    }catch(err){
        console.log("Error fetching crypto news:", err);

    }
}

export default fetchCryptoNews;















































// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoNewsHeaders = {
//   "x-rapidapi-key": "db731a69bdmsh79ced0d84b2b1a8p18fb3fjsn8327a163d152",
//   "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
//   "X-BingApis-SDK": "true",
// };

// const baseUrl = "https://bing-news-search1.p.rapidapi.com";

// const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// export const cryptoNewsApi = createApi({
//   reducerPath: "cryptoNewsApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptoNews: builder.query({
//       query: ({ newsCategory, count }) =>
//         createRequest(
//           `/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`
//         ),
       
//     }),
//   }),
// });

// export const { useGetCryptoNewsQuery } = cryptoNewsApi;
