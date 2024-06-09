import { useEffect, useState } from "react";

export default function Demo() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError]=useState("")
    const Base_Url = "https://jsonplaceholder.typicode.com";



   // recuperation de la liste des posts du backend  et la stocker dans une liste
    useEffect(() => {
        const fetchData = async () => {
            try { // cas envoyer
                setIsLoading(true);
                const response = await fetch(`${Base_Url}/posts`);
                if (!response.ok) {// cas nest pas recus depuis backend
                   setError('Erreur lors de la récupération des données');
                }
                const posts = await response.json();
                setPosts(posts);
                setIsLoading(false);
            } catch (error) { // cas ou nest pas envoyer
                
                setError('Erreur lors de  envoie des données');
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // affichage de la liste des posts  depuis state
    const displayPost = posts.map((ps) => (
        <div key={ps.id} className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{ps.title}</h5>
                <p className="card-text">{ps.body}</p>
            </div>
        </div>
    ));


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Liste des articles</h1>
            {isLoading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : (
                <div>{displayPost}</div>
            )}
            {error}
        </div>
    );
}
