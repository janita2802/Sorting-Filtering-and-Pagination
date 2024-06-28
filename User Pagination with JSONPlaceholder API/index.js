const userList = document.getElementById('user-list');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const itemsPerPage = 6;

function fetchData(pageNumber) {
  const url = `https://jsonplaceholder.typicode.com/users?_page=${pageNumber}&_limit=${itemsPerPage}`;
  fetch(url)
    .then(response => {
      const totalItems = response.headers.get('X-Total-Count');
      return response.json().then(data => ({ data, totalItems }));
    })
    .then(({ data, totalItems }) => {
      displayUsers(data);
      updatePagination(totalItems);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayUsers(users) {
  userList.innerHTML = ''; // Clear existing users
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.className = 'user-item';
    listItem.innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
    `;
    userList.appendChild(listItem);
  });
}

function updatePagination(totalUsers) {
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  paginationContainer.innerHTML = ''; // Clear existing buttons

  // Create previous button (if not on first page)
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
      currentPage--;
      fetchData(currentPage);
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
      fetchData(currentPage);
    });
    paginationContainer.appendChild(pageButton);
  }

  // Create next button (if not on last page)
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage++;
      fetchData(currentPage);
    });
    paginationContainer.appendChild(nextButton);
  }
}

// Initial fetch on page load
fetchData(currentPage);
