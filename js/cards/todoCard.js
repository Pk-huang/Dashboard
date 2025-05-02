// todoCard.js

export function todoCard() {
  const form = document.querySelector('#todo-form')
  const input = document.querySelector('#todo-input')
  const list = document.querySelector('#todo-list')
  const undoArea = document.getElementById('undo-area');
  const undoBtn = document.getElementById('undo-btn');


  let todo = JSON.parse(localStorage.getItem('dashboard_todos')) || []
  let lastDeleted = null

  function saveTode() {
    localStorage.setItem('dashboard_todos', JSON.stringify(todo))
  }

  function renderTodo() {
    list.innerHTML = ''
    todo.forEach((todo, index) => {
      const li = document.createElement('li')
      li.textContent = todo
      li.dataset.index = index

      const delBtn = document.createElement('button')
      delBtn.textContent = "Delete"
      delBtn.addEventListener('click', () => {
        deleteTodo(index)
      })

      li.appendChild(delBtn)
      list.appendChild(li)
    });
  }

  function addTodo(text){
    if(!text.trim()) return
    todo.push(text.trim())
    saveTode()
    renderTodo()
  }

  function deleteTodo(index){
    lastDeleted = todo[index]
    todo.splice(index,1)
    saveTode()
    renderTodo()
    showUndo()
  }

  function showUndo(){
    undoArea.style.display = 'block'
    setTimeout(() => {
      undoArea.style.display = 'none'
      lastDeleted = null
    }, 5000);
  }  


  undoBtn.addEventListener('click',()=>{
    if(lastDeleted){
      todo.push(lastDeleted)
      saveTode()
      renderTodo()
      lastDeleted = null
      undoArea.style.display = "none"
    }
  })

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTodo(input.value);
    input.value = ''; 
  })

  renderTodo();

}


// 建立可輸入待辦事項的表單

// 渲染待辦項目清單（動態）

// 支援刪除功能（+ undo 還原）

// 資料會儲存在 localStorage，下次載入會自動恢復