window.onload = function() {

	//setup canvas
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	
	//get set render window size and add resize events
	var windowWidth = window.innerWidth-10;
	var windowHeight = window.innerHeight-document.getElementById("topbar").clientHeight-10;
	//paper.view.viewSize = new paper.Size(windowWidth,windowHeight);
	
	var arrow = new paper.Path();
	arrow.add(new paper.Point(-20,-20));
	arrow.add(new paper.Point(0,0));
	arrow.add(new paper.Point(20,-20));
	arrow.position = new paper.Point(windowWidth/2,windowHeight-40);
	arrow.strokeWidth = 2; 
	arrow.strokeCap = 'round';
	arrow.strokeColor = 'black';


	//object for line
	var Wormpie = function(){

		//setup line properites
		var position = new paper.Point(Math.random()*windowWidth, Math.random()*windowHeight);
		var direction = new paper.Point(0.5,0);
		var rotdirection = Math.random()*6-3;

		//create path segments
		var myPath = new paper.Path();
		myPath.strokeColor = new paper.Color((Math.random()+1)/2, (Math.random()+0.2)/2, (Math.random()+0.1)/2);
		myPath.strokeWidth = 3; 
		myPath.strokeCap = 'round';
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);
		myPath.add(position);

		//update path segements
		function update(){
			if(Math.random()>0.99){
				rotdirection = Math.random()*6-3;
			}

			direction.angle+=rotdirection;
			myPath.segments[0].point.x += direction.x;
			myPath.segments[0].point.y += direction.y;

			for(var i=10; i>0; i--){
				myPath.segments[i].point.x += (myPath.segments[i-1].point.x-myPath.segments[i].point.x)/7;	
				myPath.segments[i].point.y += (myPath.segments[i-1].point.y-myPath.segments[i].point.y)/7;	
			}
		}

		//return object with the
		return ({
			update: update
		});
	}
	

	//create array of lines
	var wormpies = [];
	for(var i=0; i<40; i++){
		wormpies.push(Wormpie());
	}

	//update state for each line every frame
	paper.view.onFrame = function(event) {
		for(var i in wormpies){
			wormpies[i].update();
		}
	}

	//interaction funcitons
	/*
	canvas.onclick = function(){
	
	}

	canvas.onmouseover = function(){

	}

	canvas.onmouseout = function(){

	}
	*/
	//on resize
	paper.view.onResize = function() {
		//windowWidth = window.innerWidth-10;
		//windowHeight = window.innerHeight-document.getElementById("topbar").clientHeight-10;
		//paper.view.viewSize = new paper.Size(windowWidth,windowHeight);
		arrow.position = new paper.Point(windowWidth/2,windowHeight-40);
	}

}
