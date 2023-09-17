import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_SUMMARY_KEY;

export const summaryApi = createApi({

    reducerPath: 'summaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube-summary-multilanguage.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'youtube-summary-multilanguage.p.rapidapi.com');

            return headers;
        },
    }),

    endpoints: (builder) => ({
        getVideoSummary: builder.mutation({
            query: (videoUrl) => ({
                url: '/summarize/long/gpt-3.5-turbo-16k',
                method: 'POST',
                body: {
                    url: videoUrl,
                    lang: 'en'
                }
            })
        }),
    }),


})

// Export hooks for usage in component
export const { useGetVideoSummaryMutation } = summaryApi;