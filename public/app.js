import {createPost, getAllPost, getPost, getPostByUserId} from "./js/post/apiClient.js";
import {renderPostTable, renderManagePostTable, showNewPostModal} from "./js/post/table.js";
import {getAllUsers, getUserByEmail} from "./js/user/apiClient.js";
import {renderUserTable, showNewUserModal} from "./js/user/table.js";
import {renderNavbarButtons} from "./js/navbar.js";

getSessionInfo(renderNavbarButtons);
getAllPost(renderPostTable);

export function getSessionInfo(callback) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:9200/session", requestOptions)
        .then(response => response.json())
        .then(callback);
}

export function renderAdminPanelSection() {
    let cardContainer = document.getElementById('card-container');
    cardContainer.classList.add('d-none');
    let adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.remove('d-none');
    getAllPost(renderManagePostTable);
    getAllUsers(renderUserTable);
}

export function renderMyPostsSection() {

}

export function showLoginModal() {
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
                    <div id="login-error" class="text-danger mb-3"></div>
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
        (callback) => {
            if (callback !== undefined) {
                document.querySelector('.btn-close').click();
            }
            getSessionInfo(renderNavbarButtons);
        },
        catchLoginError);
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

export function logout() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:9200/logout", requestOptions)
        .then(response => response.json())
        .then(() => location.reload());
}


