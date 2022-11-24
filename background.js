// verials 
const tasks = document.querySelector(".tasks");
const mgsBox = document.querySelector(".msg-box");
const searchIcon = document.querySelector("#search-icon");
const searchInput = document.querySelector("#search");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");
const changeText = document.querySelector(".changeText");
const btnColors = document.querySelectorAll(".colors span");
const msgSearch = document.querySelector("#msg-search");
const inputTask = document.querySelector("#inputTask");
const addBtn = document.querySelector("#addIcon");
const wrapperTask = document.querySelector(".wrapper");

let allTasks = (JSON.parse(localStorage.getItem("todTask")) || []);

// active wrapper add task
addBtn.addEventListener("click", () => {
  wrapperTask.classList.toggle("active");
});

// eventlistener search
searchInput.addEventListener("keyup", searchTask);

// save btn 
saveBtn.addEventListener("click", () => {
  if (inputTask.value === "") {
    inputTask.style.border = "1px solid #0077ff";
    inputTask.style.borderRadius = "8px";
  } else {
    inputTask.style.border = "none";
    inputTask.style.borderRadius = "0";

    // create task box dynamic
    const task = document.createElement("div");
    task.classList.add("task");
    const div1 = document.createElement("div");
    task.append(div1);
    const IconCircle = document.createElement("i");
    IconCircle.classList.add("bi");
    IconCircle.classList.add("bi-circle");
    div1.append(IconCircle);
    const taskName = document.createElement("h2");
    taskName.classList.add("task-name");
    taskName.textContent = inputTask.value;
    div1.append(taskName);
    const div2 = document.createElement("div");
    task.append(div2);
    const iconEdit = document.createElement("i");
    iconEdit.classList.add("bi");
    iconEdit.classList.add("bi-pencil-square");
    div2.append(iconEdit);
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("bi");
    removeIcon.classList.add("bi-trash3-fill");
    div2.append(removeIcon);

    // true task icon click
    IconCircle.addEventListener("click", () => {
      if (IconCircle.classList.contains("bi-circle")) {
        IconCircle.classList.replace("bi-circle", "bi-check-circle-fill");
        IconCircle.style.color = "#34CD68";
        taskName.style.textDecoration = "line-through";
      } else {
        IconCircle.classList.replace("bi-check-circle-fill", "bi-circle");
        taskName.style.textDecoration = "none";
      }
    });

    //  remove task box

    removeIcon.addEventListener("click", () => {
      task.remove();
    });

    // edit btn

    iconEdit.addEventListener("click", () => {
      wrapperTask.classList.add("active");

      if (taskName.textContent !== "") {
        inputTask.value = taskName.textContent;
        task.remove();
        changeText.textContent = "Edit Your Task";
      }

      saveBtn.addEventListener("click", () => {
        if (taskName.textContent === "") {
        } else {
          taskName.textContent = inputTask.value;
          changeText.textContent = "Add New Task";
        }
      });
    });
    
    let Tasks = {
        task_name: taskName.textContent,
        // taskbox: task,
        // icon_circle : IconCircle
    }

    allTasks.push(Tasks)
    localStorage.setItem("todTask", JSON.stringify(allTasks));
    
    tasks.append(task);
    // showTask();
    
    mgsBox.style.display = "none";
    inputTask.value = "";
    wrapperTask.classList.remove("active");
  }

});

// cancel btn
cancelBtn.addEventListener("click", () => {
  if (wrapperTask.classList.contains("active")) {
    wrapperTask.classList.remove("active");
    inputTask.value = "";
  }
});

// search task
function searchTask(e) {
  const textInput = e.target.value.toLowerCase();

  document.querySelectorAll(".task").forEach((tasks) => {
    const task = tasks.firstChild.textContent;
    if (task.toLowerCase().indexOf(textInput) != -1) {
      tasks.style.display = "flex";
      msgSearch.style.display = "none";
    } else {
      tasks.style.display = "none";
      msgSearch.style.display = "flex";
    }
  });
}

 // Select colors
btnColors.forEach((color) => {
    color.addEventListener("click", () => {
      if (!color.classList.contains("active")) {
        let dataColor = color.getAttribute("data-color"); 
        document.querySelector(":root").style.setProperty("--select-color", dataColor);
        resetActiveColor();
        color.classList.add("active");
      }
    });
});

function resetActiveColor() {
   btnColors.forEach((color) => {
     color.classList.remove("active");
   });
}


// showTask();


// // show localStorage tasks 
// function showTask() {
//     let tas = '';

//     if(allTasks.length > 0) {
//         allTasks.forEach(Alltask => {
//             tas += ` <div class="task">
//             <div>
//                 <i class="bi bi-circle"></i>
//                 <h2 class="task-name">${Alltask.task_name}</h2>
//             </div>
//             <div>
//                <i class="bi bi-pencil-square"></i>
//                <i class="bi bi-trash3-fill"></i>
//             </div>
//           </div>`;
//            mgsBox.style.display = "none";
//         })
//     }

//     tasks.innerHTML = tas;
// }