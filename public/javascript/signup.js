async function signupFormHandler(event) {
    console.log("Signup has been submitted.")
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const twitter = document.querySelector('#twitter-signup').value.trim();
    const github = document.querySelector('#github-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && twitter && github && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                twitter,
                github,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            let body = await response.json();
            console.log(body.message);
            alert(body.message);
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup').addEventListener('submit', signupFormHandler);