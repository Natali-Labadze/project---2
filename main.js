function sidebarToggle() {
    document.getElementById("sidebar").classList.toggle("sidebar_closed")
    document.getElementById("content").classList.toggle("full_content")
}

function dropdownToggle() {
    document.getElementById("menu_dropdown").classList.toggle("show")

}

function modalShow() {
    document.getElementById("modal_box").classList.add("show")
    document.getElementById("main_wrapper").classList.add("modal_open")

}

function modalClose() {
    document.getElementById("modal_box").classList.remove("show")
    document.getElementById("main_wrapper").classList.remove("modal_open")
}

document.addEventListener('click', function(event) {

    if (!event.target.closest("#modal_box") && !event.target.closest("#modal_show")) {
        modalClose()
    }
}, false)




let data = [];

const dList = document.getElementById("data_list")


function renderData(todos) {
    let html = '';

    todos.forEach((t) => {
        html += `<tr>
                   
                        <td>${t.title}</td>
                        <td>${t.completed ? '<span class="completed"></span>complete' : 'not complete'}</td>
                        <td>Otar Terterashvili</td>
                        <td>${getCurrentDate()}</td>
                        <td>${getCurrentDate()}</td>
                        <td><button class="table_button">edit</button><button class="table_button red">delete</button></td>
                       
                    </tr>`

        dList.innerHTML = html;
    })
}

async function fetchData() {
    const todos = await fetch('./tasks.json');
    data = await todos.json()

    displayData();
}

function displayData(currentPage = 1) {
    if (data.length) {
        const paginationData = paginate(data.length, currentPage);
        const newData = data.slice(paginationData.startIndex, paginationData.endIndex + 1)
        renderData(newData)
        renderPages(paginationData.pages, paginationData.currentPage)
    }
}

function renderPages(pages, currentPage = 1) {
    let prevPage = currentPage - 1;
    let nextPage = currentPage + 1;
    let ulList = `<ul>`;

    currentPage > 1 ? ulList += `<li onclick="displayData(${prevPage})"><svg xmlns="http://www.w3.org/2000/svg" width="8.669" height="13.694" viewBox="0 0 8.669 13.694">
    <path id="Path_294" data-name="Path 294" d="M1811.182,4362.342l-7.567,6.731,7.567,6.2" transform="translate(-1802.846 -4361.968)" fill="none" stroke="#808495" stroke-width="1"/>
  </svg></li>` : '';

    for (let page of pages) {
        ulList += `<li class="${currentPage === page && 'active'}" onclick="displayData(${page})">${page}</li>`
    }

    currentPage < pages[pages.length - 1] ? ulList += `<li onclick="displayData(${nextPage})"><svg xmlns="http://www.w3.org/2000/svg" width="8.672" height="13.694" viewBox="0 0 8.672 13.694">
    <path id="Path_294" data-name="Path 294" d="M1803.616,4362.342l7.57,6.731-7.57,6.2" transform="translate(-1803.283 -4361.968)" fill="none" stroke="#808495" stroke-width="1"/>
  </svg></li>` : '';

    ulList += '</ul>';

    document.getElementById('pagination').innerHTML = ulList;
}

function paginate(totalItems, currentPage = 1, pageSize = 10, maxPages = Math.ceil(totalItems / pageSize)) {
    let totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

function handleFormSubmit() {
    let e;
    if (!e) {
        e = window.event;
    }
    e.preventDefault();

    let todoTitleInput = document.getElementById('todoTitle');
    let todoTitle = todoTitleInput.value;

    if (todoTitle.length < 5) {
        alert('5 symbols are required')
        return;
    }

    data.unshift({ userId: 2, completed: false, id: data.length + 1, title: todoTitle });
    todoTitleInput.value = '';
    displayData()
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}