
  var currentImageIndex = 0;
  

  $scope.changeImage = function(imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
  };

  function nextImage() {
    var mainImage = document.getElementById('mainImage');
    mainImage.classList.remove('animate__fadeIn');
    mainImage.classList.add('animate__fadeOut');
    setTimeout(function() {
      currentImageIndex++;
      if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
      }
      var imageUrl = imageUrls[currentImageIndex];
      mainImage.src = imageUrl;
      mainImage.classList.remove('animate__fadeOut');
      mainImage.classList.add('animate__fadeIn');
  
      var thumbnailImages = document.getElementsByClassName('thumbnail-image');
      for (var i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].classList.remove('active');
      }
  
      thumbnailImages[currentImageIndex].classList.add('active');
    }, 500);
  }

  function prevImage() {
    var mainImage = document.getElementById('mainImage');
    mainImage.classList.remove('animate__fadeIn');
    mainImage.classList.add('animate__fadeOut');
    setTimeout(function() {
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = imageUrls.length - 1;
      }
      var imageUrl = imageUrls[currentImageIndex];
      mainImage.src = imageUrl;
      mainImage.classList.remove('animate__fadeOut');
      mainImage.classList.add('animate__fadeIn');

      var thumbnailImages = document.getElementsByClassName('thumbnail-image');
      for (var i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].classList.remove('active');
      }

      thumbnailImages[currentImageIndex].classList.add('active');
    }, 500);
  }
  
  
  