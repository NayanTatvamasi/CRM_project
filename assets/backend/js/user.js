"use strict";

// Class definition
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
					first_name: {
						validators: {
							notEmpty: {
								message: 'First name is required'
							}
						}
					},
					last_name: {
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
					postcode: {
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
        document.getElementById('information').innerHTML = `<h5>${x +" "+ y} <br> ${z} <br> ${p} <br> ${r} <br> ${q}</h5>`;
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

jQuery(document).ready(function () {
	KTWizard3.init();
});
