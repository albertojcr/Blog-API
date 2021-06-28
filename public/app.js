import {createPost, getAllPost, getPost, getPostByUserId} from "./js/post/apiClient.js";
import {renderPostTable, renderManagePostTable, showNewPostModal} from "./js/post/table.js";
import {getAllUsers, getUserByEmail} from "./js/user/apiClient.js";
import {renderUserTable, showNewUserModal} from "./js/user/table.js";

getSessionInfo(showSessionInfo);
getAllPost(renderPostTable);


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
        userElement.appendChild(createRegisterButton());
        userElement.appendChild(createLoginButton());
    } else {
        if (session.role === 'Administrador') {
            userElement.appendChild(createMyAccountButton());
            var dropdownMenu = document.getElementById('dropdown-menu');
            dropdownMenu.appendChild(createAdminPanelButton());
        } else {
            userElement.appendChild(createMyAccountButton());
        }
        dropdownMenu.appendChild(createMyPostsButton());
        dropdownMenu.appendChild(createLogoutButton());
    }
}

function renderNavbar() {
    let userElement = document.getElementById('user-info');
    userElement.innerHTML = `
                    <li class="nav-item rounded m-lg">
                    <a class="nav-link" aria-current="page" href="/home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-post" viewBox="0 0 16 16">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                            <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        Posts
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
}

function createRegisterButton() {
    let button = document.createElement('li');
    button.classList.add('nav-item', 'rounded', 'm-lg');
    button.setAttribute('id', 'register');
    button.setAttribute('data-bs-toggle', "modal");
    button.setAttribute('data-bs-target', "#post-modal");
    button.innerHTML = `<a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-at" viewBox="0 0 16 16">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                            </svg>
                            Register
                        </a>`;
    button.addEventListener('click', showNewUserModal);

    return button;
}

function createLoginButton() {
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

function createMyAccountButton() {
    let button = document.createElement('li');
    button.classList.add('nav-item', 'dropdown', 'rounded', 'm-lg');
    button.innerHTML = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            My account
                        </a>
                        <ul id="dropdown-menu" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"></ul>`;

    return button;
}

function createLogoutButton() {
    let button = document.createElement('li');
    button.innerHTML = `<a class="dropdown-item text-danger" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        Logout
                    </a>`;
    button.addEventListener('click', logout);

    return button;
}

function createAdminPanelButton() {
    let button = document.createElement('li');
    button.innerHTML = `<a class="dropdown-item" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                        Admin panel
                    </a>`;
    button.addEventListener('click', renderAdminPanelSection);

    return button;
}

function createMyPostsButton() {
    let button = document.createElement('li');
    button.innerHTML = `<a class="dropdown-item" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-stickies" viewBox="0 0 16 16">
                          <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"/>
                          <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z"/>
                        </svg>
                        My posts
                    </a>`;
    button.addEventListener('click', renderMyPostsSection);

    return button;
}

function renderAdminPanelSection() {
    let cardContainer = document.getElementById('card-container');
    cardContainer.classList.add('d-none');
    let adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.remove('d-none');
    getAllPost(renderManagePostTable);
    getAllUsers(renderUserTable);
}

function renderMyPostsSection() {
    getMyPosts();
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

function getMyPosts() {
    let email = getSessionInfo();
    console.log(email);

    getUserByEmail("alberto@mail.com", console.log(getPostByUserId()));
}

