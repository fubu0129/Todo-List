const addTask = document.querySelector('.add');
const list = document.querySelector('.tasks');

let todos = [];

function addTodo(text) {
    const todo = {
        id: Date.now(),
        text,
        completed: false,
    };
    todos.push(todo);
}

function renderTodo() {
    let temp = '';
    todos.forEach(todo => {
        const html = `
        <li key="${todo.id}" class="${todo.completed ?'completed' : ''}">
            <span>${todo.text}</span>
            <button class="complete" data-id="${todo.id}">
                ${todo.completed ? '完了済み' : '完了'}
            </button>
            <button class="delete" data-id="${todo.id}">削除</button>
        </li>
        `;
        temp += html;
    });

    list.innerHTML = temp;

  document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', deleteTodo);
  });
  document.querySelectorAll('.complete').forEach(button => {
      button.addEventListener('click', toggleComplete);
  });
}

function deleteTodo(e) {
  const id = e.target.dataset.id;
  todos = todos.filter(todo => todo.id != id); 
  renderTodo();
}

function toggleComplete(e) {
  const id = e.target.dataset.id;
  todos = todos.map(todo => {
      if (todo.id == id) {
          return { ...todo, completed: !todo.completed };
      }
      return todo;
  });
  renderTodo();
}

addTask.addEventListener('submit', e => {
    e.preventDefault();

    const text = addTask.add.value.trim();
    if(text !== '') {
        addTodo(text);
        addTask.reset();
        renderTodo();
    }
});