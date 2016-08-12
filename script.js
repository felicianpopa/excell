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
    runFormula();
    addData($(this));
    insertColumn();
    addFormula();
    addNamesToCells();
    incrementInputNames();
    clearInputs();
  });

});
// Insert a new column(plugin functionality).    
function insertColumn() {
  grid.insertColumn([{
  label: "Comparabila 1",
  name: "comp",
  editable: true,
  cell: "custom",
}]);
}
// Add the data from the inputs to the column to be created.
function addData(elem) {
  $('.inputs .input-holder').each(function(){
    //get the value from each input.
    var value = $(this).find('input').val();
    // get the index of each input.
    var elementIndex = $(this).index();
    // assign the values to the new column
    col.models[elementIndex].attributes.comp = value ;
  });
}

// Add names to the new cells to be created.
function addNamesToCells() {
  $('.new-column .inputs .input-holder').each(function(){
    var elementIndex = $(this).index();
    var theName = $(this).find('input').attr('name');
    $('.main-table tbody tr').eq(elementIndex).find('td:last').attr('data-cell-name', theName);
  });
}
// Add the formulas to the new cells to be created from the inputs.
function addFormula() {
  $('.inputs .input-holder').each(function(){
    var elementIndex = $(this).index();

    if($(this).find('input').attr('data-formula') !== undefined) {
      var theFormula = $(this).find('input').attr('data-formula');
      $('.main-table tbody tr').eq(elementIndex).find('td:last').attr('data-formula', theFormula);
    }
  });
}
// Run the formula from the inputs.
function runFormula() {
  $('.inputs .input-holder').each(function(){
    var theFormula = $(this).find('input').attr('data-formula');
    if(theFormula !== undefined) {
      var elIndex = $(this).index();
      eval(theFormula+'(' + elIndex + ')');
    }
  });
}
// Increment the input names.
function incrementInputNames() {
  $('.inputs .input-holder').each(function(){
    var oldName = $(this).find('input').attr('name');
    var oldNumber = oldName.split('-')[2];
    var newNumber = +oldNumber + 1;
    var newName = oldName.split('-')[0] + '-' + oldName.split('-')[1] + '-' + newNumber;
    $(this).find('input').attr('name',newName);
  });
}
// Simplify the notatin for the inputs used in the formulas
function setInput(inputNumber) {
  return parseInt($('.inputs .input-holder').eq(inputNumber).find('input').val());
}
// Clear the input values
function clearInputs() {
    $('.inputs input').val('');
}
// Test formula
function function1(theElement) {
  var formula = setInput(0) + setInput(1);
  // get each input which has a formula inside and update it's value
  $('.inputs .input-holder').eq(theElement).find('input').val(formula);
}