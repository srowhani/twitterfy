import Ember from 'ember';
var socket = io();
export default Ember.Component.extend({
  tagName: 'svg',
  didInsertElement() {
    socket.emit('ready', {});
    var svg = d3.select(this.element)
      .attr('width', 900)
      .attr('height', 550);

    var path = d3.geo.path().projection(d3.geo.albersUsa());

    var g = svg.append('g');

    d3.json('us.json', function(error, topology) {
      g.selectAll('path')
        .data(topojson.feature(topology, topology.objects.usStates).features)
        .enter().append('path')
        .attr('class', function(d) {
          return 'states ' + d.properties.STATE_ABBR;
        })
        .attr('d', path)
        .attr('fill', 'gray')
        .attr('opacity', '0.8');
    });
  }
});
