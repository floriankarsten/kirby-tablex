<?php

class TablexField extends BaseField {

  static public $assets = array(
    'js' => array(
      'lodash.js',
      'vue.js',
      'tablex.js',
      'papaparse.min.js',
    ),
    'css' => array(
      'tablex.css'
    )
  );

  public function content() {
    return tpl::load(__DIR__ . DS . 'template.php', array('field' => $this));
  }

//To retrieve a value
  public function value() {
    $value = parent::value();
    return yaml::decode($value);
  }

//method determines what is saved to the file
  public function result() {
    $result = parent::result();
    return yaml::encode($result);
  }
}
