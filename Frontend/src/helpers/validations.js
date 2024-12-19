// validate the email
export const validateEmail = (email) => {
    const regex = /^[^\s@+@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

// validate the password
export const validatePassword = (password) => {
    if (password.length > 8) {
        return password;
    }
}

// make user profiles through their names
export const getUserProfile = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let startWords = "";
    
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        startWords += words[i][0].toUpperCase() 
    }

    return startWords;
}
