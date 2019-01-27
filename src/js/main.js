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
    const showPasswordErrorBox = () => {
        passwordTooltip.classList.add('show');
    }

    const hidePasswordErrorBox = () => {
        passwordTooltip.classList.remove('show');
    }


    // show input password must contain errors
    const togglePasswordErrors = () => {
        const mustHaveInputs = document.getElementsByClassName('criteria');
        const showError = document.getElementById('password-error');


        // At least 6 characters
        switch (true) {
            case passwordInput.value.length >= 6:
                mustHaveInputs[0].classList.add('success-psw');
                mustHaveInputs[0].classList.remove('error-psw');
                break;
            default:
                mustHaveInputs[0].classList.add('error-psw');
                mustHaveInputs[0].classList.remove('success-psw');
        }

        // At least 1 lowercase letter
        switch (true) {
            case /[a-z]/.test(passwordInput.value):
                mustHaveInputs[1].classList.add('success-psw');
                mustHaveInputs[1].classList.remove('error-psw');
                break;
            default:
                mustHaveInputs[1].classList.add('error-psw');
                mustHaveInputs[1].classList.remove('success-psw');

        }

        // At least 1 uppercase letter
        switch (true) {
            case /[A-Z]/.test(passwordInput.value):
                mustHaveInputs[2].classList.add('success-psw');
                mustHaveInputs[2].classList.remove('error-psw');
                break;
            default:
                mustHaveInputs[2].classList.add('error-psw');
                mustHaveInputs[2].classList.remove('success-psw');
        }

        // A special character (symbols)
        switch (true) {
            case /[~`$!@*#%&\?]/g.test(passwordInput.value):
                mustHaveInputs[3].classList.add('success-psw');
                mustHaveInputs[3].classList.remove('error-psw');
                break;
            default:
                mustHaveInputs[3].classList.add('error-psw');
                mustHaveInputs[3].classList.remove('success-psw');
        }
    }


    // events

    form.addEventListener('click', (event) => {
    	if (event.target.id === 'toggle-signup-password') {
    		togglePassword()
    	}

    	if (event.target.id === 'btn-submit') {
    		togglePasswordErrors()
    	}
    })

    passwordInput.addEventListener('focus', showPasswordErrorBox)

    passwordInput.addEventListener('blur', hidePasswordErrorBox)

    passwordInput.addEventListener('keyup', togglePasswordErrors)

})()