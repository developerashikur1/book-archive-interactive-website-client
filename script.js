// user input & button id
const searchInput = document.getElementById('user-input');
const inputButton = document.getElementById('input-button');

// books card id
const booksCard = document.getElementById('books-card')

// results length id
const invalidInput = document.getElementById('invalid-input')
const resultsLength = document.getElementById('results-length');

// spinner
const spinner = document.getElementById('spinner');

// no result
const noResult = document.getElementById('no-result');

// button handler
inputButton.addEventListener('click', function(){
    const input= searchInput.value;
    if(input === ''){
        booksCard.textContent='';
        resultsLength.textContent='';
        invalidInput.classList.remove('d-none');
        return
    };

    // all content vanish
    searchInput.value = '';
    booksCard.textContent='';
    resultsLength.textContent='';
    invalidInput.classList.add('d-none');
    noResult.textContent='';


        fetch(`https://openlibrary.org/search.json?q=${input}`)
        .then(res => res.json())
        .then(data =>{
            if(data.numFound === 0){
                spinner.classList.add('d-none');
                noResult.innerHTML=`<h5 class="text-danger">No Results Found!!!</h5>`;
                return

            }
            else{
                displayBookName(data.docs)
            }
        })
        spinner.classList.remove('d-none');
   
});



//display books
const displayBookName = books =>{
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100 shadow-sm p-2 radius">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title mb-3"><strong>${book.title}</strong></h5>
                      <p class="card-text">Author name: <strong><i>${book.author_name ? book.author_name[0] : 'N/A'}</strong></i></p>
                      <p class="card-text">Author publisher: <strong><i>${book.publisher ? book.publisher[0] :'N/A'}</strong></i></p>
                      <p class="card-text">First publish: <strong><i>${book.first_publish_year}</strong></i></p>
                    </div>
                </div>
        `;    
        // get total book of total results
        const clame =document.getElementsByClassName('col');
        spinner.classList.add('d-none');

        // show total book of total results
        resultsLength.innerHTML = `<h4 class="mb-5 text-center">Found Results: <span class="text-danger"><strong>${clame.length+1}</strong></span></h4>`;
        booksCard.appendChild(div);
        
    });
};
