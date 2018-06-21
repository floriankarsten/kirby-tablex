(function($) {

  // Helper function for lodash
  _.move = function(array,fromIndex,toIndex){
      array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
  }

  var Tablex = function(element) {
    tablexVue = new Vue({
      el: element,
      created: function() {
        this.options = this.getDomData('options', {minColumns: 1, maxColumns: 10, header: true});
        // Fills with an array of arrays and one empty array of length minColumns
        this.table = this.getDomData('tabledata',  [_.fill(Array(this.options.minColumns), '')]);
        // Fills with one empty array of length minColumns, header can't have more rows 
        this.header = this.getDomData('headerdata', _.fill(Array(this.options.minColumns), '')); 
        this.caption = this.getDomData('caption', '');
      },
      data: {     
        table: [],
        options: [],
        header: [],
        caption: '',        
      },
      computed: {
        columnCount: function() {
          return this.table[0].length;
        },
        rowCount: function(){
          return this.table.length;
        }
      },
      methods: {
        getDomData: function(dataname, defaultValues) {
          var domData = $(element).data(dataname);
          if (_.isEmpty(domData)) {
            domData = defaultValues;
          } else {
            console.log("Loading data from Kirby", domData);
          }

          return domData;
        },
        addRow: function() {
          // Pushes an array of length columnCount filled with ''
          this.table.push(_.fill(Array(this.columnCount), ''));
        },
        deleteRow: function(rowNum) {
          this.table.splice(rowNum, 1);
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
            var changing = this.table[rowIndex];
            this.table.splice(rowIndex, 1);

            this.table.splice(rowIndex + direction, 0, changing);
          }
        },
        addColumn: function() {
          _.forEach(this.table, function(value) {
            value.push("");
          });

          this.header.push("");
        },
        deleteColumn: function(colNum) {
          _.forEach(this.table, function(value) {
            value.splice(colNum-1, 1);
          });

          this.header.splice(colNum-1, 1);
        },
        moveColumn: function(colNum, direction) {
          if(direction == 'left') {
            direction = -1;
          } else if(direction == 'right') {
            direction = 1;
          } else {
            console.error('Wrong direction!');
          }

          if( !((colNum == 0 && direction == -1) || ((colNum+1 == this.columnCount) && direction == 1)) ) {
            _.forEach(this.table, function(array) {
              _.move(array, colNum, colNum+direction);
            });
            _.move(this.header, colNum, colNum+direction);
          }
        },
        updateCaption: function (caption) {
          this.caption = _.trim(caption);
        }        
      }
    });
  }; // End of table

  $.fn.tablex = function () {
    return this.each(function () {
      var tablex;

      if (tablex = $(this).data('tablex')) {
        return tablex;
      } else {
        return new Tablex(this);
      }
    });
  };
})(jQuery);
