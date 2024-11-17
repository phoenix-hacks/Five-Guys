import React from 'react';
import axios from 'axios';

const App = () => {
    const handleListFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/list-files');
            alert(response.data); // Show response from the server
        } catch (error) {
            console.error('Error fetching files:', error.message);
            alert('Failed to list files.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Start File Sync</h1>
            <button
                onClick={handleListFiles}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Sync Now
            </button>
        </div>
    );
};

export default App;