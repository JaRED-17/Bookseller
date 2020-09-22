if (userIsLoggedIn) {
    translateComponent('my-account'); 
}
else {
    window.location.href = '/';
}