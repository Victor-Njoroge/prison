import { useEffect, useState } from 'react';
const useFetchData = (url) => {
    const [myBlogs, setMyblogs] = useState(null);
    const [loading, setloading] = useState(true);
    const [Error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error("Error Connecting to the server");
                    }
                    console.log(res);
                    return res.json();

                })
                .then(data => {
                    setMyblogs(data);
                    setloading(false);
                    setError(null);

                })
                .catch((err) => {
                    setError(err.message);
                    setloading(false);
                })
        }, 1000);
    }, [url]);
    return { myBlogs, loading, Error };
}
export default useFetchData;