import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Stories.css';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch( 
            'https://child.onrender.com/api/sciencefiction'

        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setStories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching stories:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="stories">
            {stories.map(story => (
                <div className="story-card" key={story.id}>
                    <img className="story-image" src={story.imageUrl} alt={story.title} />
                    <div className="story-content">
                        <h3 className="story-title">{story.title}</h3>
                        <p className={`story-status ${story.status.toLowerCase().replace(' ', '-')}`}>
                            {story.status}
                        </p>
                        <Link to={`/story/${story.id}`} className="story-link">Read More</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Stories;
