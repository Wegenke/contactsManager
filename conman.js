function validateForm(){
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById("lastName").value;
  var emailAddress = document.getElementById("emailAddress").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  if( firstName === null || firstName === "" || firstName === "First Name"){
   alert ('Please enter your first name.');
   return false;
 };
  if( lastName === null || lastName === "" || lastName === "Last Name"){
    alert ('Please enter your last name.');
    var email = prompt('Please enter last name:');
  };
  if( emailAddress === null || emailAddress === "" || emailAddress === "Email Address"){
    alert ('Please enter your email address.');
    return false;
  } else {
    var validEmail = /\S+@\S+\.\S+/;
      if(!validEmail.test(emailAddress)) {
        alert('Please enter a valid email address.');
        return false;
      };
    };
  if( phoneNumber === null || phoneNumber === "" || phoneNumber === "Phone Number"){
    alert ('Please enter your phone number.');
    return false;
  } else {
    var validPhoneNumber = /\d{3}\.\d{3}\.\d{4}/;
    var validPhoneNumber1 = /\d{3}-\d{3}-\d{4}/;
      if(!validPhoneNumber.test(phoneNumber) && !validPhoneNumber1.test(phoneNumber)){
        alert('Please enter a valid phone number.');
        return false;
      }
  };
  return true
};

// Stringify and save locally
function addContact(fname, lname, emailAddr, phoneNum){
  var newContact = {
    firstName:fname,
    lastName:lname,
    emailAddress:emailAddr,
    phoneNumber:phoneNum
  };
  var newContactString = JSON.stringify(newContact);
  localStorage.setItem(emailAddr, newContactString);
};


// building a table via javascript
var table = document.getElementById('contactsTable');
if (table != null) {
  for (var i in localStorage){
    var nextRow = table.insertRow();
    nextRow.setAttribute('id', i);
    var nextContact =JSON.parse(localStorage[i]);
   // SPACE FOR CLARIFICATION
    var nextFirstName = nextRow.insertCell(0);
    nextFirstName.innerHTML = nextContact.firstName;
    var nextLastName = nextRow.insertCell(1);
    nextLastName.innerHTML = nextContact.lastName;
    var nextEmail = nextRow.insertCell(2);
    nextEmail.innerHTML = nextContact.emailAddress;
    var nextPhone = nextRow.insertCell(3);
    nextPhone.innerHTML = nextContact.phoneNumber;
   // SPACE FOR CLARIFICATION
    var nextEdit = nextRow.insertCell(4);
    var editLink = document.createElement("a");
    editLink.setAttribute('href','conmanEdit.html?'+i);
    editLink.innerHTML = "edit";
    nextEdit.appendChild(editLink);

    var nextDelete = nextRow.insertCell(5);
    var deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', 'conmanDelete.html?'+i);
    deleteLink.innerHTML = "delete";
    nextDelete.appendChild(deleteLink);
  };
  var searchButton = document.getElementById('searchButton').addEventListener('click', function(){
    var searchString = document.getElementById('search').value;
     if (searchString != null){
       for (var p in localStorage){
         var searchContact =JSON.parse(localStorage[p]);
          for(var q in searchContact){
            if (searchContact.hasOwnProperty(q));
              if (searchString === searchContact[q]){
                document.getElementById(p).setAttribute('class', 'info');
              // var searchLink = 'conmanEdit.html?' + p;
              // window.location.href = searchLink;
            };
          };
       };
     };
  });
};
// addbutton just doing its job on the ADD CONTACT PAGE
var addButton = document.getElementById('addButton');
if(addButton != null ) {
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (validateForm()){
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var emailAddress = document.getElementById('emailAddress').value;
      var phoneNumber = document.getElementById('phoneNumber').value;
      addContact(firstName,lastName,emailAddress,phoneNumber);
      window.location.reload();
    }
  });
};


// editbutton just doing its job on the EDIT CONTACT PAGE
var editBtn = document.getElementById('editBtn');
if (editBtn != null) {
  var key = window.location.search.substring(1);
  var contactInfo = JSON.parse(localStorage.getItem(key));
  document.getElementById("firstName").value = contactInfo.firstName;
  document.getElementById('lastName').value = contactInfo.lastName;
  document.getElementById('emailAddress').value = contactInfo.emailAddress;
  document.getElementById('phoneNumber').value = contactInfo.phoneNumber;
  // listen to the clicking of the editbutton
  editBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (validateForm()){
      contactInfo.firstName = document.getElementById("firstName").value;
      contactInfo.lastName = document.getElementById('lastName').value;
      contactInfo.emailAddress = document.getElementById('emailAddress').value;
      contactInfo.phoneNumber = document.getElementById('phoneNumber').value;
      var editContactString = JSON.stringify(contactInfo);
      localStorage.setItem(key, editContactString);
      window.location = 'conmanHome.html';};
  });
};


// remove contact from local storage on the DELETE CONTACT PAGE
var deleteBtn = document.getElementById('deleteBtn');
if (deleteBtn !=null) {
  var key = window.location.search.substring(1);
  var contactInfo = JSON.parse(localStorage.getItem(key));
  document.getElementById("firstName").value = contactInfo.firstName;
  document.getElementById('lastName').value = contactInfo.lastName;
  document.getElementById('emailAddress').value = contactInfo.emailAddress;
  document.getElementById('phoneNumber').value = contactInfo.phoneNumber;
  // listen to the clicking of deletebutton
  deleteBtn.addEventListener('click', function(f){
    f.preventDefault();
    localStorage.removeItem(key);
    window.location = 'conmanHome.html';

  })
};
