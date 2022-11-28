window.addEventListener('DOMContentLoaded', init);

function init () {
  const profile = getProfile();
  if(profile){
    addToProfile(profile);
  }
}

function getProfile(){
  return JSON.parse(localStorage.getItem('profile'));
}
  function addToProfile(profile){
  for (const key in profile) {
    if (key == 'imgSrc') {
      document.querySelector('#' + key).src = profile[key];
    } else {
      document.querySelector('#' + key).innerText = profile[key];
    }
  }
}
