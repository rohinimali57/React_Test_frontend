(function($) {
  'use strict';
  $(function() {
    if ($('#calendar').length) {
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2019-07-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [{
            title: 'All Day Event',
            start: '2019-07-28'
          },
      //    {
      //      title: 'Long Event',
      //      start: '2019-07-01',
      //      end: '2017-07-07'
      //    },
      //    {
      //      id: 999,
    //        title: 'Repeating Event',
      //      start: '2017-07-09T16:00:00'
      //    },
      //    {
      //      id: 999,
      //      title: 'Repeating Event',
      //      start: '2017-07-16T16:00:00'
      //    },

          {
            title: 'Meeting',
            start: '2019-07-12T14:30:00'
          },
          {
            title: 'Anniversary',
            start: '2019-07-16T17:30:00'
          },
          {
            title: 'Baby Shower',
            start: '2019-07-17T17:30:00'
          },
          {
            title: 'Conference',
            start: '2019-07-17T20:00:00'
          },
          {
            title: 'Business Meeti..',
            start: '2019-07-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2019-07-28'
          }
        ]
      })
    }
  });
})(jQuery);
