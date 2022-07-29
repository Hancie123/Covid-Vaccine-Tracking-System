<?php 
 $qry = $conn->query("SELECT * from `vaccine_history_list` where id = '{$_GET['id']}' ");
 if($qry->num_rows > 0){
     foreach($qry->fetch_assoc() as $k => $v){
         $$k=$v;
     }
 }
 $individual_qry = $conn->query("SELECT *,concat(lastname,', ', firstname, ' ', middlename ) as name FROM individual_list where id ='{$individual_id}'");
 $result_indi = $individual_qry->fetch_array();

 $vaccine_qry = $conn->query("SELECT * FROM vaccine_list where id ='{$vaccine_id}'");
 $result_vaccine = $vaccine_qry->fetch_array();

 $location_qry = $conn->query("SELECT * FROM vaccination_location_list where id ='{$location_id}'");
 $result_location = $location_qry->fetch_array();
 if($user_id != null){
    $user_qry = $conn->query("SELECT *,concat(firstname,' ', lastname ) as name FROM users where id ='{$user_id}'");
    $result_user = $user_qry->fetch_array();
 }

?>
<div class="card card-outline card-primary">
    <div class="card-header d-flex">
        <h5 class="card-title col-auto flex-grow-1">Vaccination History Record Details</h5>
        <div class="col-auto">
        <button class="btn btn-sm btn-success btn-flat mr-2" type="button" id="print"><i class="fa fa-print"></i> Print</button>

        </div>
    </div>
    <div class="card-body">
        <div class="container-fluid" id="print_out">
            <div class="row">
                <div class="col-6">
                    <dl>
                        <dt class="text-muted">Tracking Code:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['tracking_code']) ? $result_indi['tracking_code'] : '' ?></dd>
                        <dt class="text-muted">Indiviual Name:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['name']) ? $result_indi['name'] : '' ?></dd>
                        <dt class="text-muted">Gender:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['gender']) ? $result_indi['gender'] : '' ?></dd>
                        <dt class="text-muted">Date of Birth:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['dob']) ? date("M d, Y",strtotime($result_indi['dob'])) : '' ?></dd>
                        <dt class="text-muted">Contact:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['contact']) ? $result_indi['contact'] : '' ?></dd>
                        <dt class="text-muted">Address:</dt>
                        <dd class="pl-4"><?php echo isset($result_indi['address']) ? $result_indi['address'] : '' ?></dd>
                    </dl>
                </div>
                <div class="col-6">
                    <dl>
                        <dt class="text-muted">Vaccination Type:</dt>
                        <dd class="pl-4"><?php echo isset($vaccination_type) ? $vaccination_type : '' ?></dd>
                        <dt class="text-muted">Vaccine Used:</dt>
                        <dd class="pl-4"><?php echo isset($result_vaccine['name']) ? $result_vaccine['name'] : '' ?></dd>
                        <dt class="text-muted">Vaccinated By:</dt>
                        <dd class="pl-4"><?php echo isset($vaccinated_by) ? $vaccinated_by : '' ?></dd>
                        <dt class="text-muted">Vaccinated at:</dt>
                        <dd class="pl-4"><?php echo isset($result_location['location']) ? $result_location['location'] : '' ?></dd>
                        <dt class="text-muted">Remarks:</dt>
                        <dd class="pl-4"><?php echo isset($remarks) ? $remarks : '' ?></dd>
                        <dt class="text-muted">Encoded By:</dt>
                        <dd class="pl-4"><?php echo isset($result_user['name']) ? $result_user['name'] : 'N/A' ?></dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(function(){
        $('#print').click(function(){
            start_loader()
            var _el = $('<div>')
            var _head = $('head').clone()
                _head.find('title').text("Vaccination Record Details - Print View")
            var p = $('#print_out').clone()
            p.find('.btn').remove()
            _el.append(_head)
            _el.append('<div class="d-flex justify-content-center">'+
                      '<div class="col-1 text-right">'+
                      '<img src="<?php echo validate_image($_settings->info('logo')) ?>" width="65px" height="65px" />'+
                      '</div>'+
                      '<div class="col-10">'+
                      '<h4 class="text-center"><?php echo $_settings->info('name') ?></h4>'+
                      '<h4 class="text-center">Vaccination Record Details</h4>'+
                      '</div>'+
                      '<div class="col-1 text-right">'+
                      '</div>'+
                      '</div><hr/>')
            _el.append(p.html())
            var nw = window.open("","","width=1200,height=900,left=250,location=no,titlebar=yes")
                     nw.document.write(_el.html())
                     nw.document.close()
                     setTimeout(() => {
                         nw.print()
                         setTimeout(() => {
                            nw.close()
                            end_loader()
                         }, 200);
                     }, 300);

        })
    })
</script>