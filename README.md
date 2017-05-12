# WARNING! This is very early version. Don't use in production. Things will break.

Be patient with us, its our first field :). And don't be mad that it uses Vue.js and not pure jquery.

## What we are not sure about
- Naming, we chose stupid name kirby-tablex because we were worried about namespace pollution.
- How to properly pass data from kirby to JS. We are rendering ui only with JS. HTML doesn't come rendered from server. All data is passed to data-attribute of root element and taken from there. We are not sure how to make this safe properly. If you start to put \' and stuff like that into Tablex things will break.

## TODO:
- Ui design + css @krisak + @mightybart
- Documentation @krisak


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
You can of course have it as submodule. There won't be many updates.

