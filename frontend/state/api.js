import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// More descriptive base URL definition
const BASE_URL = 'http://localhost:9009/api/pizza';

export const api = createApi({
  reducerPath: 'api', // Keep the reducer path consistent
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Use the defined base URL

  tagTypes: ['Pizzas'], // Tags for cache invalidation

  endpoints: (build) => ({
    // Query for getting pizza order history
    getPizzaHistory: build.query({
      query: () => 'history', // Concise query definition
      providesTags: ['Pizzas'], // Cache the result and tag it for invalidation
    }),

    // Mutation for placing a new pizza order
    placeOrder: build.mutation({
      query: (order) => ({
        url: 'order',
        method: 'POST',
        body: order, // The order payload is directly passed as the body
      }),
      invalidatesTags: ['Pizzas'], // Invalidate the cache when a new order is placed
    }),
  }),
});

// Export hooks generated by createApi
export const {
  useGetPizzaHistoryQuery, 
  usePlaceOrderMutation
} = api;
