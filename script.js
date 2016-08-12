var myCustomCell = Backgrid.CustomCell = Backgrid.Cell.extend({
  initialize: function (options) {
    Backgrid.Cell.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, "backgrid:edited", this.changedCellCallback);
  },
// /* @property /
  events: {
    "click": "enterEditMode",
    
  },
  changedCellCallback: function (e) {
    // runFormula();
    console.log(e.collection.models);
  },
      // /* @property /
    className: "custom",
});

var col = new Backbone.Collection(
  [
  // Rows
    { name: 'rand 1' },
    { name: 'rand 2' },
    { name: 'rezultat' },
  ]
);

var grid = new Backgrid.Grid({
  // Columns
  columns: [
    {label: 'Raport initial', name: 'name', editable: true, cell: 'custom' },
  ],
  collection: col,
  // row: window.Backgrid.SummedRow.extend({ columnsToSum: ['name', 'value'], multiplier: 'multiplier' }),
  // body: window.Backgrid.SummedColumnBody.extend({ columnsToSum: ['name', 'value'] })
});




$(document).ready(function(){
  $('.main-table').append(grid.render().el);
  $('.insert-column').on('click', function(){
    addData($(this));
    insertColumn();
    addFormula();
    addNamesToCells();
    runFormula();
    incrementInputNames();
  });

});
      
function insertColumn() {
  grid.insertColumn([{
  label: "Comparabila 1",
  name: "comp1",
  editable: true,
  cell: "string",
}]);
}

function addData(elem) {
  $('.inputs .input-holder').each(function(){
    //get the value from each input.
    var value = $(this).find('input').val();
    // get the index of each input.
    var elementIndex = $(this).index();
    // assign the values to the new column
    col.models[elementIndex].attributes.comp1 = value ;
    // Empty the inputs
    $(this).find('input').val('');
  });
}

function addNamesToCells() {
  $('.new-column .inputs .input-holder').each(function(){
    var elementIndex = $(this).index();
    var theName = $(this).find('input').attr('name');
    $('.main-table tbody tr').eq(elementIndex).find('td:last').attr('data-cell-name', theName);
  });
}

function addFormula() {
  $('.inputs .input-holder').each(function(){
    var elementIndex = $(this).index();

    if($(this).find('input').attr('data-formula') != undefined) {
      var theFormula = $(this).find('input').attr('data-formula');
      $('.main-table tbody tr').eq(elementIndex).find('td:last').attr('data-formula', theFormula);
    }
  });
}

function runFormula() {
  $('.main-table tbody tr').each(function(){
    var theElement = $(this).find('td[data-formula]')
    var theFormula = $(this).find('td[data-formula]').attr('data-formula');
    if(theFormula != undefined) {
      eval(theFormula);
    }
  })
}

function incrementInputNames() {
  $('.inputs .input-holder').each(function(){
    var oldName = $(this).find('input').attr('name');
    var oldNumber = oldName.split('-')[2];
    var newNumber = +oldNumber + 1
    var newName = oldName.split('-')[0] + '-' + oldName.split('-')[1] + '-' + newNumber;
    $(this).find('input').attr('name',newName);
  });
}

// function function1(theElement) {
//   console.log('running the function');
//   var output = "";
//   var columnId = $('tr .editor').index();
//   if(columnId > 0) {
//     var output =  parseInt($('td[data-cell-name="val-1-' + columnId + '"]').html()) +  parseInt($('td[data-cell-name="val-2-' + columnId + '"]').html());
//   }
//   else {
//     var output =  parseInt($('td[data-cell-name="val-1-1"]').html()) +  parseInt($('td[data-cell-name="val-2-1"]').html());
//   }
  
//   theElement.html(output)
//   console.log(col)
// }

function function1(theElement) {
  // var rowIndex = 
  console.log(theElement.parent().index())
  var output = "";
  var columnId = theElement.parent().index();
  // if(columnId > 0) {
  //   var output =  parseInt($('td[data-cell-name="val-1-' + columnId + '"]').html()) +  parseInt($('td[data-cell-name="val-2-' + columnId + '"]').html());
  // }
  // else {
    var output =  parseInt($('td[data-cell-name="val-1-1"]').html()) +  parseInt($('td[data-cell-name="val-2-1"]').html());
  // }
  
  theElement.html(output);
  col.models[columnId].attributes.comp1= output;
}
