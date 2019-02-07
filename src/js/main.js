// Author: Nemanja Kostic

// wrapping in iife
(() => {

    // cashing DOM
    const form = document.querySelector('form');
    const passwordInput = document.getElementById('password');
    const passwordTooltip = document.getElementsByClassName('password-tooltip')[0];


    // toggle when user click on show/hide password
    const togglePassword = () => {
        const showPassword = document.getElementById('toggle-signup-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = "text";
            showPassword.innerHTML = 'Hide'
        } else {
            passwordInput.type = "password";
            showPassword.innerHTML = 'Show'
        }
    }

    // toggle when user focus on password input
    const togglePasswordErrorBox = () => {
        passwordTooltip.classList.toggle('show')
    }

    // constructor for error handling when user start typing password
    const togglePasswordErrors = () => {

        // constructor function
        const switchConstructor = (regex, element) => {
            const mustHaveInputs = document.getElementsByClassName('criteria');
            switch (true) {
                case regex:
                    mustHaveInputs[element].classList.add('success-psw');
                    mustHaveInputs[element].classList.remove('error-psw');
                    break;
                default:
                    mustHaveInputs[element].classList.add('error-psw');
                    mustHaveInputs[element].classList.remove('success-psw');
            }
        }

        // At least 6 characters
        switchConstructor(passwordInput.value.length >= 6, 0);

        // At least 1 lowercase letter
        switchConstructor(/[a-z]/.test(passwordInput.value), 1);

        // At least 1 uppercase letter
        switchConstructor(/[A-Z]/.test(passwordInput.value), 2);

        // A special character (symbols)
        switchConstructor(/[~`$!@*#%&\?]/g.test(passwordInput.value), 3);

    }


    // events

    ['blur', 'focus'].map(event => passwordInput.addEventListener(event, togglePasswordErrorBox))

    form.addEventListener('click', (event) => {
        if (event.target.id === 'toggle-signup-password') {
        togglePassword()
        }

        if (event.target.id === 'btn-submit') {
            togglePasswordErrors()
        }
    })

    passwordInput.addEventListener('keyup', togglePasswordErrors);

})()