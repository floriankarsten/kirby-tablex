(function($) {
    // adding helper function to lodash, dunno where to put it
    _.move = function(array,fromIndex,toIndex){
        array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
    }

  var Tablex = function(element) {
    tablexVue = new Vue({
      el: element,
      created: function() {
        // this.getTableData();
        this.options = this.getDomData('options', {minColumns: 1, maxColumns: 10, header: true});
        this.tables = this.getDomData('tabledata',  [_.fill(Array(this.options.minColumns), '')]); // fills with array of arrays and 1 empty array of lenght minColumns
        this.header = this.getDomData('headerdata', _.fill(Array(this.options.minColumns), '')); // fills with 1 empty array of lenght minColumns, header cant have more rows
        console.log(this.options);
        console.log(this.options.maxColumns);
        // this.getHeaderData();
      },
      data: {
        tables: [],
        options: [],
        header: [],
      },
      computed: {
        columnCount: function() {
          return this.tables[0].length;
        },
        rowCount: function(){
            return this.tables.length;
        }
      },
      methods: {
        getDomData: function(dataname, defaultValues) {
          var domData = $(element).data(dataname);
          if (_.isEmpty(domData)) {

              domData = defaultValues;

          } else {
            console.log("loading data from kirby", domData);
          }

          return domData;
        },
        addRow: function() {
            //pushes array of length columnCount  filled with ''
            this.tables.push(_.fill(Array(this.columnCount), ''));
        },
        deleteRow: function(rowNum) {
            this.tables.splice(rowNum, 1);
        },
        moveRow: function(rowIndex, direction) {
          if (direction == 'up') {
            direction = -1;
          } else if (direction == 'down') {
            direction = 1;
          } else {
                console.error('Wrong direction!')
        }
          if (!((rowIndex == 0 && direction == -1) || ( (rowIndex == (this.rowCount-1)) && direction == 1 ))) {
            console.log(rowIndex, direction);
            var changing = this.tables[rowIndex];
            this.tables.splice(rowIndex, 1);

            this.tables.splice(rowIndex + direction, 0, changing);
          }
        },
        addColumn: function() {
          _.forEach(this.tables, function(value) {
            value.push("");
          });
        },
        deleteColumn: function(colNum) {
            console.dir(colNum);
           _.forEach(this.tables, function(value) {
                value.splice(colNum-1, 1);
            });
        },
        moveColumn: function(colNum, direction) {
            if(direction == 'left') {
                direction = -1;
            } else if(direction == 'right') {
                direction = 1;
            } else {
                console.error('Wrong direction!');
            }
            if( !((colNum == 0 && direction == -1) || ((colNum+1 == this.columnCount) && direction == 1)) ){


                console.log('omg');

            _.forEach(this.tables, function(array) {
                    _.move(array, colNum,colNum+direction);
                });
            }
        },
      }
    });
  }; // end of table

  $.fn.tablex = function() {
    // console.log('tablex call');
    return this.each(function() {
      //  console.log('tablex each');
      if ($(this).data('tablex')) {
        // console.log('tablex jedna');
        $(this).data('tablex');
        return $(this).data('tablex');
      } else {
        console.log('dva');
        var tablex = new Tablex(this);
        // console.log($(this).data('tablex'));
        // console.log(tablex);
        $(this).data('tablex', tablex);
        return tablex;
      }
    });
  };
})(jQuery);
