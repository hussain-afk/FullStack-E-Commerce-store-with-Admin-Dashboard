import React from 'react'
import { useState, useEffect, createContext } from 'react'

export const DataApiContext = createContext()

function DataProvider({ children }) {
    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    
    // console.log(data)

    const fetchProducts = async () => {
        try {
            // https://ecommerce-backend-smit.vercel.app/api/products
            const response = await fetch('https://smit-e-commerce-complete-backend.vercel.app/api/data/products')
            const data = await response.json()
            setData(data)
            // console.log("Products:", data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const fetchComments = async () => {
        try { 
            const response = await fetch('https://ecommerce-backend-smit.vercel.app/api/comments')
            const commentsData = await response.json()
            setComments(commentsData)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchComments()
    }, []);
    return (

    <DataApiContext.Provider value={{ data, fetchProducts, comments, fetchComments }}>
        {children}
    </DataApiContext.Provider>

    )
}



export default DataProvider
