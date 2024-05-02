const getUserToken = async () => {
    let token = false;

    switch (window.location.hostname) {
        case "glitch.com":
            token = JSON.parse(localStorage.cachedUser).persistentToken
            break;
    }

    return token;
}
