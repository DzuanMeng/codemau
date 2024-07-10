$(document).ready(function () {

    // get data from table
    devices = [];
    numberItems = 7;
    const logTable = $('#log-table');

    const headers = ['DeviceID', 'Name', 'Action', 'Date'];

    // get headers from table
    logTable.find('thead th').each(function () {
        headers.push($(this).text().trim().toLowerCase().replace(/ /gi, ''));
    });

    // get data from table
    logTable.find('tbody tr').each(function () {
        let rowData = {};
        $(this).find('td').each(function (index, cell) {
            rowData[headers[index]] = $(cell).text().trim();
        });
        devices.push(rowData);
    });

    devices.pop();

    // Function render list devices
    function renderTableDevices(data, currentPage, numberItems) {
        // render list devices
        let tbody = $('.devices-table tbody');
        tbody.empty();

        // slice array
        let currentItem = numberItems * (currentPage - 1);

        $.each(data.slice(currentItem, currentItem + +numberItems), function (index, device) {
            const row = `<tr>
                            <td>${device.DeviceID}</td>
                            <td class="logs-name">${device.Name}</td>
                            <td>${device.Action}</td>
                            <td>${device.Date}</td>
                        </tr>`;
            tbody.append(row);
        });

        // render total row
        const row = `<tr class="overview-total">
                            <td colspan="3">Total</td>
                            <td>${data.length}</td>
                        </tr>`;
        tbody.append(row);
    }

    renderTableDevices(devices, 1, numberItems);

    // search function
    function searchDevices(devices) {
        $('.search-box').on('submit', function (event) {
            event.preventDefault();
            // get value from input search
            const name = $('input[name="search"]').val().trim();

            devicesSearch = [];
            count = 0;
            devices.forEach((item) => {
                if (item.Name.toLowerCase().includes(name.toLowerCase())) {
                    devicesSearch.push(item);
                    count++;
                }
            });

            // if records = 0 => return
            if (count === 0) {
                showToast("No records found", "warning");
                renderTableDevices([], 1, numberItems);

                createPaginate([], numberItems);
                return;
            }

            // render list
            renderTableDevices(devicesSearch, 1, numberItems);

            // call function highlight
            highlightTextSearch(name);

            createPaginate(devicesSearch, numberItems);

            // reset count
            count = 0;
        });
    }
    searchDevices(devices);

    // paginate function
    function createPaginate(data, numberItems) {
        const itemsPerPage = numberItems; // number of page
        let currentPage = 1;    // current page

        // display table
        function displayData(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = data.slice(startIndex, endIndex);

            const tbody = $('#device-table-body');
            tbody.empty(); // clear data

            $.each(paginatedData, function (index, device) {
                const row = `<tr>
                            <td>${device.DeviceID}</td>
                            <td>${device.Name}</td>
                            <td>${device.Action}</td>
                            <td>${device.Date}</td>
                        </tr>`;
                tbody.append(row);
            });
        }

        // Function create buttons paginate
        function createPaginationButtons(currentPage, totalPages) {
            const paginationButtons = $('#pagination-buttons');
            paginationButtons.empty(); // clear paginate buttons

            // prev button
            if (currentPage > 1) {
                paginationButtons.append(`<button class="pagination-btn" data-page="${currentPage - 1}"><</button>`);
            }

            // number buttons
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                paginationButtons.append(`<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
            }

            // next button
            if (currentPage < totalPages) {
                paginationButtons.append(`<button class="pagination-btn" data-page="${currentPage + 1}">></button>`);
            }

            // handle event click
            $('.pagination-btn').click(function () {
                console.log(typeof numberItems);
                console.log(typeof currentPage);
                currentPage = parseInt($(this).attr('data-page'));
                displayData(currentPage, data);
                createPaginationButtons(currentPage, totalPages);
                renderTableDevices(data, currentPage, numberItems);
                highlightTextSearch($('.search-input').val());
            });
        }

        // Calculate and display paginate buttons
        const totalPages = Math.ceil(data.length / itemsPerPage);
        displayData(currentPage);
        createPaginationButtons(currentPage, totalPages);

    }

    createPaginate(devices, numberItems);
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

    // highlight text
    function highlightTextSearch(text) {
        var table = document.getElementById('log-table');
        var rows = table.querySelectorAll('.logs-name');

        for (var i = 0; i < rows.length; i++) {
            let deviceName = rows[i].textContent.toLowerCase();

            var highlightedString = deviceName.split(text).join(`<span class="highlight">${text}</span>`);

            rows[i].innerHTML = highlightedString;
        }
    }

    // change number items of page
    $('input[name="number-page"]').on('change', function() {
        var inputValue = $(this).val();
        if (inputValue <= 0) {
            showToast("Please enter number > 0", "warning");
            $(this).val('');
        }
        numberItems = inputValue;
        renderTableDevices(devices, 1, numberItems);
        createPaginate(devices, numberItems);

    });
})
