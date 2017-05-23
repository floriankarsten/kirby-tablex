# Kirby tablex
Simple table field for Kirby CMS. Advice, features and sugestions welcome.

![Kirby tablex GIF](https://raw.githubusercontent.com/floriankarsten/kirby-tablex/stuff/kirby-tablex.gif "Kirby tablex GIF")

## Usage

As any field in blueprint:
```yaml
  table:
    label: table
    type: tablex
    options: 
      maxColumns: 10
      minColumns: 3
      header: false
```

Options are not required. Defaults are:
```yaml
        maxColumns: 10
        minColumns: 1
        header: false
```

In your template you can simply use kirbys ```toStructure()```

Example:
```
			<?php $tableX = $page->table()->toStructure(); ?>
			<div class="table">
				<table>
					<thead>
						<tr>
							<?php foreach($tableX->header() as $headerCell): ?>
								<th><?= $headerCell; ?></th>
							<?php endforeach; ?>
						</tr>
					</thead>
					<tbody>
						<?php foreach($tableX->tables() as $tableRow): ?>
							<tr>
								<?php foreach($tableRow as $tableCell): ?>
									<td><?= $tableCell; ?></td>
								<?php endforeach; ?>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>
 ```



## Installation
To install the plugin, please put it in the `site/plugins` directory.  
The plugin folder must be named `tablex`.

```
site/plugins/
    tablex/
        tablex.php
        ...
```

### Download
Link to latest version https://github.com/floriankarsten/kirby-tablex/releases/latest

### With Kirby CLI
```kirby plugin:install floriankarsten/kirby-tablex```

### With Git
```git clone https://github.com/floriankarsten/kirby-tablex/releases.git tablex```
You can of course have it as submodule.



## What we are not sure about - ideas, opinions welcome :)
- Naming, we chose stupid name kirby-tablex because we were worried about namespace pollution.
- How to properly pass data from kirby to JS. We are rendering ui only with JS. HTML doesn't come rendered from server. All data is passed to data-attribute of root element and taken from there. We are not sure how to make this safe properly. If you start to put \' and stuff like that into Tablex things will break.

