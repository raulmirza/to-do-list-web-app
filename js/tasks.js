window.ToDoList = {
    API_URL: 'http://localhost:8081/tasks',

    createTask: function () {
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $('#deadline-field').val();

        let requestBody = {
            description: descriptionValue,
            deadline: deadlineValue

        };

        $.ajax({
            url: ToDoList.API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function() {
            console.log('success');
            ToDoList.getTasks();
        });
    },

    getTasks:function() {
        $.ajax({
            url:ToDoList.API_URL,
        }).done(function (response) {
           ToDoList.displayTasks(JSON.parse(response));
        });
    },

    displayTasks: function(tasks) {
        let rowsHtml ='';

        tasks.forEach(task => rowsHtml += ToDoList.getTaskRowHtml(task));

        $('#tasks-table tbody').html(rowsHtml);
    },

    getTaskRowHtml:function(task) {
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString('ro');
        let checkedAttribute = task.done ? 'checked' : '';


        return ` <tr>
        <td>${task.description}</td>
        <td>${formattedDeadline}</td>
        <td>
            <input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAttribute}>
        </td>
        <td>
            <a href="#" class="remove-task"> 
            <i class='fa fa-trash'></i>
            </a>
        </td>
    </tr>`
    },

    bindEvents: function () {
          $('#create-task-form').submit(function(event) {
              event.preventDefault();
              ToDoList.createTask();
          });
    }

};

ToDoList.getTasks();
ToDoList.bindEvents();