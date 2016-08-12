var columnIndex = 0;
var functionCaller = "insertColumn"+columnIndex;
var clickedCellIndex = 0;
var myCustomCell = Backgrid.CustomCell = Backgrid.Cell.extend({
  initialize: function (options) {
    Backgrid.Cell.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, "backgrid:edited", this.changedCellCallback);
    this.listenTo(this.model, "backgrid:editing", this.editingCellCallback);
  },
// /* @property /
  events: {
    "click": "enterEditMode",
    
  },
  editingCellCallback: function (e) {
    clickedCellIndex = $('.main-table tbody td.editor').index();
  },
  changedCellCallback: function (e) {
    updateFormula();
    // console.log(e.collection.models);
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
    console.log(functionCaller);
    runFormula();
    addData($(this));
    eval(functionCaller)();
    incrementCompIndex();
    addFormula();
    addNamesToCells();
    incrementInputNames();
    clearInputs();
  });

});
// increment Comp Index
function incrementCompIndex() {
  columnIndex ++;
  functionCaller = "insertColumn"+columnIndex;
}

// Insert Columns.
//======================================================= 
function insertColumn0() {
  grid.insertColumn([{
    label: "Comparabila 1",
    name: 'compIndex0',
    editable: true,
    cell: "custom",
  }]);
}

function insertColumn1() {
  grid.insertColumn([{
    label: "Comparabila 2",
    name: 'compIndex1',
    editable: true,
    cell: "custom",
  }]);
}

function insertColumn2() {
  grid.insertColumn([{
    label: "Comparabila 3",
    name: 'compIndex2',
    editable: true,
    cell: "custom",
  }]);
}

function insertColumn3() {
  grid.insertColumn([{
    label: "Comparabila 4",
    name: 'compIndex3',
    editable: true,
    cell: "custom",
  }]);
}

function insertColumn4() {
  grid.insertColumn([{
    label: "Comparabila 5",
    name: 'compIndex4',
    editable: true,
    cell: "custom",
  }]);
}

function insertColumn5() {
  grid.insertColumn([{
    label: "Comparabila 6",
    name: 'compIndex5',
    editable: true,
    cell: "custom",
  }]);
}
// End insert Columns.
//=======================================================
// Add the data from the inputs to the column to be created.
function addData(elem) {
  $('.inputs .input-holder').each(function(){
    //get the value from each input.
    var value = $(this).find('input').val();
    // get the index of each input.
    var elementIndex = $(this).index();
    // assign the values to the new column
    // console.log(compIndex)
    var attrIndex ='compIndex'+columnIndex;
    col.models[elementIndex].attributes[attrIndex] = value ;

    console.log(col.models[elementIndex].attributes)
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
      chooseCalculationMethod = 0;
      var elIndex = $(this).index();
      eval(theFormula+'(' + elIndex + ')');
    }
  });
}
// Udate the values in the table
function updateFormula() {
  $('.main-table tbody tr').each(function(){
    var theFormula = $(this).find('td').eq(clickedCellIndex).attr('data-formula');
    if(theFormula !== undefined) {
      chooseCalculationMethod = 1;
      eval(theFormula+'(' + clickedCellIndex + ')');
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
// Simplify the notatin for the table cells used in the formulas
function setCell(cellNumber) {
  // $('.main-table tbody tr').eq(cellNumber).find('td').eq(clickedCellIndex).addClass('test');
  // console.log(col.models)
  // return parseInt($('.main-table tbody tr').eq(cellNumber).find('td').eq(clickedCellIndex).html());
  return parseInt(col.models[cellNumber].attributes.comp);
}
// Clear the input values
function clearInputs() {
    $('.inputs input').val('');
}
// Test formulas
function function1(theElement) {
  if (chooseCalculationMethod === 0) {
    var inputFormula = setInput(0) + setInput(1);
    // get each input which has a formula inside and update it's value
    $('.inputs .input-holder').eq(theElement).find('input').val(inputFormula);
  } else if(chooseCalculationMethod === 1) {
    // setCell(0);
    var cellFormula = setCell(0) + setCell(1);
    // console.log(setCell(1));
    // console.log(cellFormula);
    // col.models[theElement].attributes.comp = cellFormula;
    console.log(cellFormula);
    // console.log(theElement);
    // $('.main-table tbody tr').each(function(){
    //   // $(this).find('td[data-formula="function1"]').html(cellFormula);
    //   $(this).find('td[data-formula="function1"]').each(function(){
    //     if($(this).index() === theElement) {
    //       // $(this).html(cellFormula);
    //     }
    //   });
    // });
  }
}