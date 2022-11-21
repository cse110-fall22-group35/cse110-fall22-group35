const genre = document.getElementById('genre');
  let genreValue;
  genre.addEventListener('click', (event) => {
    genreValue = genre.innerText;
  });

  const rating = document.getElementById('ratings');
  let ratingStar;
  genre.addEventListener('click', (event) => {
    ratingStar = rating.innerText;
  });

  const age = document.querySelector('age').value;