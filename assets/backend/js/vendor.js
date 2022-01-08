"use strict";
// Class definition

var KTAppsUsersListDatatable = function () {
	// Private functions

	// basic demo
	var _demo = function () {
		var datatable = $('#kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: baseFolder + 'vendor/vendorList',
					},
				},
				pageSize: 10, // display 20 records per page
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},
			// layout definition
			layout: {
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#kt_subheader_search_form'),
				delay: 400,
				key: 'generalSearch'
			},

			// columns definition
			columns: [
				{
					field: 'id',
					title: '#',
					sortable: false,
					width: 50,
					type: 'number',
					selector: false,
					textAlign: 'left',
					template: function (data) {
						return '<span class="font-weight-bolder">' + data.id + '</span>';
					}
				},
				{
					field: 'company_name',
					title: 'Company Name',
					sortable: 'asc',
					width: 160,	
					template: function (data) {
						return '<span class="font-weight-bolder">' + data.company_name + '</span>';
					}
				},
				{
					field: 'contact_person_name',
					title: 'Company Person Name',
					width: 160,
					template: function (row) {
						var output = '';

						output += '<div class="font-weight text-muted">' + row.contact_person_name + '</div>';

						return output;
					}
				},{
					field: 'Country',
					title: 'Country',
					width: 100,
					template: function (row) {
						var output = '';

						output += '<div class="font-weight-bolder font-size-lg mb-0">' + row.country + '</div>';
						output += '<div class="font-weight-bold text-muted">Code: ' + row.country + '</div>';

						return output;
					}
				}, {
					field: 'created_at',
					title: 'Created Date & Time',
					type: 'date',
					width: 90,
					format: 'MM/DD/YYYY',
					template: function (row) {
						var output = '';

						output += '<div class="font-weight text-primary mb-0">' + row.created_at + '</div>';
					
						return output;
					},
				},
				// {
				// 	field: 'Status',
				// 	title: 'Status',
				// 	// callback function support for column rendering
				// 	template: function(row) {
				// 		var status = {
				// 			1: {'title': 'Pending', 'class': ' label-light-primary'},
				// 			2: {'title': 'Delivered', 'class': ' label-light-danger'},
				// 			3: {'title': 'Canceled', 'class': ' label-light-primary'},
				// 			4: {'title': 'Success', 'class': ' label-light-success'},
				// 			5: {'title': 'Info', 'class': ' label-light-info'},
				// 			6: {'title': 'Danger', 'class': ' label-light-danger'},
				// 			7: {'title': 'Warning', 'class': ' label-light-warning'},
				// 		};
				// 		return '<span class="label label-lg font-weight-bold ' + status[row.Status].class + ' label-inline">' + status[row.Status].title + '</span>';
				// 	},
				// }, 
				{
					field: 'Action',
					title: 'Action',
					sortable: false,
					width: 60,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
	                        <div class="dropdown dropdown-inline">\
	                        <a href="javascript:;" title="Edit">\
							<i class="far fa-edit text-success mr-3"></i>\
	                        </a>\
	                        <a href="javascript:;" title="Delete">\
							<i class="fas fa-trash text-danger"></i>\
	                        </a>\
	                    ';
					},
				}],
		});

		$('#kt_datatable_search_status').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_datatable_search_type').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});

		$('#kt_datatable_search_status, #kt_datatable_search_type').selectpicker();
	};

	return {
		// public functions
		init: function () {
			_demo();

		},
	};
}();

jQuery(document).ready(function () {
	KTAppsUsersListDatatable.init();
});
