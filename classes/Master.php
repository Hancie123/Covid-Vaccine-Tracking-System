<?php
require_once('../config.php');
Class Master extends DBConnection {
	private $settings;
	public function __construct(){
		global $_settings;
		$this->settings = $_settings;
		parent::__construct();
	}
	public function __destruct(){
		parent::__destruct();
	}
	function capture_err(){
		if(!$this->conn->error)
			return false;
		else{
			$resp['status'] = 'failed';
			$resp['error'] = $this->conn->error;
			return json_encode($resp);
			exit;
		}
	}
	function save_vaccine(){
		extract($_POST);
		$data = "";
		foreach($_POST as $k =>$v){
			if(!in_array($k,array('id'))){
				if(!empty($data)) $data .=",";
				$data .= " `{$k}`='{$v}' ";
			}
		}
		$check = $this->conn->query("SELECT * FROM `vaccine_list` where `name` = '{$name}' ".(!empty($id) ? " and id != {$id} " : "")." ")->num_rows;
		if($this->capture_err())
			return $this->capture_err();
		if($check > 0){
			$resp['status'] = 'failed';
			$resp['msg'] = "Vaccine Name already exist.";
			return json_encode($resp);
			exit;
		}
		if(empty($id)){
			$sql = "INSERT INTO `vaccine_list` set {$data} ";
			$save = $this->conn->query($sql);
		}else{
			$sql = "UPDATE `vaccine_list` set {$data} where id = '{$id}' ";
			$save = $this->conn->query($sql);
		}
		if($save){
			$resp['status'] = 'success';
			if(empty($id))
				$this->settings->set_flashdata('success',"New Vaccine successfully saved.");
			else
				$this->settings->set_flashdata('success',"Vaccine successfully updated.");
		}else{
			$resp['status'] = 'failed';
			$resp['err'] = $this->conn->error."[{$sql}]";
		}
		return json_encode($resp);
	}
	function delete_vaccine(){
		extract($_POST);
		$del = $this->conn->query("DELETE FROM `vaccine_list` where id = '{$id}'");
		if($del){
			$resp['status'] = 'success';
			$this->settings->set_flashdata('success',"Vaccine successfully deleted.");
		}else{
			$resp['status'] = 'failed';
			$resp['error'] = $this->conn->error;
		}
		return json_encode($resp);

	}
	function save_location(){
		extract($_POST);
		$data = "";
		foreach($_POST as $k =>$v){
			if(!in_array($k,array('id'))){
				$v = $this->conn->real_escape_string($v);
				if(!empty($data)) $data .=",";
				$data .= " `{$k}`='{$v}' ";
			}
		}
		$check = $this->conn->query("SELECT * FROM `vaccination_location_list` where `location` = '{$location}' ".(!empty($id) ? " and id != {$id} " : "")." ")->num_rows;
		if($this->capture_err())
			return $this->capture_err();
		if($check > 0){
			$resp['status'] = 'failed';
			$resp['msg'] = "Vaccination Location Name already exist.";
			return json_encode($resp);
			exit;
		}
		if(empty($id)){
			$sql = "INSERT INTO `vaccination_location_list` set {$data} ";
			$save = $this->conn->query($sql);
		}else{
			$sql = "UPDATE `vaccination_location_list` set {$data} where id = '{$id}' ";
			$save = $this->conn->query($sql);
		}
		if($save){
			$resp['status'] = 'success';
			if(empty($id))
				$this->settings->set_flashdata('success',"New Vaccination Location successfully saved.");
			else
				$this->settings->set_flashdata('success',"Vaccination Location successfully updated.");
		}else{
			$resp['status'] = 'failed';
			$resp['err'] = $this->conn->error."[{$sql}]";
		}
		return json_encode($resp);
	}
	function delete_location(){
		extract($_POST);
		$del = $this->conn->query("DELETE FROM `vaccination_location_list` where id = '{$id}'");
		if($del){
			$resp['status'] = 'success';
			$this->settings->set_flashdata('success',"Vaccination Location  successfully deleted.");
		}else{
			$resp['status'] = 'failed';
			$resp['error'] = $this->conn->error;
		}
		return json_encode($resp);

	}
	function save_new_individual(){
		$data = "";
		foreach($_POST as $k =>$v){
			if(in_array($k,array('firstname','lastname','middlename','contact','address','dob','gender','status'))){
				$v= $this->conn->real_escape_string($v);
				if(!empty($data)) $data .=", ";
				$data .=" `{$k}` = '{$v}' ";
			}
		}
		$code = '';
		while(true){
			$code = mt_rand(1,999999999999999);
			$code = sprintf("%'.015d",$code);
			$check = $this->conn->query("SELECT * FROM `individual_list` where tracking_code = '{$code}' ")->num_rows;
			if($check <= 0)
			break;
		}
		$data .=", `tracking_code` = '{$code}' ";
		$sql = "INSERT INTO `individual_list` set {$data}";
		$save = $this->conn->query($sql);
		if($save){
			return 1;
		}else{
			$resp['status'] = 'failed';
			$resp['msg'] = 'An error occured. Error: '.$this->conn->error;
		}
		return json_encode($resp);
	}
	function save_history(){
		$_POST['user_id'] = $this->settings->userdata('id');	
		extract($_POST);	
		if(empty($individual_id)){
			$new_individual =$this->save_new_individual();
			if($new_individual && !is_array($new_individual)){
				$individual_id= $this->conn->insert_id;
				$_POST['individual_id'] =$individual_id;
			}else{
				exit;
			}
		}
		$data = "";
		foreach($_POST as $k =>$v){
			if(!in_array($k,array('id','firstname','lastname','middlename','contact','address','dob','gender','status','indiRadio'))){
				$v = $this->conn->real_escape_string($v);
				if(!empty($data)) $data .=",";
				$data .= " `{$k}`='{$v}' ";
			}
		}
		if(empty($id)){
			$sql = "INSERT INTO `vaccine_history_list` set {$data} ";
		}else{
			$sql = "UPDATE `vaccine_history_list` set {$data} where id = '{$id}' ";
		}
		$save = $this->conn->query($sql);
		if($save){
			$resp['status'] = 'success';
			if(empty($id)){
				$this->settings->set_flashdata('success',"New Vaccination Record successfully saved.");
				$id = $this->conn->insert_id;
			}else{
				$this->settings->set_flashdata('success',"Vaccination Record successfully updated.");
			}
			$resp['id'] = $id;
			if(isset($status)){
				$this->conn->query("UPDATE `individual_list` set status = '{$status}' where id = '{$individual_id}'");
			}
		}else{
			$resp['status'] = 'failed';
			$resp['err'] = $this->conn->error."[{$sql}]";
		}
		return json_encode($resp);
	}
	function delete_history(){
		extract($_POST);
		$del = $this->conn->query("DELETE FROM `vaccine_history_list` where id = '{$id}'");
		if($del){
			$resp['status'] = 'success';
			$this->settings->set_flashdata('success',"Vaccination Record successfully deleted.");
		}else{
			$resp['status'] = 'failed';
			$resp['error'] = $this->conn->error;
		}
		return json_encode($resp);

	}
	function get_individual(){
		extract($_POST);
		$individual_qry = $this->conn->query("SELECT *,concat(lastname,', ', firstname, ' ', middlename ) as name FROM individual_list where tracking_code ='{$code}'");
		$data=array();
		if($individual_qry->num_rows > 0){
			foreach($individual_qry->fetch_array() as $k => $v){
				if($k =='dob'){
					$v = date("M d, Y",strtotime($v));
				}
				if(!is_numeric($k))
				$data[$k] = $v;
			}
		}
		return json_encode($data);
	}
	function save_individual(){
		extract($_POST);
		$data = "";
		foreach($_POST as $k =>$v){
			if(!in_array($k,array('id'))){
				$v= $this->conn->real_escape_string($v);
				if(!empty($data)) $data .=", ";
				$data .=" `{$k}` = '{$v}' ";
			}
		}
		$sql = "UPDATE `individual_list` set {$data} where id = '{$id}'";
		$save = $this->conn->query($sql);
		if($save){
			$resp['status'] = 'success';
			$this->settings->set_flashdata('success'," Individual's Details Successfully updated.");
		}else{
			$resp['status'] = 'failed';
			$resp['msg'] = 'An error occured. Error: '.$this->conn->error;
		}
		return json_encode($resp);
	}
	function delete_individual(){
		extract($_POST);
		$del = $this->conn->query("DELETE FROM `individual_list` where id = '{$id}'");
		if($del){
			$resp['status'] = 'success';
			$this->settings->set_flashdata('success',"Individual's Details Successfully deleted.");
		}else{
			$resp['status'] = 'failed';
			$resp['error'] = $this->conn->error;
		}
		return json_encode($resp);

	}
}

$Master = new Master();
$action = !isset($_GET['f']) ? 'none' : strtolower($_GET['f']);
$sysset = new SystemSettings();
switch ($action) {
	case 'save_vaccine':
		echo $Master->save_vaccine();
	break;
	case 'delete_vaccine':
		echo $Master->delete_vaccine();
	break;
	case 'save_location':
		echo $Master->save_location();
	break;
	case 'delete_location':
		echo $Master->delete_location();
	break;
	case 'save_history':
		echo $Master->save_history();
	break;
	case 'delete_history':
		echo $Master->delete_history();
	break;
	case 'get_individual':
		echo $Master->get_individual();
	break;
	case 'save_individual':
		echo $Master->save_individual();
	break;
	case 'delete_individual':
		echo $Master->delete_individual();
	break;
	
	default:
		// echo $sysset->index();
		break;
}