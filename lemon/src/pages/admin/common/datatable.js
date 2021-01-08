import $ from 'jquery';
function createtable(){
    $('table.display').DataTable(
        {
          autoWidth: true,
          "lengthMenu": [
            [16, 32, 64, -1],
            [16, 32, 64, "All"]
          ]
        });
}
export default createtable;