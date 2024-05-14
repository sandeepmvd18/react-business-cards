import React, { useState } from 'react';

export function AddCardForm({ onAddCard }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [otherSocialMedia, setOtherSocialMedia] = useState('');
    const [interests, setInterests] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = {
            name,
            description,
            linkedin,
            twitter,
            otherSocialMedia,
            interests: interests.split(',').map((interest) => interest.trim()),
        };
        onAddCard(newCard);
        setName('');
        setDescription('');
        setLinkedin('');
        setTwitter('');
        setOtherSocialMedia('');
        setInterests('');
    };

    return (
        <div>
            <h2>Add New Card</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="url" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                <input type="url" placeholder="Twitter URL" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                <input type="url" placeholder="Other Social Media URL" value={otherSocialMedia} onChange={(e) => setOtherSocialMedia(e.target.value)} />
                <input type="text" placeholder="Interests (comma separated)" value={interests} onChange={(e) => setInterests(e.target.value)} />
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
}

