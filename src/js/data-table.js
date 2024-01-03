(function($) {
  'use strict';
  $(function() {
    $('#order-listing').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      },
      fixedColumns:   true,
      "columnDefs": [
     { "width": "10px", "targets": 0 },
     { "width": "40px", "targets": 1 },
     { "width": "100px", "targets": 2 },
     { "width": "70px", "targets": 3 },
     { "width": "70px", "targets": 4 },
     { "width": "70px", "targets": 5 },
     { "width": "70px", "targets": 6 },
     { "width": "70px", "targets": 7 }
   ],
    });
    $('#order-listing').each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });
})(jQuery);



(function($) {
  'use strict';
  $(function() {
    $('#staff_workflow').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      },
      fixedColumns:   true,
      "columnDefs": [
     { "width": "150px", "targets": 0 },
     { "width": "40px", "targets": 1 },
     { "width": "100px", "targets": 2 },
     { "width": "70px", "targets": 3 },
     { "width": "70px", "targets": 4 }
   ],
    });
    $('#order-listing').each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });
})(jQuery);


(function($) {
  'use strict';
  $(function() {
    $('#inquiry_report').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      },
      fixedColumns:   true,
      "columnDefs": [
     { "width": "10px", "targets": 0 },
     { "width": "40px", "targets": 1 },
     { "width": "100px", "targets": 2 },
     { "width": "70px", "targets": 3 },
     { "width": "70px", "targets": 4 },
     { "width": "70px", "targets": 5 },
     { "width": "70px", "targets": 6 }
   ],
    });
    $('#order-listing').each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });
})(jQuery);
