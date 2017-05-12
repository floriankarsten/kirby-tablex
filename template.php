
 <?php  //ref($field); ?>
<?php

// TODO: refactor?
$tableData = '';
$headerData = '';
$options = '';
if(!empty($field->value()['tables'])) {
	$tableData = a::json($field->value()['tables']);

}
if(!empty($field->value()['header'])) {
	$headerData = a::json($field->value()['header']);
}
if(!empty($field->options())) {
	$options = a::json($field->options());
}



?>



<div class="tablex-field field field-name-<?php echo $field->name(); ?>" v-cloak data-field='tablex' data-options='<?php echo $options ?>' data-tabledata='<?php echo $tableData ?>' data-headerdata='<?php echo $headerData ?>'>
	
	<div class="tablex-controller">
		<div v-if="options.header == true" class="tablex-lock">
				<i class="fa fa-header"></i>
		</div>

			<div class="column-controller" v-for="n in columnCount">
					<i class="delete-column fa fa-angle-left" v-show="n !== 1" v-on:click="moveColumn(n-1, 'left')"></i>
					<i class="delete-column fa fa-trash-o" v-show="columnCount > options.minColumns" v-on:click="deleteColumn(n)"></i>
					<i class="delete-column fa fa-angle-right" v-show="n !== columnCount"  v-on:click="moveColumn(n-1, 'right')"></i>
			</div>
		<div class="add-column" v-show="columnCount < options.maxColumns" v-on:click="addColumn()">
			<i class="icon fa fa-plus-circle"></i>
		</div>
	</div>

	<div class="tablex-container">

					<div class="header-row" v-if="options.header">
							<input class="input" type="text" :name="'<?= $field->name() ?>[header]'" v-model="header[cellIndex]"  v-for="(cell, cellIndex) in columnCount">
					</div>
					<div class="tablex-row" v-for="(row, rowIndex) in tables">
							<div class="field-icon sortable-handle">
								<i class="icon fa fa-angle-up"  v-show="rowIndex !== 0" v-on:click="moveRow(rowIndex, 'up')"></i>
								<i class="icon fa fa-angle-down" v-show="rowIndex !== rowCount-1"v-on:click="moveRow(rowIndex,	'down')"></i>
							</div>
			
							<input class="input" type="text" :name="'<?= $field->name() ?>[tables]['+ rowIndex +']'"  v-model="row[cellIndex]"  v-for="(cell, cellIndex) in row">
							<div class="field-icon delete-row" v-on:click="deleteRow(rowIndex)" v-show="rowCount > 1">
								<i class="icon fa fa-trash-o"></i>
							</div>
					</div>
	</div>
	<div class="add-row" v-on:click="addRow()">
		<i class="fa fa-plus"></i>
	</div>
</div>


