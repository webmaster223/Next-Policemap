export default async function signUp(email :any, password :any) {
    const apiUrl = "http://localhost:5000/register";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    return data;
}
