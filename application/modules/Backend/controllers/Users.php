<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends BackendController
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_m');
    }

    public function index()
    {
        user_is_logged_in();
        $this->data['site_title'] = ucfirst('Users');
		$this->data['template_css']=$this->load_grid_css('add');
		$this->data['template_js']=$this->load_grid_js('user');
		$this->render_page($this->data['sitename_folder'].'user_v',$this->data);
    }

    public function UserList()
    {
        $records = $this->User_m->get_datatables();

        $data = array();
        $no = 0;
        foreach ($records as $record) {
            $no++;
            $data[] = array(
                "user_id" =>  $no,
                "organization_name" => $record->organization_name,
                "name" => $record->firstname,
                "email" => $record->email,
                "phone" => $record->phone,
                "status" => $record->status,
            );
        }
        
       
        $output = array(
            // "draw" => $_POST['draw'],
            "recordsTotal" => $this->User_m->count_all(),
            "recordsFiltered" => $this->User_m->count_filtered(),
            "data" => $data,
        );
        //output to json format
        echo json_encode($output);
    }
    
}
