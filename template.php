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
	
	<!-- Column Controls -->
	<div class="tablex-ctrl">
		<div class="row-ctrl filling-block"></div>
		<div class="row-cell column-ctrl" v-for="n in columnCount">
			<i class="fa fa-chevron-left"  v-bind:class="{ disabled: n == 1 }" v-on:click="moveColumn(n-1, 'left')"></i>
			<i class="fa fa-times-circle"  v-bind:class="{ disabled: columnCount <= options.minColumns }" v-on:click="deleteColumn(n)"></i>
			<i class="fa fa-chevron-right" v-bind:class="{ disabled: n == columnCount }"  v-on:click="moveColumn(n-1, 'right')"></i>
		</div>
		<div class="row-ctrl add-column">
			<i class="fa fa-plus" v-bind:class="{ disabled: columnCount >= options.maxColumns }" v-on:click="addColumn()"></i>
		</div>
	</div>

	<!-- Table Body -->
	<div class="tablex-container">

		<!-- Header -->
		<div class="tablex-row tablex-header" v-if="options.header">
			<div class="row-ctrl"><i class="fa fa-header"></i></div>
			<input class="row-cell input" type="text" :name="'<?= $field->name() ?>[header]'" v-model="header[cellIndex]"  v-for="(cell, cellIndex) in columnCount">
			<div class="row-ctrl filling-block"></div>
		</div>
		
		<!-- Row -->
		<div class="tablex-row" v-for="(row, rowIndex) in tables">
			<div class="row-ctrl move-row">
				<i class="fa fa-chevron-up" v-bind:class="{ disabled: rowIndex == 0 }" v-on:click="moveRow(rowIndex, 'up')"></i>
				<i class="fa fa-chevron-down" v-bind:class="{ disabled: rowIndex == rowCount-1 }" v-on:click="moveRow(rowIndex,	'down')"></i>
			</div>
			<input class="row-cell input" type="text" :name="'<?= $field->name() ?>[tables]['+ rowIndex +']'"  v-model="row[cellIndex]"  v-for="(cell, cellIndex) in row">
			<div class="row-ctrl delete-row">
				<i class="fa fa-times-circle" v-on:click="deleteRow(rowIndex)" v-show="rowCount > 1"></i>
			</div>
		</div>
	</div>

	<!-- Add Row Btn-->
	<div class="tablex-add-row">
		<div class="row-ctrl filling-block"></div>
		<div class="row-cell"><i class="fa fa-plus" v-on:click="addRow()"></i></div>
		<div class="row-ctrl filling-block"></div>
	</div>
</div>
