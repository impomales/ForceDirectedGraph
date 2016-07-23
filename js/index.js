var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

var width = 1000, height = 800;

var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

d3.json(url, function(error, graph) {
  if (error) throw error;

  var force = d3.layout.force()
    .size([width, height])
    .nodes(graph.nodes)
    .links(graph.links)
    .linkDistance(50)
    .charge(-100);
  
  var link = svg.selectAll('.link')
    .data(graph.links)
    .enter().append('line')
    .attr('class', 'link');
  
  var node = svg.selectAll('.node')
    .data(graph.nodes)
    .enter().append('rect')
    .attr('class', 'node')
  
  force.on('end', function() {
    node.attr('x', function(d) {return d.x;})
    node.attr('y', function(d) {return d.y;})
    node.attr('width', 16)
    node.attr('height', 11)
    node.text('hello');
    
    link.attr('x1', function(d) {return d.source.x;})
      .attr('y1', function(d) {return d.source.y;})
      .attr('x2', function(d) {return d.target.x;})
      .attr('y2', function(d) {return d.target.y;})
  })
  
  force.start();
});