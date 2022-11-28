window.addEventListener('DOMContentLoaded', init);

function init () {
  const profile = getProfile();
  if (profile) {
    addToForm(profile);
  }
  initFormHandler();
}

function getProfile () {
  return JSON.parse(localStorage.getItem('profile'));
}

function addToForm (profile) {
  for (const key in profile) {
    document.querySelector('#' + key).value = profile[key];
  }
}

function initFormHandler () {
  const f = document.querySelector('#edit');

  f.addEventListener('submit', addProfileInformation);
  function addProfileInformation (e) {
    e.preventDefault();
    const fdata = new FormData(f);
    const profileInformation = {};
    for (const [name, value] of fdata) {
      profileInformation[name] = value;
    }
    localStorage.setItem('profile', JSON.stringify(profileInformation));
    window.location.href = './profile.html';
  }
}
