const dialog  = document.getElementById("addBook");
const add  = document.getElementById("ok");
const clos = document.getElementById("close");
const addBook = document.getElementById("add-book");

const iTitle = document.getElementById("title");
const iAuthor = document.getElementById("author");
const iPages = document.getElementById("pages");
const iRead = document.getElementById("read");

const shelf =  document.getElementById("Shelf");

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

var books = [];
addBook.addEventListener("click", ()=>{
    dialog.toggleAttribute("open");
})

clos.addEventListener("click",(e)=>{
    e.preventDefault();
    dialog.close();
})

add.addEventListener("click",(e)=>{
    e.preventDefault();
    if(iTitle.value == "" || iAuthor.value == "" || iPages.value == 0){
        alert("Please fill all the informations");
        return;
    }
    let newBook = new Book(iTitle.value,iAuthor.value,iPages.value,iRead.checked);
    updateLibrary(newBook);
    dialog.close();
})

function updateLibrary(newBook){

    if(checkForCopy(newBook)){
        alert("Book already exist!!");
        return;
    }

    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    
    const titleDiv = document.createElement("div");
    titleDiv.textContent = newBook.title;
    const authorDiv = document.createElement("div");
    authorDiv.textContent = newBook.author;
    const pagesDiv = document.createElement("div");
    pagesDiv.textContent = newBook.pages + " - pages";
    const readDiv = document.createElement("div");

    const readCheckBox = document.createElement("input");
    readCheckBox.setAttribute("type","checkbox");

    if(newBook.read){
        readDiv.classList.add("read-book");
        readCheckBox.checked = true;
    }
    else{
        readDiv.classList.add("not-read-book");
        readCheckBox.checked = false;
    }
    readDiv.appendChild(readCheckBox);
    readCheckBox.addEventListener("change",(event)=>{
        handleChange(event);
    })
    
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.setAttribute("id","remove");
    removeButton.addEventListener("click",(event)=>{
        handleDelete(event,newBook);
});

    newDiv.appendChild(titleDiv);
    newDiv.appendChild(authorDiv);
    newDiv.appendChild(pagesDiv);
    newDiv.appendChild(readDiv);
    newDiv.appendChild(removeButton);
    
    shelf.appendChild(newDiv);
}

function handleChange(event){
    event.target.parentElement.classList.toggle("not-read-book");
    event.target.parentElement.classList.toggle("read-book");
}

function handleDelete(event,newBook){
    books = books.filter(function(b){
        return b!==newBook;
    });
    shelf.removeChild(event.target.parentElement);
}

function checkForCopy(newBook){
    for(let i=0;i<books.length;i++){
        if(books[i].title == newBook.title && books[i].author == newBook.author){
            return true;
        }
    }
    books.push(newBook);
    return false;
}