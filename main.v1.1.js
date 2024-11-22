$(document).ready(function () {
  let cropper;
  const $imageChoose = $("#image-choose");
  const $imgChoosen = $("#img-choosen");
  const $cropperImage = $("#cropperImage");
  const $cropperModal = $("#cropperModal");
  const $saveCroppedImage = $("#saveCroppedImage");
  const $closeModal = $(".close");

  function resetInput() {
    $imageChoose.val("");
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  }
  $imageChoose.on("change", function () {
    const files = this.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        $cropperImage.attr("src", event.target.result);
        $cropperModal.show();
        if (cropper) {
          cropper.destroy();
        }
        cropper = new Cropper($cropperImage[0], {
          aspectRatio: 1,
          viewMode: 1,
        });
      };
      reader.readAsDataURL(file);
    }
  });
  $saveCroppedImage.on("click", function () {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      const base64encodedImage = canvas.toDataURL("image/jpeg");
      $imgChoosen.attr("src", base64encodedImage);
      $cropperModal.hide();
      resetInput();
    }
  });
  $closeModal.on("click", function () {
    $cropperModal.hide();
    resetInput();
  });
  $(window).on("click", function (event) {
    if (event.target == $cropperModal[0]) {
      $cropperModal.hide();
      resetInput();
    }
  });
  $("#name").on("input", function () {
    $(".name-content").text($(this).val());
  });
  $("#title").on("input", function () {
    $(".title-content").text($(this).val());
  });
  $("#message").on("input", function () {
    $(".message-content").text($(this).val());
  });
  $("#submit").click(function () {
    $(".loader-wrapper").show();
    var node = document.getElementById("frame-wrapper");
    const scaleObject = window.innerWidth < 768 ? 10 : 5;
    var options = {
      width: node.offsetWidth * scaleObject,
      height: node.offsetHeight * scaleObject,
      style: {
        transform: "scale(" + scaleObject + ")",
        transformOrigin: "top left",
      },
      quality: 1,
    };
    domtoimage
      .toPng(node, options)
      .then(function (dataUrl) {
        domtoimage.toPng(node, options).then(function (data1) {
          var link = document.createElement("a");
          link.download = "gathap-doidongcamnhan.png";
          link.href = data1;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          $(".loader-wrapper").hide();
        });
      })
      .catch(function (error) {
        $(".loader-wrapper").hide();
      });
  });
});