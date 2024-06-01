import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StoryDetails.css';

const StoryDetails = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(
            
            `https://child.onrender.com/api/sciencefiction/${id}`
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setStory(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching story details:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!story) {
        return <div>No story found</div>;
    }

    return (
        <div className="story-details">
            <h1>{story.title}</h1>
            <img className="story-image" src={story.imageUrl} alt={story.title} />
            <div className="story-content">
                <p>{story.description}</p>
            </div>
        </div>
    );
}

export default StoryDetails;
