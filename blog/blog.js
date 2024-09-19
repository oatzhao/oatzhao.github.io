document.addEventListener("DOMContentLoaded", function() {
    const userIdInput = document.getElementById("userIdInput");
    const userInfoDiv = document.getElementById("userInfo");
    const postsDiv = document.getElementById("posts");

    // Function to fetch user details and posts
    async function fetchUserData(userId) {
        try {
            // Fetch user details
            const userResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`);
            const user = await userResponse.json();

            // Display user info
            userInfoDiv.innerHTML = `
                <h3>User Info:</h3>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
            `;

            // Fetch user posts
            const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const posts = await postsResponse.json();

            // Display posts in a single DOM update
            let postsHtml = "<h3>User's Posts:</h3>";
            posts.forEach(post => {
                postsHtml += `
                    <div class="post">
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                    </div>
                `;
            });

            postsDiv.innerHTML = postsHtml;

        } catch (error) {
            console.error("Error fetching user data:", error);
            userInfoDiv.innerHTML = "<p>Error fetching user data. Please try again.</p>";
        }
    }

    // Add event listener for form submission
    document.getElementById("submitBtn").addEventListener("click", function() {
        const userId = userIdInput.value;
        if (userId) {
            fetchUserData(userId);
        } else {
            alert("Please enter a valid user ID.");
        }
    });
});
