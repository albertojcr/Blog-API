import {createPost, getAllPost, getPost} from "./js/post/apiClient.js";
import {renderPostTable, renderManagePostTable, showNewPostModal} from "./js/post/table.js";
import {getAllUsers} from "./js/user/apiClient.js";
import {renderUserTable, showNewUserModal} from "./js/user/table.js";

getSessionInfo(showSessionInfo);

getAllPost(renderManagePostTable);

getAllPost(renderPostTable);
getAllUsers(renderUserTable);

let newPostButton = document.getElementById('new-post');
newPostButton.addEventListener('click', showNewPostModal);

let newUserButton = document.getElementById('user-post');
newUserButton.addEventListener('click', showNewUserModal);


function getSessionInfo(callback) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:9200/session", requestOptions)
        .then(response => response.json())
        .then(callback);
}

function showSessionInfo(session) {
    let userElement = document.getElementById('user-info');

    renderNavbar();
    if (session.email === null) {
        const loginButton = createLoginButton();
        userElement.appendChild(loginButton);
    } else {
        const logoutButton = createLogoutButton();
        userElement.appendChild(logoutButton);
    }
}

function renderNavbar() {
    let userElement = document.getElementById('user-info');
    userElement.innerHTML = `
                    <li class="nav-item rounded m-lg">
                    <a class="nav-link active" aria-current="page" href="/home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-post" viewBox="0 0 16 16">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                            <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        Posts
                    </a>
                </li>

                <li class="nav-item rounded m-lg" id="register" data-bs-toggle="modal" data-bs-target="#post-modal">
                    <a class="nav-link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-at" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                        </svg>
                        Registrarse
                    </a>
                </li>
                <li class="nav-item rounded m-lg d-none">
                    <a class="nav-link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </a>
                </li>
    `;
    let registerButton = document.getElementById('register');
    registerButton.addEventListener('click', showNewUserModal);
}

function createLoginButton()
{
    let button = document.createElement('li');
    button.setAttribute('data-bs-toggle', "modal");
    button.setAttribute('data-bs-target', "#post-modal");
    button.classList.add('nav-item', 'rounded', 'm-lg');
    button.innerHTML = `<a class="nav-link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        Login
                    </a>`;
    button.addEventListener('click', showLoginModal);

    return button;
}

function createLogoutButton()
{
    let button = document.createElement('li');
    button.classList.add('nav-item', 'rounded', 'm-lg');
    button.innerHTML = `<a class="nav-link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        Logout
                    </a>`;
    button.addEventListener('click', logout);

    return button;
}


function showLoginModal() {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = 'Login';
    modalBody.innerHTML = `
                <form id="login-form">
                    <div class="mb-3">
                        <label class="form-label" for="user-title">Email</label>
                        <input type="text" name="email" class="form-control" id="login-email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="user-title">Password</label>
                        <input type="password" name="password" class="form-control" id="login-password">
                    </div>
                    <div id="login-error"></div>
                    <button  id="submit-login" class="btn btn-primary">Login</button>
                </form>`

    let submitLogin = document.getElementById('submit-login');
    submitLogin.addEventListener('click', doLogin);

}

function doLogin(event) {
    event.preventDefault();
    let errorSection = document.getElementById('login-error');
    errorSection.textContent = '';
    let form = document.getElementById('login-form');
    let formData = new FormData(form);
    login(formData,
        () => {
            getSessionInfo(showSessionInfo);
        },
        catchLoginError);

    document.querySelector('.btn-close').click();
}

function catchLoginError(error) {
    error.then(
        (errorText) => {
            let errorSection = document.getElementById('login-error');
            errorSection.textContent = errorText;
        }
    )
}

function login(formData, callback, error) {

    const DATA = `{
        "email": "${formData.get('email')}",
        "password": "${formData.get('password')}"
    }`;

    let requestOptions = {
        method: 'POST',
        body: DATA,
        redirect: 'follow'
    };

    fetch("http://localhost:9200/login", requestOptions)
        .then(response => {
            if (response.status === 401) {
                catchLoginError(response.json());
                return;
            }
            return response.json();
        })
        .then(callback)
        .catch(error);
}

function logout() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:9200/logout", requestOptions)
        .then(response => response.json())
        .then(() => location.reload());
}



