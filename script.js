var col = new Backbone.Collection(
  [
  // Rows
    { name: 'raport initial' },
  ]
);

var grid = new Backgrid.Grid({
  // Columns
  columns: [
    {label: 'Name', name: 'name', editable: true, cell: 'string' },
  ],
  collection: col,
  // row: window.Backgrid.SummedRow.extend({ columnsToSum: ['name', 'value'], multiplier: 'multiplier' }),
  // body: window.Backgrid.SummedColumnBody.extend({ columnsToSum: ['name', 'value'] })
});




$(document).ready(function(){
  // col.models[0].attributes.comp2 = 'comparabila 2';
  



  $('.main-table').append(grid.render().el);
  $('.insert-column').on('click', function(){
    addData($(this));
    insertColumn();
  });
});
      
function insertColumn() {
  grid.insertColumn([{
  label: "Comparabila 1",
  name: "comp1",
  editable: false,
  cell: "string",
}]);
}

function addData(elem) {
  var value = elem.parent().find('input').val();
  elem.parent().find('input').val("")
  col.models[0].attributes.comp1 = value ;
}