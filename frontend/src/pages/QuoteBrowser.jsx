import React, { useState, useEffect } from "react";



const QuoteBrowser = () =>{
    const [authors, setAuthors] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [selectAuthor, setSelectAuthor] = useState('');
    const [quote, setQuote] = useState(null);
    const [loadingQuote, setLoadingQuote] = useState(false);

    useEffect(() => {
        const fetchAuthours = async () => {
            try {
                const res = await fetch('http://api.quotable.io/authors');
                const data = await res.json();
            } catch {

            } finally {

            }
        };

        fetchAuthours();
    }, []);
    
    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold"></h2>
            <p>Coming soon...</p>
        </div>
    );
};

export default QuoteBrowser;