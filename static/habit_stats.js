$(document).ready(() => {
  console.log('Running');

  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: 'habitStats',
    type: 'POST',
    data: {
      habitid: localStorage.getItem('habitid')
    },
    success: (data) => {
      console.log('You received some data!', data);

        if (data.title && data.description && data.due) {
          console.log('Received valid data');
          // Fill in the habit data on the page (list and modal)
          $('#title').text(data.title);
          $('#description').text(data.description);
          $('#date').text(data.due);
          $('#input-title').val(data.title);
          $('#input-description').val(data.description);
          $('#input-date').val(data.due);
          // $('#current-streak')
          // $('#longest-streak')
          // $('#setbacks')
        } else {
          document.querySelector('.habit-list').content = "<h5 class='text-center'>Click the (+) to add a new habit</h5>";
        }
    },
  });

  $('#updateHabit').click(() => {
    $.ajax({
      url: 'updateHabit',
      type: 'POST',
      data: {
        title: $('#input-title').val(),
        description: $('#input-description').val(),
        date: $('#input-date').val(),
        habitid: localStorage.getItem('habitid')
      },
      success: (data) => {
        location.reload();
      }
    });
  });

  //Calendar chart
  var myConfig = {
  type: 'calendar',
  options: {
    year: {
      text: '2018',
      visible: false
    },
    startMonth: 5,
    endMonth: 5,
    palette: ['none', '#4CAF50'],
    month: {
      item: {
        fontColor: 'gray',
        fontSize: 20
      }
    },
    weekday: {
      values: ['S','M','T','W','T','F','S'],
      item:{
        fontColor: 'gray',
        fontSize: 9
      }
    },
    values: [
      ['2018-05-01', 0],
      ['2018-05-02', 1],
      ['2018-05-03', 1],
      ['2018-05-04', 1],
      ['2018-05-05', 1],
      ['2018-05-06', 1],
      ['2018-05-09', 1],
      ['2018-05-10', 1],
      ['2018-05-11', 1],
      ['2018-05-12', 1],
      ['2018-05-13', 1],
      ['2018-05-16', 1],
      ['2018-05-17', 1],
      ['2018-05-18', 1],
      ['2018-05-19', 1],
      ['2018-05-20', 1],
      ['2018-05-23', 1],
      ['2018-05-24', 1],
      ['2018-05-25', 1],
      ['2018-05-26', 1],
      ['2018-05-27', 1],
      ['2018-05-30', 1],
      ['2018-05-31', 1],
    ]
  },
  labels: [
    { //Lefthand Label (container portion)
      borderColor: 'gray',
      borderWidth: 1,
      x: '8%',
      y: '60%',
      width: '40%',
      height: '30%'
    },
    { //Lefthand Label (top portion)
      text: 'Completed Habit?\n 1 = Yes, 0 = No',
      fontColor: '#212121',
      textAlign: 'center',
      x: '10%',
      y:'65%',
      width: '36%'
    },
    { //Lefthand Label (middle portion)
      text: '%plot-value',
      fontColor: '#4CAF50',
      fontFamily: 'Georgia',
      fontSize: 35,
      textAlign: 'center',
      padding: 8,
      x: '10%',
      y: '68%',
      width: '36%'
    },
    // Note: the bottom portion of the Bottom-Left Label is the fixed tooltip, below.

    { //Rightside Label (container portion)
      borderColor: 'gray',
      borderWidth: 1,
      x: '52%',
      y: '60%',
      width: '40%',
      height: '30%',
    },
    { //Rightside Label (top portion)
      text: 'Total Days Completed',
      fontColor: '#212121',
      textAlign: 'center',
      x: '54%',
      y: '65%',
      width: '36%'
    },
    { //Rightside Label (middle portion)
      text: '1414',
      fontColor: '#4CAF50',
      fontFamily: 'Georgia',
      fontSize: 35,
      textAlign: 'center',
      x: '54%',
      y: '68%',
      width: '36%'
    },
    { //Rightside Label (bottom portion)
      text: 'May',
      fontColor: '#212121',
      padding: 2,
      textAlign: 'center',
      x: '54%',
      y: '80%',
      width: '36%'
    }
  ],

  tooltip : { //Lefthand Label (bottom portion)
    text: '%data-day',
    backgroundColor: 'none',
    borderColor: 'none',
    fontColor: '#212121',
    padding: 2,
    //textAlign: 'center',
    align: 'center',
    sticky: true,
    timeout: 30000,
    x: '10%',
    y: '80%',
    width: '36%'
  },

  plotarea: {
    marginTop: '15%',
    marginBottom:'55%',
    marginLeft: '8%',
    marginRight: '8%'
  }
};

zingchart.loadModules('calendar', function(){
  zingchart.render({
    id : 'myChart',
    data : myConfig,
    height: '100%',
    width: '100%'
  });
});

});
