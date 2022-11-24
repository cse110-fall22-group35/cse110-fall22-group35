window.addEventListener('DOMContentLoaded', init);

function init() {
    let profile = getProfile();
    if (profile){
      addToForm(profile);
    }
    initFormHandler();
}

function getProfile(){
  return JSON.parse(localStorage.getItem('profile'));
}

function addToForm(profile){
  for (var key in profile){
    document.querySelector("#" + key).value = profile[key];
  }
}

function initFormHandler() {
    const f = document.querySelector("#edit");

    f.addEventListener("submit", addProfileInformation);
    function addProfileInformation(e){
      e.preventDefault();
      const fdata = new FormData(f);
      let profileInformation = {};
      for(let [name, value] of fdata) {
        profileInformation[name] = value;
      }
      localStorage.setItem('profile', JSON.stringify(profileInformation));
      window.location.href = "./profile.html";
    }
}
  