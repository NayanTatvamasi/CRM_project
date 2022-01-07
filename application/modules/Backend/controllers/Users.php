<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends BackendController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        user_is_logged_in();
        $this->data['site_title'] = ucfirst('Users');
		$this->data['template_css']=$this->load_grid_css('add');
		$this->data['template_js']=$this->load_grid_js('user');
		$this->render_page($this->data['sitename_folder'].'user_v',$this->data);
    }
}
