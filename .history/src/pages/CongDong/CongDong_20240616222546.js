import React, { useState } from 'react';

function CongDong() {
    const [responseData, setResponseData] = useState(null);

    const handleFetch = async () => {
        const url = 'http://localhost/VietNamJourney/Server/Post_Comment.php'; 
        const data = { test: "data" };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify({ post_ID: 2 }) 
               console.log(result);
            });

            if (response.ok) {
                const result = await response.json();
                setResponseData(result);
            } else {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseData({ error: error.message });
        }
    };

    return (
        <div>
            <h1>Đây là trang cộng đồng</h1>
            <button onClick={handleFetch}>Gửi yêu cầu đến server</button>
            {responseData && (
                <div id="status">
                    <h3>Kết quả từ server:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default CongDong;