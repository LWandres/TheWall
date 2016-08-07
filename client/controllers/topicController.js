
//TOPIC CONTROLLER
app.controller('topicController', function($scope, $routeParams, topicFactory, postFactory, userFactory) {
	var id = $routeParams.id;
	var topic_id = null;

	//get single user info
	userFactory.readUser(function(data) {
		$scope.name = data;
	})

	//get topic by id
	topicFactory.getTopic(id, function(data) {
		topic_id = data._id;
		$scope.topic = data;
		postFactory.readPosts(id, function(info) {
			$scope.posts = info;
		})
	})

	//create a new topic post
	$scope.createPost = function(newPost, name) {
		newPost.name = name.name;
        newPost.topic_id = topic_id;
		newPost.user_id = name._id;

    	postFactory.createPost(newPost, function(data) {
			postFactory.readPosts(id, function(info) {
				$scope.posts = info;
				numOfPosts = info.length;
	    		topicFactory.updateTopic(numOfPosts, id, function(yep){})
	    		userFactory.updateUserPosts(info, name, function(yep){})
			})
		})
	}

	//create a new comment on a post 
	$scope.createComment = function(newComment, post, name) {
		postFactory.createComment(newComment, post, name, function(info) {
			$scope.posts = info;
		})
	}

	//toggle function for add comment box
	$scope.showcomments = function(){
		var state = $(this).data('state');
		state = !state;

		if (state){
			$("#commentbox").addClass('show');
	 	}
		else{
			$("#commentbox").removeClass('show');
		}
		$(this).data('state', state);
	}
})
