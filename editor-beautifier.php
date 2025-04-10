<?php

/**
  Plugin Name: Editor Beautifier 
  Description: This plugin try to make Gutenberg Editor more friendly and easy to use.You will notice easily what components do you have in your page and what kind of block they are (paragraph, heading, columns, etc)
  Author: Federico Cadierno
  Author URI: https://federicocadierno.com/
  Version: 2.1
  Text Domain: editor-beautifier
  License: GPLv3
 */
  
//  Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function editor_beautifier_load_files() {
  	wp_enqueue_style( 'beautifier-style', plugin_dir_url(__FILE__).'css/beautifier.css' );
	wp_enqueue_script( 'light-or-dark-scripts', plugin_dir_url(__FILE__) . '/js/light-or-dark-bg.js', array( 'jquery' ), false, true);
}
 
add_action('admin_enqueue_scripts', 'editor_beautifier_load_files');

