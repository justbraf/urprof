import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../lib/collections.js'
import './main.html';

Template.addProfile.events({
	'click .addbtn'(event, instance){
		var profURL = $("#addModal input[name='proURL']").val();
		var profFirst = $("#addModal input[name='proFirst']").val();
		var profLast = $("#addModal input[name='proLast']").val();
		var profSex = $("#addModal input[name='sex']:checked").val();
		// console.log(profURL, profFirst, profLast, profSex);
		profDataDB.insert({"img": profURL, "firstName": profFirst, "lastName": profLast, "gender": profSex});

		$("#addModal input[name='proURL']").val("");
		$("#addModal input[name='proFirst']").val("");
		$("#addModal input[name='proLast']").val("");
		$("#addModal #male").attr("checked", "checked");
		$("#addModal").modal("hide");
	}
});

Template.allProfiles.helpers({
	allProfs(){
		return profDataDB.find({},{sort:{"likes": -1, "dislikes": 1}});
	}
});

Template.allProfiles.events({	
	'click .viewbtn'(event, instance){
		$("#viewModal input[name='proID']").val(this._id);
		$("#viewModal img").attr("src", this.img);
		$("#viewModal img").attr("alt", this.firstName);
		$("#viewModal .profileName").html(this.firstName + "&nbsp;" + this.lastName);
		$("#viewModal .gender").html(this.gender);
		$("#viewModal .profLikes").html(this.likes + "&nbsp;Likes");
		$("#viewModal .profDislikes").html(this.dislikes + "&nbsp;Dislikes");
		$("#viewModal").modal("show");
	},
	'click .upvote'(){
		// var curLikes = profDataDB.findOne({"_id": this._id}).likes;
		// if (!Number(curLikes)){
		// 	curLikes = 0;
		// }
		profDataDB.update({"_id": this._id}, {$inc:{likes: 1}});
		// console.log("likes",Number(curLikes));
	},
	'click .downvote'(){
		profDataDB.update({"_id": this._id}, {$inc:{dislikes: 1}});
	}
});

// Template.viewProfile.onCreated(function(){
// 	this.profID = new ReactiveVar(0);
// });

// Template.viewProfile.helpers({
	// profFirstName(){
	// 	console.log("_id",Template.instance().profID.get());
	// 	return Template.instance().profID.get();
	// 	// return profDataDB.findOne({_id: profID}).firstName;
	// }
// });

Template.viewProfile.events({
	'click .delbtn'(){
		// console.log("delete",$("#viewModal input[name='proID']").val());
		var imgID = $("#viewModal input[name='proID']").val();
		$("#"+imgID).hide("slow", function (){
			profDataDB.remove({"_id": imgID});
		});
	}
});