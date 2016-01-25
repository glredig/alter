app.directive('lineChart', ['$window', 'd3Service', function($window, d3Service) {
	return {
		restrict: 'EA',
		scope: {},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {
				var margin = parseInt(attrs.margin) || 20;
	          	var svg = d3.select(element[0])
	            			.append('svg')
	            			.style('width', '100%');
	 
	          	// Browser onresize event
	          	window.onresize = function() {
	            	scope.$apply();
	          	};
	 
	          	// hard-code data
	          	scope.data = [
		            {date: 1, weight: 188},
		            {date: 2, weight: 189},
		            {date: 3, weight: 187.2},
		            {date: 4, weight: 186.6}
	          	];
	 
	          	// Watch for resize event
	          	scope.$watch(function() {
	            	return angular.element($window)[0].innerWidth;
	          	}, function() {
	            	scope.render(scope.data);
	          	});
	 
	          	scope.render = function(data) {
				    svg.selectAll('*').remove();
 
				    if (!data) return;
				 
				    var width = d3.select(element[0]).node().offsetWidth - margin,
				        height = 500 - margin,
				        color = d3.scale.category20(),
				        xScale = d3.scale.linear()
				          .domain([0, d3.max(data, function(d) {
				            return d.weight;
				          })])
				          .range([0, width]);
 
					    svg.attr('height', height);

				    var x = d3.scale.linear()
				      .domain([d3.min(data, function(d) {return d.date }), d3.max(data, function(d) { return d.date })])
				      .range([0, width]);

				    var y = d3.scale.linear()
				      .domain([0, d3.max(data, function(d) {return d.weight}) + 2])
				      .range([height, 0]);

				    var total_line = d3.svg.line()
				      .x(function(d) { return x(d.date) })
				      .y(function(d) { return y(d.weight) })                                        

				    var xAxis = d3.svg.axis()
				      .scale(x)
				      .tickFormat(d3.format("d"))
				      .innerTickSize(-height)
				      .outerTickSize(0)
				      .orient("bottom");

				    var yAxis = d3.svg.axis()
				      .scale(y)
				      .innerTickSize(-width)
				      .outerTickSize(0)
				      .orient("left");   

				    var div = d3.select("body").append("div")   
				      .attr("class", "tooltip")               
				      .style("opacity", 0);      

				    svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
				      .call(xAxis)
				      .selectAll('text')
				      .style("text-anchor", "end")
				      .attr('transform', 'translate(12,' + 10 + ')');

				    svg.append("g")
				      .attr("class", "y axis")
				      .attr("transform", "translate(" + margin + "," + margin + ")")
				      .call(yAxis);  

				    svg.append("text")
				      .attr("class", "x_label")
				      .attr("text-anchor", "end")
				      .attr("x", (width + margin) / 2)
				      .attr("y", height + margin + margin - 6)
				      .text("date");

				    svg.append("text")
				      .attr("class", "y_label")
				      .attr("text-anchor", "end")
				      .attr("x", -(height + margin) / 2 + 50 )
				      .attr("dy", ".75em")
				      .attr("transform", "rotate(-90)")
				      .text("Weighins");

				    // Total graph
				    svg.append("svg:path")
				      .attr("d", total_line(data))
				      .attr('class', 'total_line')
				      .attr("stroke", "#000")
				      .attr("stroke-width", 2)
				      .attr('transform', 'translate(' + margin + ', ' + margin + ')')
				      .attr("fill", "none"); 

				    var total_points = svg.selectAll(".point")
				      .data(data)
				      .enter()
				      .append("svg:circle")
				      .attr("stroke", "#000")
				      .attr("fill", function(d, i) { return "#000" })
				      .attr("cx", function(d, i) { return x(d.date) })
				      .attr("cy", function(d, i) { return y(d.weight) })
				      .attr('transform', 'translate(' + margin + ',' + margin + ')')
				      .attr("r", function(d, i) { return 2 })
				      .on("mouseover", function(d) {      
				        var str = '<span class="label">Date:</span>';
				        str += '<div class="value">' + d.date + '</div>'
				        str += '<span class="label">Weight:</span>';
				        str += '<div class="value">' + d.weight + '</div>';
				        div.transition()        
				          .duration(50)      
				          .style("opacity", .9);      
				        div .html(str)  
				          .style("left", (d3.event.pageX + 20) + "px")     
				          .style("top", (d3.event.pageY - 28) + "px");    
				        })                  
				      .on("mouseout", function(d) {       
				        div.transition()        
				          .duration(200)      
				          .style("opacity", 0); 
				      });  
   
					            }
					        });
						}
	}
}]);