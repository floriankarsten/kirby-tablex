(function($) {
  // adding helper function to lodash, dunno where to put it
  _.move = function(array,fromIndex,toIndex){
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
  }

  var parseCsv = function(text) {
    var p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l in text) {
      l = text[l];
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = '']; i = 0;
      } else row[i] += l;
      p = l;
    }
    return ret;
  };

  var Tablex = function(element) {
    tablexVue = new Vue({
      el: element,
      created: function() {
        this.options = this.getDomData('options', {minColumns: 1, maxColumns: 10, header: true});
        // fills with array of arrays and 1 empty array of lenght minColumns
        this.table = this.getDomData('tabledata',  [_.fill(Array(this.options.minColumns), '')]);
        // fills with 1 empty array of lenght minColumns, header cant have more rows
        this.header = this.getDomData('headerdata', _.fill(Array(this.options.minColumns), ''));
      },
      data: {
        table: [],
        options: [],
        header: [],
      },
      computed: {
        columnCount: function() {
          return this.table[0].length;
        },
        rowCount: function(){
          return this.table.length;
        },
        encodedCsv: function() {
          var head = "data:text/csv;charset=utf-8,";
          return head + this.table.map(function (row) {
            return row.join(',');
          }).join('\r\n');
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
            console.log(rowIndex, direction);
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
          console.dir(colNum);
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

          if( !((colNum == 0 && direction == -1) || ((colNum+1 == this.columnCount) && direction == 1)) ){
            _.forEach(this.table, function(array) {
              _.move(array, colNum,colNum+direction);
            });

            _.move(this.header, colNum,colNum+direction);
          }
        },
        downloadCsv: function () {

        },
        uploadCsv: function (files) {
          if (files.length) {
            var reader = new FileReader();
            reader.onload = function(ev){
              var text = ev.target.result;
              var parsed = parseCsv(text);
              if (parsed[0]) {
                if (parsed[0].length === this.table[0].length) {
                  parsed.forEach(function (row, rowIndex) {
                    this.$set(this.table, rowIndex, row);
                  }.bind(this));
                } else {
                  console.log('Uploaded column count doesnt match current table column count');
                }
              } else {
                console.log('Uploaded table seems to be empty');
              }

            }.bind(this);

            reader.readAsText(files[0], 'UTF-8');
          }

        }
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
