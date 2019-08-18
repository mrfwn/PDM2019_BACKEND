$(document).ready(function() {
  $("#clear-button").on("click", function(event) {
    event.preventDefault();

    $.ajax({
      xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.addEventListener("progress", function(e) {
          if (e.lengthComputable) {
            // console.log("Bytes Loaded: " + e.loaded);
            // console.log("Total Size: " + e.total);
            // console.log("Percentage Uploaded: " + e.loaded / e.total);
            var percent = Math.round((e.loaded / e.total) * 100);
            $("#progress-clear")
              .attr("aria-valuenow", percent)
              .css("width", percent + "%")
              .text(percent + "%");
          }
        });
        return xhr;
      },
      type: "DELETE",
      url: "/upload",
      data: false,
      processData: false,
      contentType: false,
      success: function() {
        setTimeout(() => {
          alert("Lista Limpa!");
          location.reload();
        }, 1500);
      }
    });
  });
});
