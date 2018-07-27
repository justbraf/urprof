import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../lib/collections.js'
import './main.html';

Template.addProfile.events({
	'click .addbtn'(event, instance){
		var profURL = $("#addModal input[name='proURL']").val();
		var profFirst = $("#addModal input[name='proFirst']").val();
		var profLast = $("#addModal input[name='proLast']").val();
		var profSex = $("#addModal input[name='sex']").val();
		console.log(profURL, profFirst, profLast, profSex);

		$("#addModal input[name='proURL']").val("");
		$("#addModal input[name='proFirst']").val("");
		$("#addModal input[name='proLast']").val("");
		$("#addModal #male").attr("checked", "checked");
		$("#addModal").modal("hide");
	}
});