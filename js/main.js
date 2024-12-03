var SiteName = document.querySelector('.SiteName');
var SiteURL = document.querySelector('.SiteURL');
var submitBtn = document.querySelector('.submitBtn');
var confirmBtn = document.querySelector('.confirmBtn');
var mainBtn = document.querySelector('.mainBtn');
var searchItem = document.querySelector('.Search');
var closeIcon = document.querySelector('.closeIcon');
var errorMessage = document.querySelector('.submitError');
var allData = document.querySelector('table tbody');
var editedItemIndex;

reset();
var allItems = [];
if (localStorage.getItem('allItems')) {
    allItems = JSON.parse(localStorage.getItem('allItems'));
    displayAllWebsites();
}




SiteName.addEventListener('input', function () {
    if (SiteName.value.length < 3) {
        SiteName.classList.add('invalid');
        SiteName.classList.remove('valid');

    }
    else {
        SiteName.classList.remove('invalid');
        SiteName.classList.add('valid');
    }
});
SiteURL.addEventListener('input', function () {
    if (!isUrlValid(SiteURL.value)) {
        SiteURL.classList.add('invalid');
        SiteURL.classList.remove('valid');
    }
    else {
        SiteURL.classList.remove('invalid');
        SiteURL.classList.add('valid');
    }
});
submitBtn.addEventListener('click', function () {
    if (SiteURL.classList.contains('valid') && SiteName.classList.contains('valid')) {
        addNewBook();
        reset();
    }
    else {
        errorMessage.classList.remove('d-none');
    }
    console.log('ana ahuu');
});
errorMessage.addEventListener('click', function (e) {
    if (e.target == closeIcon || e.target == errorMessage) {
        closeErrorMessage();
    }
});
searchItem.addEventListener('input', function () {
    var str = searchItem.value;
    var cartona = '';
    for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].WebName.includes(str)) {
            cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${allItems[i].WebName}</td>
            <td>
            <a href="${test(allItems[i].WebURL) ? allItems[i].WebURL : `https://${allItems[i].WebURL}`}" target="_blank">
            <button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
            </a>
            </td>
            <td><button onclick='deleteItem(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            <td><button onclick='EditItem(${i})' class="btn btn-warning text-white"><i class="fa-regular fa-pen-to-square pe-2"></i>Edit</button></td>
        </tr>
        `}
    }
    allData.innerHTML = cartona;
});
confirmBtn.addEventListener('click', function () {
    if (SiteURL.classList.contains('valid') && SiteName.classList.contains('valid')) {
        allItems[editedItemIndex].WebName = SiteName.value;
        allItems[editedItemIndex].WebURL = SiteURL.value;
        reset();
        displayAllWebsites();
        localStorage.setItem('allItems', JSON.stringify(allItems));
    }
    else {
        errorMessage.classList.remove('d-none');
    }
    confirmBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
});


function closeErrorMessage() {
    errorMessage.classList.add('d-none');
}
function addNewBook() {

    var item = {
        WebName: SiteName.value,
        WebURL: SiteURL.value
    }
    allItems.push(item);
    displayAllWebsites();
    reset();
    localStorage.setItem('allItems', JSON.stringify(allItems));
}
function reset() {
    SiteURL.value = '';
    SiteName.value = '';
    SiteURL.classList.remove('valid');
    SiteName.classList.remove('valid');
}
function displayAllWebsites() {
    var cartona = '';
    for (var i = 0; i < allItems.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${allItems[i].WebName}</td>
            <td>
            <a href="${test(allItems[i].WebURL) ? allItems[i].WebURL : `https://${allItems[i].WebURL}`}" target="_blank">
            <button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
            </a>
            </td>
            <td><button onclick='deleteItem(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            <td><button onclick='EditItem(${i})' class="btn btn-warning text-white"><i class="fa-regular fa-pen-to-square pe-2"></i>Edit</button></td>
        </tr>
        `
    }
    allData.innerHTML = cartona;

}
function isUrlValid(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return pattern.test(str);
}
function test(str) {
    const pattern = new RegExp(
        '^(https:\\/\\/)'
    );
    return pattern.test(str);
}
function deleteItem(idx) {
    allItems.splice(idx, 1);
    displayAllWebsites();
    localStorage.setItem('allItems', JSON.stringify(allItems));
}
function EditItem(idx) {
    reset();
    SiteName.value = allItems[idx].WebName;
    SiteURL.value = allItems[idx].WebURL;
    SiteURL.classList.add('valid');
    SiteName.classList.add('valid');
    confirmBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
    editedItemIndex=idx;
}
