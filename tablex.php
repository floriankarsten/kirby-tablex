<?php

class TablexField extends BaseField {

  static public $assets = [
    'js' => [
      'lodash.js',
      'vue.js',
      'tablex.js',
    ],
    'css' => [
      'tablex.css'
    ]
  ];

  public function content() {    

    $field['name'] = $this->name;

    $field['tableData'] = (!empty($this->value()['table']))
      ? htmlspecialchars(json_encode($this->value()['table']), ENT_QUOTES, 'UTF-8')
      : '';
    
    $field['headerData'] = (!empty($this->value()['header']))
      ? htmlspecialchars(json_encode($this->value()['header']), ENT_QUOTES, 'UTF-8')
      : '';
    
    $field['options'] = (!empty($this->options()))
      ? htmlspecialchars(json_encode($this->options()), ENT_QUOTES, 'UTF-8')
      : '';
    
    $field['caption'] = (!empty($this->value()['caption']))
      ? htmlspecialchars($this->value()['caption'], ENT_QUOTES, 'UTF-8')
      : '';

    return tpl::load(__DIR__ . DS . 'template.php', compact('field'));
  }

  public function value() {
    $value = parent::value();

    return yaml::decode($value);
  }

  public function result() {
    $result = parent::result();

    return yaml::encode($result);
  }
}
