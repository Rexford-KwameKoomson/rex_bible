// Access the button, input, reference tag, and preview tag
const btnSearch = document.querySelector('#btnSearch');
const textVerse = document.querySelector('#textVerse');
const textReference = document.querySelector('#reference');
const textPreview = document.querySelector('#preview');
const preloader = document.getElementById('preloader'); // Access the preloader
const basePoint = "https://bible-api.com/";
preloader.style.display = 'none';

// Create an event for the button
btnSearch.addEventListener('click', getBiblerequest);

// Create a function to request user data
function getBiblerequest() {

    preloader.style.display = 'flex';
    // Get the verse value
    let verse = textVerse.value.trim();

    if (!verse) {
        alert("Please enter a verse reference.");
        return;
    }

    // Show preloader while fetching data
  

    fetch(`${basePoint}${verse}`)
        .then(function(result) {
            if (!result.ok) {
                throw new Error('Verse not found. Please check the reference.');
            }
            return result.json();
         
        })
        .then(function(data) {
            textReference.innerHTML = data.reference || 'Reference not found';
            textPreview.innerHTML = data.text || 'Text not found';
        })
        .catch(function(error) {
            alert(error.message);
            textReference.innerHTML = '';
            textPreview.innerHTML = '';
        })
        .finally(function() {
            // Hide preloader after fetching data
            preloader.style.display = 'none';
        });
}
