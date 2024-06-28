const todoList = document.getElementById('todo-list');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const itemsPerPage = 20; // Adjust this value to control the number of todos per page

function fetchData(pageNumber) {
  const url = `https://jsonplaceholder.typicode.com/todos?_page=${pageNumber}&_limit=${itemsPerPage}`;
  fetch(url)
    .then(response => {
      const totalItems = response.headers.get('X-Total-Count'); // Fetch total count from headers
      return response.json().then(data => ({ data, totalItems }));
    })
    .then(({ data, totalItems }) => {
      displayTodos(data);
      updatePagination(totalItems);
    })
    .catch(error => console.error(error));
}

function displayTodos(todos) {
  todoList.innerHTML = ''; // Clear existing todos
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.title;
    if (todo.completed) {
      listItem.classList.add('completed');
    }
    todoList.appendChild(listItem);
  });
}

function updatePagination(totalTodos) {
  const totalPages = Math.ceil(totalTodos / itemsPerPage);
  console.log("Total Pages:", totalPages);
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
    // Clear existing classes before applying 'active'
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

fetchData(currentPage); // Initial fetch on page load
