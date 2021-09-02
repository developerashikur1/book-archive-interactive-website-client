// user input & button id
const searchInput = document.getElementById('user-input');
const inputButton = document.getElementById('input-button');

// books card id
const booksCard = document.getElementById('books-card')

// results length id
const invalidInput = document.getElementById('invalid-input')
const resultsLength = document.getElementById('results-length');



// button handler
inputButton.addEventListener('click', function(){
    const input= searchInput.value;
    if(input === ''){
        booksCard.textContent='';
        resultsLength.textContent='';
        invalidInput.classList.remove('d-none');
        return
    };


    searchInput.value = '';
    booksCard.textContent='';
    resultsLength.textContent='';
    invalidInput.classList.add('d-none');


        // get books
        const url =(`https://openlibrary.org/search.json?q=${input}`);
        fetch(url)
        .then(res => res.json())
        .then(data => displayBookName(data.docs))
   
});



//display books
const displayBookName = books =>{
    books.forEach(book => {
        if(!book.title){
        resultsLength.innerText='No results found !!!'
            return
        };

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100 shadow-sm p-2 radius">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title mb-3"><strong>${book.title}</strong></h5>
                      <p class="card-text">Author name: <strong><i>${book.author_name[0]}</strong></i></p>
                      <p class="card-text">Author publisher: <strong><i>${book.publisher[0]}</strong></i></p>
                      <p class="card-text">First publish: <strong><i>${book.first_publish_year}</strong></i></p>
                    </div>
                  </div>
        `;
        
        resultsLength.innerHTML = `<h4>Found Results: <strong>${books.length}</strong></h4>`;
        booksCard.appendChild(div);
             
    });
};
