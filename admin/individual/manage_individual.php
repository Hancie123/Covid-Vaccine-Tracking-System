<?php
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `individual_list` where id = '{$_GET['id']}' ");
    if($qry->num_rows > 0){
        foreach($qry->fetch_assoc() as $k => $v){
            $$k=stripslashes($v);
        }
    }
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
		<h3 class="card-title"><?php echo isset($id) ? "Update ": "Add New " ?> Indivdual Details</h3>
	</div>
	<div class="card-body">
		<form action="" id="individual-form">
			<input type="hidden" name ="id" value="<?php echo isset($id) ? $id : '' ?>">
            <div class="form-group row">
                <div class="col-md-6">
                    <label for="tracking_code" class="control-label">Tracking Code</label>
                    <input type="text" class="form-control form-control-sm rounded-0" id="tracking_code" name="tracking_code" value="<?php echo isset($tracking_code) ? $tracking_code :'' ?>" readonly>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="lastname" class="control-label">Last Name</label>
                        <input type="text" class="form-control form-control-sm rounded-0" id="lastname" required name="lastname" value="<?php echo isset($lastname) ? $lastname :'' ?>">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="firstname" class="control-label">First Name</label>
                        <input type="text" class="form-control form-control-sm rounded-0" id="firstname" required name="firstname" value="<?php echo isset($firstname) ? $firstname :'' ?>">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="middlename" class="control-label">Middle Name</label>
                        <input type="text" class="form-control form-control-sm rounded-0" id="middlename" required name="middlename" value="<?php echo isset($middlename) ? $middlename :'' ?>">
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="gender" class="control-label">Gender</label>
                        <select class="form-control form-control-sm rounded-0" id="gender" required name="gender">
                            <option <?php echo isset($gender) && $gender == 'Male' ? 'selected' :'' ?>>Male</option>
                            <option <?php echo isset($gender) && $gender == 'Female' ? 'selected' :'' ?>>Female</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="dob" class="control-label">Date of Birth</label>
                        <input type="date" class="form-control form-control-sm rounded-0" id="dob" required name="dob" value="<?php echo isset($dob) ? $dob :'' ?>">
                    </div>
                </div>
            </div>
            
            <div class="form-group row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="contact" class="control-label">Contact #</label>
                        <input type="text" pattern="[0-9\s\/+]+" class="form-control form-control-sm rounded-0" id="contact" required name="contact" value="<?php echo isset($contact) ? $contact :'' ?>">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="address" class="control-label">Address</label>
                        <textarea rows="2" class="form-control form-control-sm rounded-0" id="address" required name="address" style="resize:none"><?php echo isset($address) ? $address :'' ?></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group row">
				<div class="col-md-6">
					<label for="status" class="control-label">Vaccination Status</label>
					<select name="status" id="status" class="custom-select selevt" required>
						<option value="0" <?php echo isset($status) && $status == 0 ? 'selected' : '' ?>>Pending</option>
						<option value="1" <?php echo isset($status) && $status == 1 ? 'selected' : '' ?>>Partially Vaccinated</option>
						<option value="2" <?php echo isset($status) && $status == 2 ? 'selected' : '' ?>>Fully Vaccinated</option>
					</select>
				</div>
			</div>
		</form>
	</div>
	<div class="card-footer">
		<button class="btn btn-flat btn-primary" form="individual-form">Save</button>
		<a class="btn btn-flat btn-default" href="?page=product">Cancel</a>
	</div>
</div>
<script>
	$(document).ready(function(){
		$('#individual-form').submit(function(e){
			e.preventDefault();
            var _this = $(this)
			 $('.err-msg').remove();
			start_loader();
			$.ajax({
				url:_base_url_+"classes/Master.php?f=save_individual",
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
						location.href = "./?page=individual";
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

	})
</script>