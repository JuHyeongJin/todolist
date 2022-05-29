//유저가 값을 입력하고 +를 클릭하면 할일 추가
//delete버튼을 누르면 할일 삭제
//check버튼을 누르면 할일이 끝나면서 줄이 그어짐
//진행중 or 끝남 탭을 누르면, 언더바 이동

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underline = document.getElementById("under-line");
let mode = "all";
let taskList = [];
let filterList = [];
addButton.addEventListener("click",addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render();
}

function render(){
    let List = [];
    if(mode == "all"){
        List = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        List = filterList;
    }
    let resultHTML = "";

    for(let i=0;i<List.length;i++){
        if(List[i].isComplete == true){
            resultHTML += `
            <div class="task task-done-parent">
                <div class="task-done">${List[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${List[i].id}')">Check</button>
                    <button onclick="deleteTask('${List[i].id}')">Delete</button>
                </div>
            </div>`;
        }else{
            resultHTML += `
            <div class="task">
                <div>${List[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${List[i].id}')">Check</button>
                    <button onclick="deleteTask('${List[i].id}')">Delete</button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    underline.style.left = event.currentTarget.offsetLeft + "px";
    underline.style.width = event.currentTarget.offsetWidth + "px";
    underline.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}