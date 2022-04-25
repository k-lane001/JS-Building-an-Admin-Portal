async function main () {
//retrieve an array of books from the API
    let response = await fetch('http://localhost:3001/listBooks')
//Parse the json response to text
    let books = await response.json()
//Book Titles Listed    
    books.forEach(renderBook)
}

function renderBook(book) {
    //selecting the div
        let root = document.querySelector('#root')
    //creating list items
        let li = document.createElement('li')
        //adding text content to each li from API elements
        li.textContent = book.title
        //input field
        let quantityInput = document.createElement('input')
        quantityInput.value = book.quantity
        //save button
        let saveButton = document.createElement('button')
        saveButton.textContent = 'Save'
        //save button, listen for clicks, patch to server
        saveButton.addEventListener('click', () => {
            fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: book.id,
                    quantity: quantityInput.value                  
                })
            })
        })
        //append to html DOM tree
        li.append(quantityInput, saveButton)
        root.append(li)
}
//invoke function
main();