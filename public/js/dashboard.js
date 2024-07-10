$(document).ready(function () {

    var totalDevices = [];
    const overViewTable = $('#device-table');

    const headers = ['Device', 'MACAddress', 'IP', 'CreatedDate', 'PowerConsumption', 'Action'];

    // get headers from table
    overViewTable.find('thead th').each(function () {
        headers.push($(this).text().trim().toLowerCase().replace(/ /gi, ''));
    });

    // get data from table
    overViewTable.find('tbody tr').each(function () {
        let rowData = {};
        $(this).find('td').each(function (index, cell) {
            rowData[headers[index]] = $(cell).text().trim();
        });
        totalDevices.push(rowData);
    });

    totalDevices.pop();
    console.log(totalDevices);

    // Render table total devices
    function renderTableTotalDevices(data) {
        // render list devices
        let tbody = $('.overview-table tbody');
        tbody.empty();

        $.each(data, function (index, device) {
            const row = `<tr>
                            <td>${device.Device}</td>
                            <td>${device.MACAddress}</td>
                            <td>${device.IP}</td>
                            <td>${device.CreatedDate}</td>
                            <td>${device.PowerConsumption}</td>
                            <td>
                                <button class="edit-btn" data-id="${device.MACAddress}">Edit</button> |
                                <button class="delete-btn" data-id="${device.MACAddress}">Delete</button>
                            </td>
                        </tr>`;
            tbody.append(row);
        });

        // render total row
        const row = `<tr class="overview-total">
                            <td colspan="4S">Total</td>
                            <td>${calculateTotal(data)}</td>
                        </tr>`;
        tbody.append(row);
    }

    // Function calculate total devices
    function calculateTotal(data) {
        let total = 0;
        $.each(data, function (index, device) {
            let powerConsumption = parseFloat(device.PowerConsumption);
            if (!isNaN(powerConsumption)) {
                total += powerConsumption;
            }
        });
        return total;
    }

    // chart
    function createChart(data) {
        // Merge duplicate elements in totaldevices (TV: 20, TV: 30 => TV: 50) to render chart
        const newTotalDevices = data.reduce((newArray, device) => {
            const deviceName = device.Device;

            if (newArray[deviceName]) {
                newArray[deviceName].PowerConsumption += device.PowerConsumption;
            } else {
                newArray[deviceName] = { ...device };
            }
            return newArray;
        }, {})

        let xValues = Object.values(newTotalDevices).map(item => item.Device);
        let yValues = Object.values(newTotalDevices).map(item => item.PowerConsumption);

        // function random color warm
        function getRandomWarmColor() {
            const r = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');
            const g = Math.floor(Math.random() * 128).toString(16).padStart(2, '0');
            const b = Math.floor(Math.random() * 128).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }
        // function random color cool
        function getRandomCoolColor() {
            const r = Math.floor(Math.random() * 128).toString(16).padStart(2, '0');
            const g = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');
            const b = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }


        barColors = [];
        for (let index = 0; index < Object.values(newTotalDevices).length; index++) {
            if (index % 2 === 0) {
                barColors.push(getRandomWarmColor());
            } else {
                barColors.push(getRandomCoolColor());
            }
        }

        var ctx = $("#myChart");

        var myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                cutoutPercentage: 50,
                title: {
                    display: true,
                    text: "Power Consumption"
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return myChart;
    }
    var chart = createChart(totalDevices);

    $(window).resize(function () {
        chart.destroy();
        chart = createChart(totalDevices);
    });

    // add device
    $('.add-device').on('submit', function (event) {
        event.preventDefault();

        const name = $('input[name="name"]').val().trim();
        const mac = $('input[name="mac"]').val().trim();
        const ip = $('input[name="ip"]').val().trim();
        const pwc = $('input[name="pwc"]').val().trim();

        // check empty
        if (name === "") {
            showToast("Device name cannot be empty.", "warning");
            $('input[name="name"]').focus();
            return;
        }
        else if (mac === "") {
            showToast("MAC Address cannot be empty.", "warning");
            $('input[name="mac"]').focus();
            return;
        }
        else if (ip === "") {
            showToast("IP cannot be empty.", "warning");
            $('input[name="ip"]').focus();
            return;
        } else if (pwc === "") {
            showToast("Power Consumption cannot be empty.", "warning");
            $('input[name="pwc"]').focus();
            return;
        }

        // check duplicate MAC Address (MAC Address is unique)
        if (totalDevices.some(device => device.MACAddress === mac)) {
            showToast("MAC Address is unique. Please fill in the information again.", "warning");
            $('input[name="mac"]').focus();
            return;
        }

        // get current date
        let currentDate = new Date();

        let formattedDate = currentDate.getFullYear() + '-' +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + currentDate.getDate()).slice(-2);
        let newDevice = {
            Method: "insert",
            Device: name,
            MACAddress: mac,
            IP: ip,
            CreatedDate: formattedDate,
            PowerConsumption: +pwc
        };

        totalDevices.push(newDevice);

        $.ajax({
            type: 'POST',
            url: '/api/add-device',
            data: newDevice,
            dataType: 'json',
            success: function (response) {
                showToast("Add device successfully.", "success");

            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(error);
            }
        });

        chart.destroy();
        chart = createChart(totalDevices);

        renderTableTotalDevices(totalDevices);

        $('input[name="name"]').val('');
        $('input[name="mac"]').val('');
        $('input[name="ip"]').val('');
        $('input[name="pwc"]').val('');

        registerEditButtons();
    });

    // edit device
    // handle click show edit form
    function registerEditButtons() {
        const editButtons = $('.edit-btn');
        const deleteButtons = $('.delete-btn');

        // remove edit button
        editButtons.off('click');
        editButtons.each(function () {
            $(this).on('click', function () {
                // get MAC Address because MAC Address is unique => MAC Address is equivalent to id
                var macAddress = $(this).attr('data-id');
                let device = totalDevices.find(device => device.MACAddress === macAddress);

                $('.edit-device').find('input[name="edit-name"]').val(device.Device);
                $('.edit-device').find('input[name="edit-mac"]').val(device.MACAddress);
                $('.edit-device').find('input[name="edit-ip"]').val(device.IP);
                $('.edit-device').find('input[name="edit-pwc"]').val(device.PowerConsumption);

                // hide add form and show edit form
                $('.add-device').hide();
                $('.edit-device').show();
            });
        });

        // remove delele button
        deleteButtons.off('click');
        deleteButtons.each(function () {
            $(this).on('click', function () {
                var macAddress = $(this).attr('data-id');
                deleteDevice(macAddress);
            });
        });

    }

    registerEditButtons();

    // submit form edit device
    $('.edit-device').on('submit', function (event) {
        event.preventDefault();

        const name = $('input[name="edit-name"]').val().trim();
        const mac = $('input[name="edit-mac"]').val().trim();
        const ip = $('input[name="edit-ip"]').val().trim();
        const pwc = $('input[name="edit-pwc"]').val().trim();

        // check empty
        if (name === "") {
            showToast("Device name cannot be empty.", "warning");
            $('input[name="name"]').focus();
            return;
        }
        else if (mac === "") {
            showToast("MAC Address cannot be empty.", "warning");
            $('input[name="mac"]').focus();
            return;
        }
        else if (ip === "") {
            showToast("IP cannot be empty.", "warning");
            $('input[name="ip"]').focus();
            return;
        } else if (pwc === "") {
            showToast("Power Consumption cannot be empty.", "warning");
            $('input[name="pwc"]').focus();
            return;
        }

        // get device by MAC Address
        let currentDevice = totalDevices.find(device => device.MACAddress === mac);

        if (currentDevice) {
            const updateDevice = {
                Method: "update",
                Device: name,
                MACAddress: mac,
                IP: ip,
                CreatedDate: currentDevice.CreatedDate,
                PowerConsumption: +pwc
            };

            // check duplicate MAC Address (MAC Address is unique)
            if (totalDevices.some(device => device.Device !== currentDevice.Device && device.MACAddress === currentDevice.MACAddress)) {
                showToast("MAC Address is already taken. Please fill in the information again.", "warning");
                $('input[name="mac"]').focus();
                return;
            }
            $.ajax({
                type: 'POST',
                url: '/api/add-device',
                data: updateDevice,
                dataType: 'json',
                success: function (response) {
                    showToast("Update device successfully.", "success");

                    // update new value from edit form
                    totalDevices.forEach((device) => {
                        if (device.MACAddress === updateDevice.MACAddress) {
                            device.Device = updateDevice.Device;
                            device.MACAddress = updateDevice.MACAddress;
                            device.IP = updateDevice.IP;
                            device.PowerConsumption = updateDevice.PowerConsumption;
                            return;
                        }
                    })

                    chart.destroy();
                    chart = createChart(totalDevices);

                    renderTableTotalDevices(totalDevices);

                    registerEditButtons();
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(error);
                    return;
                }
            });
        } else {
            showToast("An unknown error.", "error");
        }
    });

    // delete device
    function deleteDevice(macAddress) {
        // create new array with out element to be deleted
        $('.delete-container').show();
        $('.delete-modal').show();

        // click cancel to hide delete box
        $('.cancel-box-btn').click(() => {
            $('.delete-container').hide();
            return;
        })

        // click delete to delete device
        $('.delete-box-btn').click(() => {
            let newArray = totalDevices.filter(device => device.MACAddress !== macAddress);

            $.ajax({
                type: 'POST',
                url: '/api/delete-device',
                data: { macAddress: macAddress },
                dataType: 'json',
                success: function (response) {
                    showToast("Deleted device.", "success");

                    totalDevices = newArray;

                    chart.destroy();
                    chart = createChart(totalDevices);

                    renderTableTotalDevices(totalDevices);

                    registerEditButtons();

                    $('.delete-modal').hide();
                    $('.delete-container').hide();
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(error);
                    return;
                }
            });
        })
    }

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

