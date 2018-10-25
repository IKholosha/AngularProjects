var userId = document.getElementById('userid');
var userName = document.getElementById('username');
var userProfession = document.getElementById('profession');

var refreshBtn = document.getElementById('refresh');
var addBtn = document.getElementById('add');
var saveBtn = document.getElementById('save');

var getAsync = function(url) {
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject(JSON.parse('{status: error}'));
            }
        };
        req.send(null);
    });
};

var deleteAsync = function(url) {
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('DELETE', url);
        req.onload = function() {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject(JSON.parse('{status: error}'));
            }
        };
        req.send(null);
    });
};

var postAsync = function(url, data) {
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('POST', url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function() {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject(JSON.parse('{status: error}'));
            }
        };
        req.send(data);
    });
};

function getUsers() {
    var url = 'api/user/listUsers';
    getAsync(url)
        .then(function(response) {
            var users = response;
            console.dir(users);

            var table = document.getElementById("users");
            var rowLength = table.rows.length;
            for(let i = 0; i < rowLength-1; i++) {
                table.deleteRow(1);
            }

            users.forEach(function(user) {
                var row = table.insertRow(table.rows.length);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = user.id;
                cell2.innerHTML = user.name;
                cell3.innerHTML = user.profession;
                cell4.innerHTML = '<a href="javascript:void(0);" onclick="editUser(' + user.id + ',`' + user.name + '`, `' + user.profession + '`)">Edit</a> <a href="javascript:void(0);" onclick="deleteUser(' + user.id + ');">Delete</a>';
            })
    });
}

function addUser() {
    var url = 'api/user/addUser';
    var data = {
        id: userId.value,
        name: userName.value,
        profession: userProfession.value,
    };

    postAsync(url, JSON.stringify(data))
        .then(function(response) {
            getUsers();
        });
}

function editUser(id, name, profession) {
    userId.value = id;
    userName.value = name;
    userProfession.value = profession;
}

function saveUser() {
    var url = 'api/user/editUser/' + userId.value;
    var data = {
        name: userName.value,
        profession: userProfession.value,
    };

    postAsync(url, JSON.stringify(data))
        .then(function(response) {
            getUsers();
        });
}

function deleteUser(id) {
    var url = 'api/user/deleteUser/' + id;

    deleteAsync(url)
        .then(function(response) {
            getUsers();
        });
}

refreshBtn.addEventListener('click', getUsers);
addBtn.addEventListener('click', addUser);
saveBtn.addEventListener('click', saveUser);

getUsers();
