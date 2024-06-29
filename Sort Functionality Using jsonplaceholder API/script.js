// const productList = document.getElementById('product-list');
// const paginationContainer = document.getElementById('pagination');
// const sortButton = document.getElementById('sortButton');
// const sortSelect = document.getElementById('sortSelect');

// let currentPage = 1;
// const itemsPerPage = 6;
// let sortCriteria = '';

// sortButton.addEventListener('click', () => {
//     sortCriteria = sortSelect.value;
//     console.log(sortCriteria);
//     fetchData(currentPage, sortCriteria);
// });

// async function fetchData(pageNumber, sortCriteria) {
//     let url = `https://jsonplaceholder.typicode.com/users?_page=${pageNumber}&_limit=${itemsPerPage}`;
    
//     // Append _sort only if sortCriteria is not empty
//     if (sortCriteria) {
//         url += `&_sort=${sortCriteria}`;
//     }
    
//     try {
//         const response = await fetch(url);
//         const totalItems = response.headers.get('X-Total-Count');
//         const data = await response.json();
//         displayProducts(data);
//         updatePagination(totalItems);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// function displayProducts(products) {
//     productList.innerHTML = ''; // Clear existing products
//     products.forEach(product => {
//         const listItem = document.createElement('li');
//         listItem.className = 'product-item';
//         listItem.innerHTML = `
//             <h2>${product.name}</h2>
//             <p>Email: ${product.email}</p>
//             <p>Phone: ${product.phone}</p>
//         `;
//         productList.appendChild(listItem);
//     });
// }

// function updatePagination(totalProducts) {
//     const totalPages = Math.ceil(totalProducts / itemsPerPage);
//     paginationContainer.innerHTML = ''; // Clear existing buttons

//     // Create previous button (if not on first page)
//     if (currentPage > 1) {
//         const prevButton = document.createElement('button');
//         prevButton.textContent = 'Previous';
//         prevButton.addEventListener('click', () => {
//             currentPage--;
//             fetchData(currentPage, sortCriteria);
//         });
//         paginationContainer.appendChild(prevButton);
//     }

//     // Create page number buttons
//     for (let i = 1; i <= totalPages; i++) {
//         const pageButton = document.createElement('button');
//         pageButton.textContent = i;
//         if (currentPage === i) {
//             pageButton.classList.add('active');
//         }
//         pageButton.addEventListener('click', () => {
//             currentPage = i;
//             fetchData(currentPage, sortCriteria);
//         });
//         paginationContainer.appendChild(pageButton);
//     }

//     // Create next button (if not on last page)
//     if (currentPage < totalPages) {
//         const nextButton = document.createElement('button');
//         nextButton.textContent = 'Next';
//         nextButton.addEventListener('click', () => {
//             currentPage++;
//             fetchData(currentPage, sortCriteria);
//         });
//         paginationContainer.appendChild(nextButton);
//     }
// }

// // Initial fetch on page load
// fetchData(currentPage, sortCriteria);


const productList = document.getElementById('product-list');
const paginationContainer = document.getElementById('pagination');
const sortButton = document.getElementById('sortButton');
const sortSelect = document.getElementById('sortSelect');

let currentPage = 1;
const itemsPerPage = 6;
let sortCriteria = '';
let fetchedData = [];

sortButton.addEventListener('click', () => {
    sortCriteria = sortSelect.value;
    console.log(sortCriteria); // Check if sortCriteria is correctly set
    sortAndDisplayData();
});

async function fetchData() {
    let url = `https://jsonplaceholder.typicode.com/users`;

    try {
        const response = await fetch(url);
        fetchedData = await response.json();
        sortAndDisplayData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function sortAndDisplayData() {
    let sortedData = [...fetchedData];

    if (sortCriteria) {
        sortedData.sort((a, b) => {
            let aValue, bValue;
            if (sortCriteria === 'city') {
                aValue = a.address.city;
                bValue = b.address.city;
            } else {
                aValue = a[sortCriteria];
                bValue = b[sortCriteria];
            }

            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    }

    displayProducts(sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    updatePagination(sortedData.length);
}

function displayProducts(products) {
    productList.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'product-item';
        listItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>Email: ${product.email}</p>
            <p>Phone: ${product.phone}</p>
            <p>City: ${product.address.city}</p>
        `;
        productList.appendChild(listItem);
    });
}

function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    paginationContainer.innerHTML = ''; // Clear existing buttons

    // Create previous button (if not on first page)
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            sortAndDisplayData();
        });
        paginationContainer.appendChild(prevButton);
    }

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (currentPage === i) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            sortAndDisplayData();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create next button (if not on last page)
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            sortAndDisplayData();
        });
        paginationContainer.appendChild(nextButton);
    }
}

// Initial fetch on page load
fetchData();

