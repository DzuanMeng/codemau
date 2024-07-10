
$(document).ready(function () {
    // log in function
    $('.login-box').on('submit', function (event) {
        event.preventDefault();

        const uname = $('input[name="uname"]').val().trim();
        const password = $('input[name="password"]').val().trim();

        // check empty login infomation
        if (uname === "") {
            showToast("User name is empty", "warning");
            $('input[name="uname"]').focus();
            return;
        } else if (password === "") {
            showToast("Password is empty", "warning");
            $('input[name="password"]').focus();
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/api/check-login',
            data: {
                username: uname,
                password: password
            },
            dataType: 'json',
            success: function (response) {
                if (response.status === "success") {
                    showToast("Login successfully!", "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else {
                    showToast(response.message, "error");
                    $('input[name="password"]').val('')
                }
            },
            error: function (xhr, status, error) {
                showToast("Connection error", "error");
                console.log(status);
                console.log(error);
                return;
            }
        });
    });

    // toast function
    function showToast(message, status) {
        const toastContainer = document.getElementById('toast-container');

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style = 'display: flex; align-items: center; justify-content: space-evenly;'

        if (status === "success") {
            img = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>`;
        } else if (status === "error") {
            img = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>`;
        } else if (status === "warning") {
            img = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>`;
        }
        toast.innerHTML = `${img} ${message}`;

        toastContainer.appendChild(toast);

        setTimeout(() => { toast.className = `toast show ${status}`; }, 100);
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
            setTimeout(() => { toast.remove(); }, 500);
        }, 3000);
    }
})