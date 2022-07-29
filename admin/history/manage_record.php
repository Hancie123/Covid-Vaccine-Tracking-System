<?php
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `vaccine_history_list` where id = '{$_GET['id']}' ");
	if($qry->num_rows > 0){
		foreach($qry->fetch_assoc() as $k => $v){
			$$k=$v;
		}
	}
	$individual_qry = $conn->query("SELECT *,concat(lastname,', ', firstname, ' ', middlename ) as name FROM individual_list where id ='{$individual_id}'");
	$result_indi = $individual_qry->fetch_array();
}
?>
<style>
    span.select2-selection.select2-selection--single {
        border-radius: 0;
        padding: 0.25rem 0.5rem;
        padding-top: 0.25rem;
        padding-right: 0.5rem;
        padding-bottom: 0.25rem;
        padding-left: 0.5rem;
        height: auto;
    }
</style>
<div class="card card-outline card-info">
	<div class="card-header">
		<h3 class="card-title"><?php echo isset($id) ? "Update ": "Create New " ?> Record</h3>
	</div>
	<div class="card-body">
		<form action="" id="history-form">
			<input type="hidden" name ="id" value="<?php echo isset($id) ? $id : '' ?>">
			<div class="form-group <?php echo isset($id) ? 'd-none':'' ?>">
				<div class="custom-control custom-radio">
					<input class="custom-control-input" type="radio" id="indo_prev" value='1' name="indiRadio" checked>
					<label for="indo_prev" class="custom-control-label" >Already Registered</label>
				</div>
				<div class="custom-control custom-radio">
					<input class="custom-control-input" type="radio" id="indo_new" value='0' name="indiRadio">
					<label for="indo_new" class="custom-control-label">New Individual</label>
				</div>
			</div>
			<hr class="border-light">
			<fieldset id="prev_form" class="d-none">
				<input type="hidden" name="individual_id" required value="<?php echo isset($individual_id) ? $individual_id : '' ?>">
				<div class="form-group row">
					<div class="col-md-6">
						<label for="tracking_code" class="control-label">Tracking Code</label>
						<input type="text" class="form-control form-control-sm rounded-0" id="tracking_code" value="<?php echo isset($result_indi['tracking_code']) ? $result_indi['tracking_code'] :'' ?>">
					</div>
				</div>
				<div id="indiviual_info" class="row">
					<div class="col-md-6">
					<dl>
                        <dt class="text-muted">Indiviual Name:</dt>
                        <dd class="pl-4 indi_name"><?php echo isset($result_indi['name']) ? $result_indi['name'] : '' ?></dd>
                        <dt class="text-muted">Gender:</dt>
                        <dd class="pl-4 indi_gender"><?php echo isset($result_indi['gender']) ? $result_indi['gender'] : '' ?></dd>
						<dt class="text-muted">Date of Birth:</dt>
						<dd class="pl-4 indi_dob"><?php echo isset($result_indi['dob']) ? date("M d, Y",strtotime($result_indi['dob'])) : '' ?></dd>
                    </dl>
					</div>
					<div class="col-md-6">
						<dl>
							<dt class="text-muted">Contact:</dt>
							<dd class="pl-4 indi_contact"><?php echo isset($result_indi['contact']) ? $result_indi['contact'] : '' ?></dd>
							<dt class="text-muted">Address:</dt>
							<dd class="pl-4 indi_address"><?php echo isset($result_indi['address']) ? $result_indi['address'] : '' ?></dd>
						</dl>
					</div>
				</div>
			</fieldset>
			<fieldset id="new_form" class="d-none">
				<div class="form-group row">
					<div class="col-md-4">
						<div class="form-group">
							<label for="lastname" class="control-label">Last Name</label>
							<input type="text" class="form-control form-control-sm rounded-0" id="lastname" name="lastname">
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="firstname" class="control-label">First Name</label>
							<input type="text" class="form-control form-control-sm rounded-0" id="firstname" name="firstname">
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="middlename" class="control-label">Middle Name</label>
							<input type="text" class="form-control form-control-sm rounded-0" id="middlename" name="middlename">
						</div>
					</div>
				</div>
				<div class="form-group row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="gender" class="control-label">Gender</label>
							<select class="form-control form-control-sm rounded-0" id="gender" name="gender">
								<option>Male</option>
								<option>Female</option>
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="dob" class="control-label">Date of Birth</label>
							<input type="date" class="form-control form-control-sm rounded-0" id="dob" name="dob">
						</div>
					</div>
				</div>
				
				<div class="form-group row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="contact" class="control-label">Contact #</label>
							<input type="text" pattern="[0-9\s\/+]+" class="form-control form-control-sm rounded-0" id="contact" name="contact">
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="address" class="control-label">Address</label>
							<textarea rows="2" class="form-control form-control-sm rounded-0" id="address" name="address" style="resize:none"></textarea>
						</div>
					</div>
				</div>
			</fieldset>
			<hr class="border-light">
			<div class="form-group row">
				<div class="col-md-6">
					<label for="vaccine_id">Vaccine Used</label>
					<select name="vaccine_id" id="vaccine_id" class="custom-select custom-select-sm select2" required>
						<option value="" disabled <?php echo !isset($vaccine_id) ? "selected" :'' ?>></option>
						<?php 
							$vaccine_qry = $conn->query("SELECT * FROM vaccine_list where `status` = 1 order by `name` asc ");
							while($row = $vaccine_qry->fetch_assoc()):
						?>
						<option value="<?php echo $row['id'] ?>" <?php echo isset($vaccine_id) && $vaccine_id == $row['id'] ? 'selected' : '' ?>><?php echo $row['name'] ?></option>
						<?php endwhile; ?>
					</select>
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<div class="mb-2">
						<label for="vaccination_type" class="control-label">Vaccination Type</label>
						<select name="vaccination_type" id="vaccination_type" class="custom-select selevt" required>
							<option <?php echo isset($vaccination_type) && $vaccination_type == '1st Dose' ? 'selected' : '' ?>>1st Dose</option>
							<option <?php echo isset($vaccination_type) && $vaccination_type == '2nd Dose' ? 'selected' : '' ?>>2nd Dose</option>
						</select>
					</div>
					<div class="">
						<label for="vaccinated_by">Vaccinated By</label>
						<textarea rows="2" class="form-control form-control-sm rounded-0" id="vaccinated_by" name="vaccinated_by" style="resize:none" required><?php echo isset($vaccinated_by) ? $vaccinated_by : '' ?></textarea>
					</div>
				</div>
				<div class="col-md-6">
						<label for="remarks">Remarks</label>
						<textarea rows="6" class="form-control form-control-sm rounded-0" id="remarks" name="remarks" style="resize:none" required><?php echo isset($remarks) ? $remarks : '' ?></textarea>
				</div>
			</div>
			<?php if(!isset($id)): ?>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="status" class="control-label">Status</label>
					<select name="status" id="status" class="custom-select selevt" required>
						<option value="1" <?php echo isset($status) && $status == 1 ? 'selected' : '' ?>>Partially Vaccinated</option>
						<option value="2" <?php echo isset($status) && $status == 2 ? 'selected' : '' ?>>Fully Vaccinated</option>
					</select>
				</div>
			</div>
			<?php endif; ?>
			<?php if($_settings->userdata('type') == 1): ?>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="location_id" class="control-label">Vaccination Location</label>
					<select name="location_id" id="location_id" class="custom-select custom-select-sm select2" required>
						<option value="" disabled <?php echo !isset($location_id) ? "selected" :'' ?>></option>
						<?php 
							$location_qry = $conn->query("SELECT * FROM vaccination_location_list where `status` = 1 order by `location` asc ");
							while($row = $location_qry->fetch_assoc()):
						?>
						<option value="<?php echo $row['id'] ?>" <?php echo isset($location_id) && $location_id == $row['id'] ? 'selected' : '' ?>><?php echo $row['location'] ?></option>
						<?php endwhile; ?>
					</select>
				</div>
			</div>
			<?php else: ?>
				<input type="hidden" name="location_id" value="<?php echo $_settings->userdata('location_id') ?>">
			<?php endif; ?>
		</form>
	</div>
	<div class="card-footer">
		<button class="btn btn-flat btn-primary" form="history-form">Save</button>
		<a class="btn btn-flat btn-default" href="?page=historys">Cancel</a>
	</div>
</div>
<script>
    function check_individual_type(){
		var radio = $('[name="indiRadio"]:checked').val()
		if(radio == 1){
			$('#prev_form').removeClass('d-none')
			$('#prev_form').find('input, textarea, select').each(function(){
				$(this).attr('required',true)
			})
			$('#new_form').find('input, textarea, select').each(function(){
				$(this).removeAttr('required')
			})
		}else{
			$('#new_form').removeClass('d-none')
			$('#new_form').find('input, textarea, select').each(function(){
				$(this).attr('required',true)
			})
			$('#prev_form').find('input, textarea, select').each(function(){
				$(this).removeAttr('required')
			})
		}
	}
	$(document).ready(function(){
		check_individual_type()
		$('[name="indiRadio"]').change(function(){
			$('#prev_form,#new_form').addClass('d-none')
			check_individual_type()
		})
        $('.select2').select2({placeholder:"Please Select here",width:"relative"})
		$('#history-form').submit(function(e){
			e.preventDefault();
			if($('#prev_form').hasClass('d-none') == false && $('[name="individual_id"]').val() <= 0 && $('[name="id"]').val() > 0){
				alert_toast("Unknown Individual.",'warning')
				return false;
			}
            var _this = $(this)
			 $('.err-msg').remove();
			start_loader();
			$.ajax({
				url:_base_url_+"classes/Master.php?f=save_history",
				data: new FormData($(this)[0]),
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                dataType: 'json',
				error:err=>{
					console.log(err)
					alert_toast("An error occured",'error');
					end_loader();
				},
				success:function(resp){
					if(typeof resp =='object' && resp.status == 'success'){
						location.href = "./?page=history/view_details&id="+resp.id;
					}else if(resp.status == 'failed' && !!resp.msg){
                        var el = $('<div>')
                            el.addClass("alert alert-danger err-msg").text(resp.msg)
                            _this.prepend(el)
                            el.show('slow')
                            $("html, body").animate({ scrollTop: _this.closest('.card').offset().top }, "fast");
                            end_loader()
                    }else{
						alert_toast("An error occured",'error');
						end_loader();
                        console.log(resp)
					}
				}
			})
		})

        $('#tracking_code').on('input',function(){
			var code = $(this).val()
				$('#indiviual_info dd').text('')
				$('[name="individual_id"]').val('')
			if(code == ''){
				return false;
			}
			$.ajax({
				url:_base_url_+'classes/Master.php?f=get_individual',
				method:'post',
				data:{code:code},
				dataType:'json',
				error:err=>{
					console.log(err)
					alert_toast("An error occured while fetching individual details",'error')
				},
				success:function(resp){
					if(!!resp.id){
						$('[name="individual_id"]').val(resp.id)
						$('dd.indi_name').text(resp.name)
						$('dd.indi_gender').text(resp.gender)
						$('dd.indi_dob').text(resp.dob)
						$('dd.indi_contact').text(resp.contact)
						$('dd.indi_address').text(resp.address)
					}
				}
			})
				
		})
	})
</script>