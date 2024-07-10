$(document).ready(function () {
    // inputs in change password box
    const inputPassword = $('.input-password');
    // error spans in change password box
    const errors = $('.password-error_message');

    // edit profile
    $('.profile-btn').click(() => {
        showProfileModal();
    })

    // change password
    $('.changePass-btn').click(() => {
        showChangePassModal();
    })

    // show logout box
    $('.logout-box-btn').click(() => {
        showLogoutModal();
    })

    // delete device
    function showProfileModal() {
        // create new array with out element to be deleted
        $('.profile-parent').show();
        $('.profile-modal').show();

        // click cancel to hide delete box
        $('.cancel-box-btn').click(() => {
            $('.profile-parent').hide();
            return;
        })
    }
    function showChangePassModal() {
        // create new array with out element to be deleted
        $('.password-parent').show();
        $('.password-modal').show();

        // click cancel to hide delete box
        $('.cancel-box-btn').click(() => {
            $('.password-parent').hide();
            return;
        })
    }
    function showLogoutModal() {
        // create new array with out element to be deleted
        $('.logout-parent').show();
        $('.logout-modal').show();

        // click cancel to hide delete box
        $('.cancel-box-btn').click(() => {
            $('.logout-parent').hide();
            return;
        })
    }

    // img encode value
    var imgEncodeValue = '';
    $('input[name="upload-img"]').change(function (e) {
        e.preventDefault();
        var file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
            const imgEncode = event.target.result;

            // set value to preview img upload
            $('.img-proflie-box').attr('src', imgEncode);

            // set result encode
            imgEncodeValue = imgEncode;
        };
        reader.readAsDataURL(file);
    });

    $('.update-profile-btn').click(() => {
        const name = $('input[name="name"]').val().trim();
        const userID = $('input[name="user_id"]').val().trim();
        const imgUpload = imgEncodeValue;

        if (name === "") {
            showToast("Name cannot be blank.", "warning");
            $('input[name="name"]').focus();
            return;
        }
        const user = {
            name: name,
            userID: userID,
            imgEncode: imgUpload
        }

        $.ajax({
            type: 'POST',
            url: '/api/update-user',
            data: user,
            dataType: 'json',
            success: function (response) {
                showToast(response.message, "success");

                // set new data
                $('.h2-name').text(name);
                $('.p-name').text(`Welcome ${name}`);

                // unset avt if non upload img
                imgUpload === '' ? '' : $('.img-profile').attr('src', imgUpload);

                // hide box
                $('.profile-parent').hide();
                $('.profile-modal').hide();
            },
            error: function (xhr, status, error) {
                showToast("Connection error", "error");
                console.log(xhr);
                console.log(error);
            }
        });
    })

    // change password
    $('.changepass-btn').click(() => {
        const oldPass = $('input[name="old-pass"]').val().trim();
        const newPass = $('input[name="new-pass"]').val().trim();
        const reNewPass = $('input[name="re-new-pass"]').val().trim();
        const userID = $('input[name="user_id"]').val().trim();

        if (oldPass === "") {
            // show toast warning
            showToast("Enter a old password.", "warning");

            // change outline input = red
            inputPassword.eq(0).addClass('input-warning');

            // show span warning on each individual input tag
            errors.eq(0).show();

            // focus the card has a warning
            $('input[name="old-pass"]').focus();
            return;
        } else {
            // remove class warning and hide error span
            inputPassword.eq(0).removeClass('input-warning');
            errors.eq(0).hide();
        }

        if (newPass === "") {
            // show toast warning
            showToast("Enter a new password.", "warning");

            // change outline input = red
            inputPassword.eq(1).addClass('input-warning');

            // show span warning on each individual input tag
            errors.eq(1).show();

            // focus the card has a warning
            $('input[name="new-pass"]').focus();
            return;
        } else {
            inputPassword.eq(1).removeClass('input-warning');
            errors.eq(1).hide();
        }

        if (reNewPass === "") {
            // show toast warning
            showToast("Retype a new password.", "warning");

            // change outline input = red
            inputPassword.eq(2).addClass('input-warning');

            // show span warning on each individual input tag
            errors.eq(2).show();

            // focus the card has a warning
            $('input[name="re-new-pass"]').focus();
            return;
        } else {
            inputPassword.eq(2).removeClass('input-warning');
            errors.eq(2).hide();
        }

        if (newPass !== reNewPass) {
            showToast("Re-entered password is incorrect", "warning");

            // show error and change outline to red
            inputPassword.eq(2).addClass('input-warning');
            errors.eq(3).show();

            // focus retype input
            $('input[name="re-new-pass"]').focus();
            return;
        }

        const newPassword = {
            userID: userID,
            password: oldPass,
            newPassword: newPass
        }

        $.ajax({
            type: 'POST',
            url: '/api/change-password',
            data: newPassword,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    // show toast
                    showToast(response.message, "success");

                    // hide box
                    $('.password-parent').hide();
                    $('.password-modal').hide();
                } else {
                    showToast(response.message, "error");
                }
            },
            error: function (xhr, status, error) {
                showToast("Connection error", "error");
                console.log(xhr);
                console.log(error);
            }
        });
    })

    // hide warning
    $('.input-password').each(function (index, element) {
        $(element).keyup(function () {
            inputPassword.eq(index).removeClass('input-warning');
            errors.eq(index).hide();

            if (index === 2) {
                errors.eq(index + 1).hide();
            }
        });
    });

    // log out
    $('.logout-btn').click(() => {

        $.ajax({
            type: 'POST',
            url: '/logout',
            success: function (response) {
                showToast(response.message, "success");
                setTimeout(() => {
                    window.location.href = '/login'
                }, 1000);
            },
            error: function (xhr, status, error) {
                showToast("Connection error", "error");
                console.log(xhr);
                console.log(error);
            }
        });
    })


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