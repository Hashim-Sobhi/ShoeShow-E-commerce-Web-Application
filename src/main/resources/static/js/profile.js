let userInfo = {}
window.onload = function() {
    if(localStorage.getItem('loggedInUserId') == null)
    {
        window.location.href = '/shoeshow/login';
    }
    let user_id = localStorage.getItem('loggedInUserId');

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:8080/shoeshow/profileServlet?user_id=${user_id}`, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            userInfo = JSON.parse(xhr.responseText);
            renderUserInfo();
        }
    }
    xhr.send();
}
function renderUserInfo() {
    document.getElementById("name").value = userInfo.name;
    document.getElementById("email").value = userInfo.email;
    document.getElementById("phone").value = userInfo.phoneNumber;
    document.getElementById("job").value = userInfo.job;
    document.getElementById("interest").value = userInfo.interests;
    document.getElementById("credit").value = userInfo.creditLimit;
    let bd = new Date(userInfo.birthdate);
    let year = bd.getFullYear();
    let month = String(bd.getMonth() + 1).padStart(2, '0');
    let day = String(bd.getDate()).padStart(2, '0');
    document.getElementById("birthdate").value = `${year}-${month}-${day}`;
    userInfo.birthdate = document.getElementById("birthdate").value.trim();

    const addressesContainer = document.getElementById("addressesContainer");
    addressesContainer.innerHTML = '';

    userInfo.addresses.forEach((address, index) => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card h-100 shadow-sm ${address.isDefault ? 'border-success' : ''}">
                <div class="card-body">
                    <h5 class="card-title">${address.street}</h5>
                    <p class="card-text"><b>Building:</b> ${address.buildingNumber}</p>
                    <p class="card-text"><b>State:</b> ${address.state}</p>
                    <p class="card-text"><b>Default:</b> ${address.isDefault ? 'Yes' : 'No'}</p>
                    <button class="btn btn-sm btn-warning" onclick="openEditAddressModal(${index})">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                </div>
            </div>
        `;
        addressesContainer.appendChild(card);
    });



    const table=document.getElementById("ordersTable")
    table.innerHTML = ``;
    userInfo.orders.map((order) => {
        let cleanedDate = order.createdAt.replace(/\[.*\]/, ""); // Removes [UTC]
        let date = new Date(cleanedDate);

        // Format date to YYYY-MM-DD
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${order.orderId}</td>
        <td>${formattedDateTime}</td>
        <td>${order.totalAmount}</td>
        <td>${order.orderStatus}</td>
    `;
        table.appendChild(tr);
    });
}

let isEditMode = false;
let profileModified = false;
let addressModified = false;
function toggleEditSave() {
    const inputs = document.querySelectorAll("#profileForm input, #profileForm textarea");
    const btn = document.getElementById("editSaveBtn");

    if (!isEditMode) {
        // Switch to edit mode
        inputs.forEach(input => input.disabled = false);
        btn.innerHTML = '<i class="bi bi-save"></i> Save';
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-success");
        isEditMode = true;
    } else {
        if(!updateProfile()){
            return;
        }
        // Switch to view mode & save
        inputs.forEach(input => input.disabled = true);
        btn.innerHTML = '<i class="bi bi-pencil-square"></i> Edit';
        btn.classList.remove("btn-success");
        btn.classList.add("btn-warning");
        isEditMode = false;

        // Enable the confirm changes button after update
        profileModified = true;
        checkConfirmChangesButton();


    }
}
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
}

function updateProfile() {
    clearErrors(); // Clear previous validation messages
    let isValid = true;

    let name = document.getElementById("name").value.trim();
    if (name === "") {
        document.getElementById("nameError").textContent = "Please enter a valid name";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email (e.g., user@example.com)";
        isValid = false;
    }

    let phone = document.getElementById("phone").value.trim();
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (phone === "" || !phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid Egyptian phone (01xxxxxxxxx)";
        isValid = false;
    }

    let birthdate = document.getElementById("birthdate").value.trim();
    if (birthdate !== "") {
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(birthdate)) {
            document.getElementById("birthdateError").textContent = "Use format YYYY-MM-DD";
            isValid = false;
        }
    }

    let job = document.getElementById("job").value.trim();

    let interest = document.getElementById("interest").value.trim();


    let credit = document.getElementById("credit").value.trim();
    if (credit === "" || isNaN(credit) || Number(credit) < 0) {
        document.getElementById("creditError").textContent = "Enter a valid credit limit";
        isValid = false;
    }

    if (!isValid) return false;

    // If all inputs are valid, update the userInfo object
    userInfo.name = name;
    userInfo.email = email;
    userInfo.phoneNumber = phone;
    userInfo.creditLimit = credit;
    userInfo.job = job;
    userInfo.interests = interest;
    userInfo.birthdate = birthdate;

    showInfoSweetAlert("Don't forget to Confirm Changes");
    return true;
}


function openAddAddressModal() {
    document.getElementById("addressForm").reset();
    document.getElementById("addressIndex").value = -1;
    document.getElementById("isDefault").disabled = false;
    const modal = new bootstrap.Modal(document.getElementById("addressModal"));
    modal.show();
}

function openEditAddressModal(index) {
    const address = userInfo.addresses[index];
    document.getElementById("street").value = address.street;
    document.getElementById("buildingNumber").value = address.buildingNumber;
    document.getElementById("state").value = address.state;
    document.getElementById("isDefault").checked = address.isDefault;
    document.getElementById("addressIndex").value = index;
    // If the address is set as default, disable the checkbox
    document.getElementById("isDefault").disabled = !!address.isDefault;

    const modal = new bootstrap.Modal(document.getElementById("addressModal"));
    modal.show();
}

function saveAddress(event) {
    const street = document.getElementById("street").value.trim();
    if (street === "") {
        showErrorSweetAlert("Please enter a valid street");
        return; // Stops further execution if validation fails
    }

    const buildingNumber = document.getElementById("buildingNumber").value.trim();
    if (buildingNumber === "" || isNaN(buildingNumber)) {
        showErrorSweetAlert("Please enter a valid building number");
        return;
    }

    const state = document.getElementById("state").value.trim();
    if (state === "") {
        showErrorSweetAlert("Please enter a valid state");
        return;
    }

    const isDefault = document.getElementById("isDefault").checked;
    const index = parseInt(document.getElementById("addressIndex").value);

    // Only one default address allowed — reset all to false first
    if (isDefault) {
        userInfo.addresses.forEach(addr => addr.isDefault = false);

    }

    const addressObj = {
        addressId: userInfo.addresses[index] ? userInfo.addresses[index].addressId : -1, // Keep the same addressId if editing
        street,
        buildingNumber,
        state,
        isDefault: isDefault
    };

    // If it's an existing address, update it; else, add a new address
    if (index >= 0) {
        userInfo.addresses[index] = addressObj;
    } else {
        userInfo.addresses.push(addressObj);
    }


    $('#addressModal').modal('hide');




    renderUserInfo();
    addressModified = true;
    checkConfirmChangesButton();
}

function checkConfirmChangesButton() {
    const confirmChangesBtn = document.getElementById("confirmChangesBtn");

    const shouldEnable = profileModified || addressModified;
    confirmChangesBtn.disabled = !shouldEnable;
    confirmChangesBtn.style.display = shouldEnable ? "inline-block" : "none";
}



function confirmChanges() {
    // Add your confirmation changes logic here (e.g., save to the server or display a success message)
    $.ajax({
        url:"http://localhost:8080/shoeshow/profileServlet",
        method:"POST",
        contentType: "application/json",
        data: JSON.stringify(userInfo),
        success: function(data){
            showSuccessSweetAlert("Changes have been confirmed!");
            profileModified = false;
            addressModified = false;
            checkConfirmChangesButton();
        },
        error: function(data){
            showErrorSweetAlert(data.message);
        }
    });
}
async function logout() {
    let state = await showQuestionSweetAlert("Are you sure you want to logout?");
    if (state) {
        let userID = localStorage.getItem("loggedInUserId");

        $.ajax({
            url: "http://localhost:8080/shoeshow/logoutServlet?user_id=" + userID,  // Send userID as a query parameter
            method: "GET",
            success: function (data) {
                // Remove user ID from local storage after successful logout
                localStorage.removeItem("loggedInUserId");
                localStorage.removeItem("cart");
                localStorage.removeItem("wishlist");

                // Redirect to the login page
                window.location.href = "/shoeshow/login";
            },
            error: function (xhr, status, error) {
                showErrorSweetAlert("Logout failed!");
            }
        });
    }
}
