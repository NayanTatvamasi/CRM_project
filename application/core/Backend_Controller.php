<?php defined('BASEPATH') or exit('No direct script access allowed');

/**
 * CodeIgniter-HMVC
 *
 * @package    CodeIgniter-HMVC
 * @author     N3Cr0N (N3Cr0N@list.ru)
 * @copyright  2019 N3Cr0N
 * @license    https://opensource.org/licenses/MIT  MIT License
 * @link       <URI> (description)
 * @version    GIT: $Id$
 * @since      Version 0.0.1
 * @filesource
 *
 */

class BackendController extends MY_Controller
{
    //
    public $CI;

    /**
     * An array of variables to be passed through to the
     * view, layout, ....
     */
    protected $data = array();

    /**
     * [__construct description]
     *
     * @method __construct
     */
    public function __construct()
    {
        // To inherit directly the attributes of the parent class.
        parent::__construct();

        // CI profiler
        $this->output->enable_profiler(false);

        // This function returns the main CodeIgniter object.
        // Normally, to call any of the available CodeIgniter object or pre defined library classes then you need to declare.
        $CI = &get_instance();

        //Example data
        // Site name
        $this->data['sitename'] = 'CRM';

        //Example data
        // Browser tab
        $this->data['site_title'] = ucfirst('Admin CRM');
    }

    /**
     * [render_page description]
     *
     * @method render_page
     *
     * @param  [type]      $view [description]
     * @param  [type]      $data [description]
     *
     * @return [type]            [description]
     */
    protected function render_page($view, $data, $name = null)
    {
        $this->load->view('template/header', array('load_css' => $this->data));
        if ($name == null) {
            $this->load->view('template/menu');
        }

        $this->load->view($view, array('load_data' => $this->data));
        $this->data['nofooter'] = $name;
        if ($name != '')
            $this->data['nofooter'] = 'nofooter';

        $this->load->view('template/footer', array('load_js' => $this->data));
    }

    public function load_grid_css($pageName = "")
    {
        switch ($pageName) {
            case 'add':
                return array(
                    'assets/backend/css/pages/wizard/wizard-3.css'
                );
                break;
            case 'dashboard':
                return array(
                    'assets/Backend/app-assets/vendors/css/extensions/unslider.css',
                    'assets/Backend/app-assets/vendors/css/weather-icons/climacons.min.css',
                    'assets/Backend/app-assets/fonts/meteocons/style.min.css',
                    'assets/Backend/app-assets/vendors/css/charts/morris.css',
                    'assets/Backend/app-assets/fonts/simple-line-icons/style.min.css',
                    'assets/Backend/app-assets/css/pages/timeline.min.css'
                );

                break;
            case 'login':
                return array(
                    'assets/Backend/app-assets/vendors/css/forms/icheck/icheck.css',
                    'assets/Backend/app-assets/vendors/css/forms/icheck/custom.css',
                    'assets/Backend/app-assets/css/pages/login-register.min.css',
                    'assets/Backend/app-assets/css/plugins/forms/validation/form-validation.css'
                );
                break;
            case 'list':
                return array(
                    'assets/Backend/app-assets/vendors/css/tables/datatable/datatables.min.css',
                    'assets/Backend/app-assets/css/pages/app-invoice.min.css',
                    'assets/Backend/app-assets/vendors/css/extensions/sweetalert2.min.css'
                );
                break;
            default:
                return array();
                break;
        }
    }

    public function load_grid_js($pageName = "")
    {
        switch ($pageName) {
            case 'dashboard':

                return array(
                    'assets/Backend/app-assets/vendors/js/charts/raphael-min.js',
                    'assets/Backend/app-assets/vendors/js/charts/morris.min.js',
                    'assets/Backend/app-assets/vendors/js/extensions/unslider-min.js',
                    'assets/Backend/app-assets/vendors/js/timeline/horizontal-timeline.js',
                    'assets/Backend/app-assets/js/scripts/pages/dashboard-ecommerce.min.js'

                );

                break;
            case 'login':
                return array(
                    'assets/backend/js/login.js'
                );
                break;
            case 'list':
                return array(
                    'assets/Backend/app-assets/vendors/js/tables/datatable/datatables.min.js',
                    'assets/Backend/app-assets/vendors/js/tables/datatable/datatables.checkboxes.min.js',
                    'assets/Backend/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js',
                    'assets/Backend/app-assets/vendors/js/tables/datatable/dataTables.bootstrap4.min.js',
                    'assets/Backend/app-assets/vendors/js/extensions/sweetalert2.all.min.js',
                    'assets/Backend/app-assets/js/scripts/parsleyjs/parsley.min.js',
                    'assets/Backend/js/common.js'
                    //    'assets/Backend/app-assets/js/scripts/pages/app-invoice.min.js'
                );
                break;
            case 'user':
                return array(
                    'assets/backend/js/user.js'
                );
                break;
            default:
                return array();
                break;
        }
    }
}
