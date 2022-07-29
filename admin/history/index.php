<div class="card card-outline card-primary">
	<div class="card-header">
		<h3 class="card-title">Vaccination History</h3>
		<div class="card-tools">
			<a href="?page=history/manage_record" class="btn btn-flat btn-primary"><span class="fas fa-plus"></span>  Create New</a>
		</div>
	</div>
	<div class="card-body">
		<div class="container-fluid">
        <div class="container-fluid">
			<table class="table table-bordered table-striped">
				<colgroup>
					<col width="5%">
					<col width="20%">
					<col width="25%">
					<col width="25%">
					<col width="15%">
					<col width="10%">
				</colgroup>
				<thead>
					<tr>
						<th>#</th>
						<th>Date Created</th>
						<th>Individual</th>
						<th>Vaccination Info</th>
						<th>Encoder</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<?php 
					$i = 1;
						$where = "";
						if($_settings->userdata('type') != 1){
							$where = " where h.location_id = '{$_settings->userdata('location_id')}'";
						}
						$users = $conn->query("SELECT * FROM users");
						$result = $users->fetch_all(MYSQLI_ASSOC);
						$user_arr = array_column($result,'username','id');
						$vaccine = $conn->query("SELECT * FROM vaccine_list");
						$vresult = $vaccine->fetch_all(MYSQLI_ASSOC);
						$vax_arr = array_column($vresult,'name','id');
						$qry = $conn->query("SELECT h.*,concat(i.lastname,', ',i.firstname,' ', i.middlename) as iname,i.tracking_code FROM `vaccine_history_list` h inner join individual_list i on h.individual_id = i.id {$where} order by unix_timestamp(h.date_created) desc");
						while($row = $qry->fetch_assoc()):
					?>
						<tr>
							<td class="text-center py-1 px-2"><?php echo $i++; ?></td>
							<td class="py-1 px-1"><?php echo date("M d,Y",strtotime($row['date_created'])) ; ?></td>
							<td class="py-1 px-2">
								<small><span class="text-muted">Code:</span> <b><?php echo $row['tracking_code'] ?></b></small> <br>
								<small><span class="text-muted">Name:</span> <b><?php echo $row['iname'] ?></b></small>
							</td>
							<td class="py-1 px-2">
								<small><span class="text-muted">Vaccine:</span> <b><?php echo isset($vax_arr[$row['vaccine_id']]) ? $vax_arr[$row['vaccine_id']] : 'Vaccine was Deleted' ; ?></b></small> <br>
								<small><span class="text-muted">Type:</span> <b><?php echo $row['vaccination_type'] ?></b></small>
							</td>
							<td class=""><?php echo isset($user_arr[$row['user_id']]) ? $user_arr[$row['user_id']] : 'User was Deleted' ; ?></td>
							<td align="center">
								 <button type="button" class="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
				                  		Action
				                    <span class="sr-only">Toggle Dropdown</span>
				                  </button>
				                  <div class="dropdown-menu" role="menu">
									<a class="dropdown-item" href="./?page=history/view_details&id=<?php echo $row['id'] ?>" data-id="<?php echo $row['id'] ?>"><span class="fa fa-info-circle text-primary"></span> View</a>
				                    <div class="dropdown-divider"></div>
				                    <a class="dropdown-item" href="?page=history/manage_record&id=<?php echo $row['id'] ?>"><span class="fa fa-edit text-primary"></span> Edit</a>
				                    <div class="dropdown-divider"></div>
				                    <a class="dropdown-item delete_data" href="javascript:void(0)" data-id="<?php echo $row['id'] ?>"><span class="fa fa-trash text-danger"></span> Delete</a>
				                  </div>
							</td>
						</tr>
					<?php endwhile; ?>
				</tbody>
			</table>
		</div>
		</div>
	</div>
</div>
<script>
	$(document).ready(function(){
		$('.delete_data').click(function(){
			_conf("Are you sure to delete this Vaccination Record permanently?","delete_history",[$(this).attr('data-id')])
		})
		$('.table td,.table th').addClass('py-1 px-2 align-middle')
		$('.table').dataTable();
	})
	function delete_history($id){
		start_loader();
		$.ajax({
			url:_base_url_+"classes/Master.php?f=delete_history",
			method:"POST",
			data:{id: $id},
			dataType:"json",
			error:err=>{
				console.log(err)
				alert_toast("An error occured.",'error');
				end_loader();
			},
			success:function(resp){
				if(typeof resp== 'object' && resp.status == 'success'){
					location.reload();
				}else{
					alert_toast("An error occured.",'error');
					end_loader();
				}
			}
		})
	}
</script>