$(document).ready(() => {

  // function getQueryVariable(variable) {
  //   var query = window.location.search.substring(1);
  //   var vars = query.split("&");
  //   for (var i = 0; i < vars.length; i++) {
  //     var pair = vars[i].split("=");
  //     if (pair[0] == variable) {
  //       return pair[1];
  //     }
  //   }
  //   return (false);
  // }
  // console.log(window.location.search);
  // const childid = getQueryVariable("childid");
  // console.log(childid);
  // const requestURL = "/home/" + childid;
  // console.log(requestURL);

  $.ajax({
    url: 'home',
    type: 'POST',
    data: {
        childid: localStorage.getItem('childid')
    },
    success: (data) => {
      console.log('You received some data!', data);
      if (data.name && data.pet) {
        $('#points').html(data.points + " Pts");
      } else {
          console.log("Child info not received");
      }
    },
  });
});
