export function isMailValid(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isPasswordStrong(pw){

    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pw);
}