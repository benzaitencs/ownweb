document.addEventListener("DOMContentLoaded", function () {
  const phoneInputField = document.querySelector("#phone");

  // initialize plugin
  const iti = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.10/build/js/utils.js"
  });

  // handle form submission
  document.querySelector("#myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const phoneNumber = iti.getNumber(); // full number with country code
    console.log("Submitted Phone Number:", phoneNumber);

    alert("Submitted: " + phoneNumber);
  });
});

