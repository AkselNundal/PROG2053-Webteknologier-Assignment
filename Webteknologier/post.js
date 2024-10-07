let limit = 9;
let page = 1;
let isLoading = false;

function fetchPostData() {
    if (isLoading) return;
    isLoading = true;

    const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            let container = document.getElementById("main-container");

            for (let post of posts) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);
            }
            isLoading = false;
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
            isLoading = false;
        });
}

function scrollFunction() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        page++;
        fetchPostData();
    }
}

window.addEventListener('scroll', scrollFunction);

fetchPostData();
