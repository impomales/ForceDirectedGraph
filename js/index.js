var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

var width = 1000, height = 800;

var container = d3.select('#container');

var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var tip = d3.tip()
  .attr('class', 'tip')
  .html(function(d) {
    return "<p>" + d.country + "</p>";
  });

svg.call(tip);

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
  
  var node = container.select('.box').selectAll('.node')
    .data(graph.nodes)
    .enter().append('img')
    .attr('class', function(d) {return 'flag flag-' + d.code})
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .call(force.drag);
  
  force.on('tick', function() {
    node.style('left', function(d) {return (d.x - 10) + 'px';})
      .style('top', function(d) {return (d.y - 810) + 'px';});
    
    link.attr('x1', function(d) {return d.source.x;})
      .attr('y1', function(d) {return d.source.y;})
      .attr('x2', function(d) {return d.target.x;})
      .attr('y2', function(d) {return d.target.y;})
  })
  
  force.start();
});