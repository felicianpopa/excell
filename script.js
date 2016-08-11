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
    {label: 'Raport initial', name: 'name', editable: true, cell: 'string' },
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
    console.log(newName);
    $(this).find('input').attr('name',newName);
  });
}

function function1(theElement) {
 var output =  parseInt($('td[data-cell-name="val-1-1"]').html()) +  parseInt($('td[data-cell-name="val-2-1"]').html());
 theElement.html(output)
}
