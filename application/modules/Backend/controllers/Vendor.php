<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Vendor extends BackendController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        user_is_logged_in();
        $this->data['site_title'] = ucfirst('Vendor');
        $this->data['template_css'] = $this->load_grid_css('add');
        $this->data['template_js'] = $this->load_grid_js('vendor');
        $this->render_page($this->data['sitename_folder'] . 'vendor_v', $this->data);
    }

    public function vendorList()
    {
        $result = $this->Common_m->get_common_master('vendors', '*', array('user_id' => $_SESSION['user_id']), 'id ASC');

        echo json_encode($result);
    }
}
