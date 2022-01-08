"use strict";
// Class definition

var KTAppsUsersListDatatable = function() {
	// Private functions

	// basic demo
	var no =1;
	var _demo = function() {
		var datatable = $('#kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: baseFolder + 'Users/UserList',
					},
				},
				pageSize: 5, // display 20 records per page
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
					field: 'user_id',
					title: 'id',
					sortable: false,
					width: 40,
					type: 'number',
					selector: false,
					textAlign: 'left',
					template: function(data) {
						return data.user_id;
						
					}
				}, {
					field: 'organization_name',
					title: 'Orgazation name',
					width: 170,
					template: function(data) {
						return data.organization_name;
					}
				}, {
					field: 'Name',
					title: 'Name',
					template: function(row) {
					
						return row.name;
					}
				}, {
					field: 'Email',
					title: 'Email',
					width: 250,
					template: function(row) {
						return row.email;
					},
				}, {
					field: 'Phone no',
					title: 'Phone no',
					template: function(row) {
						
						return row.phone;
					}
				},{
					field: 'Action',
					title: 'Action',
					sortable: false,
					width: 70,
					overflow: 'visible',
					autoHide: false,
					template: function() {
						return '\
	                        <a href="javascript:;" title="Edit details">\
							<i class="far fa-edit text-success mr-5"></i>\
	                        </a>\
	                        <a href="javascript:;" title="Delete">\
							<i class="fas fa-trash text-danger mr-5"></i>\
	                        </a>\
	                    ';
					},
				}
			],

		});

		$('#kt_datatable_search_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_datatable_search_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});

		$('#kt_datatable_search_status, #kt_datatable_search_type').selectpicker();
	};

	return {
		// public functions
		init: function() {
			_demo();
		},
	};
}();

var KTWizard3 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizard;
	var _validations = [];

	// Private functions
	var initWizard = function () {
		// Initialize form wizard
		_wizard = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: true  // allow step clicking
		});

		// Validation before going to next page
		_wizard.on('beforeNext', function (wizard) {
			// Don't go to the next step yet
			_wizard.stop();

			// Validate form
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step
			validator.validate().then(function (status) {
				if (status == 'Valid') {
					_wizard.goNext();
					KTUtil.scrollTop();
				} else {
					// Swal.fire({
					// 	text: "Sorry, looks like there are some errors detected, please try again.",
					// 	icon: "error",
					// 	buttonsStyling: false,
					// 	confirmButtonText: "Ok, got it!",
					// 	customClass: {
					// 		confirmButton: "btn font-weight-bold btn-light"
					// 	}
					// }).then(function () {
					// 	KTUtil.scrollTop();
					// });
				}
			});
		});

		// Change event
		_wizard.on('change', function (wizard) {
			KTUtil.scrollTop();
		});
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					firstname: {
						validators: {
							notEmpty: {
								message: 'First name is required'
							}
						}
					},
					lastname: {
						validators: {
							notEmpty: {
								message: 'Last name is required'
							}
						}
					},
					organization: {
						validators: {
							notEmpty: {
								message: 'Organization name is required'
							}
						}
					},
					email: {
						validators: {
							notEmpty: {
								message: 'Email is required'
							}
						}
					},
					number: {
						validators: {
							notEmpty: {
								message: 'Number is required'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					address: {
						validators: {
							notEmpty: {
								message: 'Address is required'
							}
						}
					},
					pincode: {
						validators: {
							notEmpty: {
								message: 'Postcode is required'
							}
						}
					},
					country: {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));
	}
	var getFormSignup = function () {
		// var x= $('#fullName').attr('value',$('.firstname').value);
		// document.getElementById('fullName').remove();
		var x = $('input[name=firstname]').val();
		var y = $('input[name=lastname]').val();
		var z = $('input[name=email]').val();
		var p = $('input[name=number]').val();
		var q = $('input[name=password]').val();
		var r = $('input[name=organization]').val();
		var a = $('input[name=address]').val();
		var b = $('input[name=city]').val();
		var c = $('input[name=state]').val();
		var d = $('input[name=postcode]').val();
		var e = $('select[name=country] option:selected').text();
		document.getElementById('information').innerHTML = `<h5>Name:` + " " + `${x + " " + y} <br> ${z} <br> ${p} <br> ${r} <br> ${q}</h5>`;
		document.getElementById('addressdetails').innerHTML = `<h5>${a} <br> ${b}, ${c} <br> ${e}<br> ${d}</h5>`;
	}
	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard_v3');
			_formEl = KTUtil.getById('kt_form');

			initWizard();
			initValidation();
			$('#nextbutton').on('click', function () {
				getFormSignup();
			});
		}
	};
}();

jQuery(document).ready(function() {
	// $('#Add_user').hide();
	KTAppsUsersListDatatable.init();
	
	// KTWizard3.init();
});
