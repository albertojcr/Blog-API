import {getPostByUserId} from "./post/apiClient.js";
import {renderUserPostsTable} from "./post/table.js";
import {getUserByEmail} from "./user/apiClient.js";
import {getSessionInfo} from "../app.js";

getSessionInfo(function (session) {
    if(session.email === null) {
        window.location.replace("/home");
    }
})

getSessionInfo(getUserPosts);

function getUserPosts(session) {
    if (session.email !== null) {
        getUserByEmail(session.email, function (user) {
            getPostByUserId(user.id, function (posts) {
                renderUserPostsTable(posts);
            });
        });
    }
}
