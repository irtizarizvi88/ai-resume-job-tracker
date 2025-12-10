window.onload = function () {
  google.accounts.id.initialize({
    client_id: "584630867834-itdnrnoupds35gg21ala11lcl3vfa5hd.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  const googleBtn = document.getElementById("googleLoginBtn");
  if(googleBtn){
    google.accounts.id.renderButton(
      googleBtn,
      { theme: "outline", size: "large" }
    );
  }

  function handleCredentialResponse(response) {
    console.log("JWT token from Google:", response.credential);
    
    axios.post("http://127.0.0.1:5000/api/auth/google-login", {
      token: response.credential
    })
    .then(res => console.log("Backend response:", res.data))
    .catch(err => console.error(err));

    google.accounts.id.prompt(); 
  }
};
