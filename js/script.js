function fetchData() {
  fetch("https://facebook.github.io/react-native/movies.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {

    const rawDataContainer = document.getElementById('raw-data');
    const rawDataTitle = document.getElementById('raw-data-title');

    rawDataContainer.innerText = JSON.stringify(myJson);
    rawDataTitle.style.display = 'block';

    const moviesList = document.getElementById('movies-list');
    const moviesListTitle = document.getElementById('movies-list-title');
    moviesList.innerHTML = '';
    moviesListTitle.style.display = 'none';

    if (myJson.movies.length === 0) return;

    moviesListTitle.style.display = 'block';

    myJson.movies.forEach((movie, index) => {
      console.log(`Movie ${index}`);
      let props = '';
      Object.keys(movie).forEach(key => {
        console.log(`\t${key}: \t${movie[key]}`);
        props += `\t${key}: \t${movie[key]}\n`;
      });

      const mHTML = document.createElement('li');
      const liContent = document.createElement('pre');
      liContent.innerHTML = props;
      mHTML.appendChild(liContent);
      moviesList.appendChild(mHTML);
    });
  });
}

/**
 * Determines if a word (string) it's a preposition in googlon lang.
 * The preposition restrictions are:
 * 1.- Must contain 6 words
 * 2.- Must not contain u letter
 * 3.- Must end in a d, x, s, m, p, or f letters.
 *
 * The first restriction its evaluated checking the word length.
 * The second restrictions are evaluated with a regular expression. The
 * /^([a-tv-z])+/ component of the regex checks if the word doesn't contain the u
 * letter. The /(d|x|s|m|p|f)$/ component of the regex checks if the word ends
 * with one of the required letters.
 * @param {string} word Word to be tested as a preposition in googlon language
 * @returns {boolean} true if the word its a preposition. false otherwise.
 */
function isPreposition(word) {
  return word.length === 6 && /^([a-tv-z])+(d|x|s|m|p|f)$/i.test(word);
}

/**
 * Transforms a text in an array of words splitting by newline, return or white space characters.
 * Then filters the words that match with the isPreposition test.
 * @param {string} text The text to be evaluated by counting the prepositions in it.
 */
function filterPrepositions(text) {
  const words = text.split(/\n|\r| /);
  const prepositions = words.filter(isPreposition);
  return prepositions;
}

function countPrepositions(event) {
  // Avoid the form submit event.
  event.preventDefault();
  // Get the text in the text area.
  const text = document.getElementById("text-input").value;
  // Takes the prepositions from the text
  const prepositions = filterPrepositions(text);
  const output = `There are ${prepositions.length} prepositions in the text`;
  // Print out the output of the algorithm.
  console.log(output);
  document.getElementById("preps-result").innerHTML = output;

  const prepsList = document.getElementById('preps-list');
  const listTitle = document.getElementById('preps-list-title');
  prepsList.innerHTML = '';
  listTitle.innerText = '';

  if (prepositions.length === 0) return;

  listTitle.innerText = 'Prepositions found';
  prepositions.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = p;
    prepsList.appendChild(li);
  })
}
