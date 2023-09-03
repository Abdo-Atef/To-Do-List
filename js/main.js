let taskStatus = $(".addTaskForm #floatingSelect1");
let taskCategory = $(".addTaskForm #floatingSelect2");
let taskTitle = $(".addTaskForm #floatingInput");
let taskDescription = $(".addTaskForm #floatingTextarea2");
let tasksList = [];

if (localStorage.getItem("tasksList") != null) {
  tasksList = JSON.parse(localStorage.getItem("tasksList"));
  displayLists(tasksList);
  
}

(function ColRow() {
  let icon = $("section .header .style i");
  let content = $("main .row");
  icon.click(function () {
    icon.removeClass("active");
    $(this).addClass("active");

    if ($(this).hasClass("bi-grid-1x2")) {
      content.removeClass("flex-column").addClass("flex-row");
      $("main .row > div").removeClass("w-100");
    } else {
      content.removeClass("flex-row").addClass("flex-column");
      $("main .row > div").addClass("w-100");
    }
  });
})();

(function DarkMode() {
  let mood = $("section .header .mode i");
  let sun = $("section .header .mode .bi-brightness-high-fill");
  let moon = $("section .header .mode .bi-moon-stars-fill");
  let root = $(":root");
  mood.click(function () {
    if ($(this).hasClass("bi-brightness-high-fill")) {
      root.css("--main-backgroundColor", "#f1f1f1");
      root.css("--second-backgroundColor", "#ddd");
      root.css("--text-color", "#222");
      root.css("--mid-gray", "#f1f1f1");
      sun.addClass("d-none");
      moon.removeClass("d-none");
    } else if ($(this).hasClass("bi-moon-stars-fill")) {
      root.css("--main-backgroundColor", "#0d1117");
      root.css("--second-backgroundColor", "#161b22");
      root.css("--text-color", "#a5a6a7");
      root.css("--mid-gray", "#474a4e");
      moon.addClass("d-none");
      sun.removeClass("d-none");
    }
  });
})();

(function add$RemoveTaskForm() {
  $(".addNewTask").click(function () {
    $(".addTaskForm").removeClass("d-none");
    $("#AddTask").removeClass("d-none");
    $("#updateTask").addClass("d-none");
  });
  $(".addTaskForm").click(function () {
    $(".addTaskForm").addClass("d-none");
  });
  $(".addTaskForm .container").click(function (e) {
    e.stopPropagation();
  });
  $("#AddTask").click(function () {
    $(".addTaskForm").addClass("d-none");
  });
})();

(function addTask() {

  $("#AddTask").click(function () {
    let task = {
      taskStat: taskStatus.val(),
      taskCat: taskCategory.val(),
      taskT: taskTitle.val(),
      taskDes: taskDescription.val(),
    };

    tasksList.push(task);
    displayLists(tasksList);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));

  });
})();

function displayLists(arr) {
  let nextUpBox = "";
  let inProgressBox = "";
  let doneBox = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].taskCat === "Education") {
      categoryColor = "bg-primary";
    }
    else if(arr[i].taskCat === "Health & Fitness"){
      categoryColor = "bg-warning";
    }
    else if(arr[i].taskCat === "Finance"){
      categoryColor = "bg-danger";
    }
    else if(arr[i].taskCat === "Productivity"){
      categoryColor = "bg-success";
    }
    let taskBox = `
        <div class="content mb-2" data-index=${i}>
          <h5>${arr[i].taskT}</h5>
          <p class="mt-2">${arr[i].taskDes}</p>
          <span class="category ${categoryColor}">${arr[i].taskCat}</span>
          <div class="edit mt-3 d-flex gap-3">
            <i class="bi bi-pencil-square" onclick="updateTasks(event)" id="updateList"></i>
            <i class="bi bi-trash-fill" id="deleteList" data-id='${i}'></i>
            <i class="bi bi-palette-fill" onclick="changeBgColor(event)"></i>
          </div>
        </div>
      `;

    if (arr[i].taskStat === "nextUp") {
      nextUpBox += taskBox;
    } else if (arr[i].taskStat === "inProgress") {
      inProgressBox += taskBox;
    } else if (arr[i].taskStat === "done") {
      doneBox += taskBox;
    }
  }
  $(`main .nextUp .body`).html(nextUpBox);
  $(`main .inProgress .body`).html(inProgressBox);
  $(`main .done .body`).html(doneBox);

  listsLength();
}

function listsLength() {
  let nextUp= $('main .nextUp .body .content').length;
  let inProgress= $('main .inProgress .body .content').length;
  let done= $('main .done .body .content').length;

  $('main #nextUpLength').text(nextUp);
  $('main #inProgressLength').text(inProgress);
  $('main #doneLength').text(done);
}

(function deleteLists(){
  document.querySelector("main").addEventListener("click", function (event) {
    if (event.target.id === "deleteList") {
      let id = event.target.getAttribute("data-id");
      tasksList.splice(id, 1);
      displayLists(tasksList);
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    }
  });
})();

function changeBgColor(e){
  let x = Math.round(Math.random() * 255);
  let y = Math.round(Math.random() * 255);
  let z = Math.round(Math.random() * 255);
  $(e.target).parent().parent().css('backgroundColor',`rgb(${x},${y},${z})`);
}

function updateTasks(e) {
  $('.addTaskForm').removeClass('d-none')
  $('#AddTask').addClass('d-none')
  $('#updateTask').removeClass('d-none')

  let id = $(e.target).parent().parent().attr('data-index')
  mainId=id;
  taskStatus.val(tasksList[id].taskStat);
  taskCategory.val(tasksList[id].taskCat);
  taskTitle.val(tasksList[id].taskT) ;
  taskDescription.val(tasksList[id].taskDes);

  $('#updateTask').click(function () {
    let task = {
      taskStat: taskStatus.val(),
      taskCat: taskCategory.val(),
      taskT: taskTitle.val(),
      taskDes: taskDescription.val(),
    };
    tasksList[id] = task;
    displayLists(tasksList);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    $('.addTaskForm').addClass('d-none')
  })
  
}
function taskSearch(word) {
  let searchList = [];
  for(let task of tasksList){
    if(task.taskT.includes(word)){
      searchList.push(task);
    }
  }
  displayLists(searchList);
}